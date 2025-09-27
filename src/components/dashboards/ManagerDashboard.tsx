'use client';

import { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Typography,
  Layout,
  Menu,
  theme,
  Form,
  DatePicker,
  Spin,
  message,
} from 'antd';
import {
  GET_ALL_USERS,
  GET_ALL_SHIFTS,
  GET_LOCATION_PERIMETER,
  UPDATE_LOCATION_PERIMETER,
} from '@/lib/graphql-queries';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  UserOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import type { User } from '@/lib/types';

import DashboardNavBar from './NavBar';
import OverviewTab from '@/components/manager/OverviewTab';
import StaffTab from '@/components/manager/StaffTab';
import ShiftLogsTab from '@/components/manager/ShiftLogsTab';
import LocationSettingsTab from '@/components/manager/LocationSettingsTab';

const { useForm } = Form;
const { Header, Content, Footer, Sider } = Layout;

const ManagerDashboard = ({ user }: { user: User }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);
  const [form] = useForm();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  // GraphQL queries and mutations
  const { data: usersData, loading: usersLoading, refetch: refetchUsers } = useQuery(GET_ALL_USERS);
  const { data: shiftsData, loading: shiftsLoading, refetch: refetchShifts } = useQuery(GET_ALL_SHIFTS);
  const { data: perimeterData, loading: perimeterLoading } = useQuery(GET_LOCATION_PERIMETER);
  const [updatePerimeter] = useMutation(UPDATE_LOCATION_PERIMETER);

  const allUsers = usersData?.getAllUsers || [];
  const allShifts = shiftsData?.getAllShifts || [];
  const perimeterSettings = perimeterData?.getLocationPerimeter;

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to handle data refreshing
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([refetchUsers(), refetchShifts()]);
    } catch (error) {
      messageApi.error('Failed to refresh data');
    }
    setIsRefreshing(false);
  }, [refetchUsers, refetchShifts, messageApi]);

  // Helper function to format duration
  const formatDuration = (
    startTime: string | number,
    endTime: string | number | null
  ) => {
    const start = typeof startTime === 'string' ? parseInt(startTime, 10) : startTime;
    const end =
      endTime ? (typeof endTime === 'string' ? parseInt(endTime, 10) : endTime) : Date.now();

    if (end < start) return 'Invalid Duration'; // Should not happen with correct data

    const diff = end - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (!endTime) return `${hours}h ${minutes}m ${seconds}s (ongoing)`;

    return `${hours}h ${minutes}m`;
  };

  // Calculate statistics from real data
  const workers =
    usersData?.getAllUsers?.filter((u: any) => u.role === 'CARE_WORKER') || [];
  const currentlyWorking = workers.filter((worker: any) =>
    allShifts.some((shift: any) => shift.userId === worker.id && !shift.clockOutTime)
  );
  const totalWorkers = workers.length;

  const today = new Date().toDateString();
  const todayShifts = allShifts.filter((shift: any) => {
    return new Date(parseInt(shift.clockInTime, 10)).toDateString() === today;
  });

  const avgHoursPerDay =
    todayShifts.reduce((acc: number, shift: any) => {
      if (shift.clockOutTime) {
        const hours =
          (new Date(parseInt(shift.clockOutTime, 10)).getTime() -
            new Date(parseInt(shift.clockInTime, 10)).getTime()) /
          (1000 * 60 * 60);
        return acc + hours;
      }
      return acc;
    }, 0) / Math.max(todayShifts.length, 1);

  const handleViewWorkerLogs = (workerId: string) => {
    setSelectedWorker(workerId);
    setActiveTab('logs');
  };

  const handleUpdatePerimeter = async () => {
    try {
      // Get the current values directly from the form instance
      const formValues = form.getFieldsValue();

      console.log(form.getFieldsValue());

      await updatePerimeter({
        variables: {
          radiusKm: formValues.radius,
          address: formValues.centerAddress,
          centerLatitude: formValues.centerLat,
          centerLongitude: formValues.centerLng,
          isActive: true,
        },
        refetchQueries: [{ query: GET_LOCATION_PERIMETER }],
      });
      messageApi.success('Perimeter settings updated successfully');
      console.log(perimeterSettings);
      // router.refresh();
    } catch (error) {
      messageApi.error('Failed to update perimeter settings');
    }
  };

  // Data preparation for Manager Shift History Table
  const getShiftHistory = () => {
    if (!allShifts) return [];

    return allShifts.map((shift: any) => {
      const clockIn = parseInt(shift.clockInTime, 10);
      const clockOut = shift.clockOutTime
        ? parseInt(shift.clockOutTime, 10)
        : null;

      const durationInMs = clockOut ? clockOut - clockIn : Date.now() - clockIn;
      const durationHours = durationInMs / (1000 * 60 * 60);

      return {
        ...shift,
        key: shift.id,
        workerName: shift.user.name || 'Unknown Worker',
        clockInTimeFormatted: new Date(clockIn).toLocaleString(),
        clockOutTimeFormatted: clockOut
          ? new Date(clockOut).toLocaleString()
          : 'Still clocked in',
        durationFormatted: formatDuration(clockIn, clockOut),
        totalHours: durationHours, // Keep in hours for calculations
      };
    });
  };

  const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
  };

  if (usersLoading || shiftsLoading || perimeterLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Loading dashboard...</div>
      </div>
    );
  }

  const menuItems = [
    {
      key: 'overview',
      icon: <BarChartOutlined />,
      label: 'Overview',
    },
    {
      key: 'staff',
      icon: <TeamOutlined />,
      label: 'Staff',
    },
    {
      key: 'logs',
      icon: <ClockCircleOutlined />,
      label: 'Shift Logs',
    },
    {
      key: 'location',
      icon: <EnvironmentOutlined />,
      label: 'Location Settings',
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab
            currentlyWorking={currentlyWorking}
            workers={totalWorkers}
            todayShifts={todayShifts}
            avgHoursPerDay={avgHoursPerDay}
            allShifts={allShifts}
            onViewWorkerLogs={handleViewWorkerLogs}
            formatDuration={formatDuration}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
          />
        );
      case 'staff':
        return <StaffTab users={allUsers} onViewWorkerLogs={handleViewWorkerLogs} />;
      case 'logs':
        return (
          <ShiftLogsTab
            shifts={getShiftHistory()}
            workers={workers}
            selectedWorker={selectedWorker}
            onSelectWorker={setSelectedWorker}
          />
        );
      case 'location':
        return (
          <LocationSettingsTab
            perimeterSettings={perimeterSettings}
            form={form}
            onUpdatePerimeter={handleUpdatePerimeter}
          />
        );
      default:
        return (
          <OverviewTab
            currentlyWorking={currentlyWorking}
            workers={totalWorkers}
            todayShifts={todayShifts}
            avgHoursPerDay={avgHoursPerDay}
            allShifts={allShifts}
            onViewWorkerLogs={handleViewWorkerLogs}
            formatDuration={formatDuration}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
          />
        );
    }
  };

  return (
    <>
      {contextHolder}
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={siderStyle}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[activeTab]}
            selectedKeys={[activeTab]}
            items={menuItems}
            onClick={({ key }) => setActiveTab(key as string)}
          />
        </Sider>
        <Layout>
          <DashboardNavBar /> {/* This acts as the Header */}
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {renderContent()}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default ManagerDashboard;
