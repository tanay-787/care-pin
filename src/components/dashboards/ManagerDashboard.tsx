"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation } from "@apollo/client"
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Tabs,
  Form,
  Input,
  Switch,
  InputNumber,
  Modal,
  DatePicker,
  Spin,
  Alert,
  message,
  Divider,
  ConfigProvider,
} from "antd"
import {
  UserOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
  HistoryOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  StopOutlined,
  BarChartOutlined,
} from "@ant-design/icons"
import {
  GET_ALL_USERS,
  GET_ALL_SHIFTS,
  GET_LOCATION_PERIMETER,
  UPDATE_LOCATION_PERIMETER,
  GET_USER_SHIFTS,
  CLOCK_IN,
  CLOCK_OUT,
} from "@/lib/graphql-queries"

import UserButton from "@/components/UserButton"
import Select from "antd/lib/select"
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic';
import type { User } from "@/lib/types"

import DashboardNavBar from "./NavBar"
import OverviewTab from "@/components/manager/OverviewTab";
import StaffTab from "@/components/manager/StaffTab";
import LocationSettingsTab from "@/components/manager/LocationSettingsTab";
import ShiftLogsTab from "@/components/manager/ShiftLogsTab";

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs
const { RangePicker } = DatePicker
const { useForm } = Form;
const LocationMap = dynamic(() => import('@/components/pwa/LocationMap'), { ssr: false });


const ManagerDashboard = ({ user }: { user: User }) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null)
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  

  // GraphQL queries and mutations
  const { data: usersData, loading: usersLoading } = useQuery(GET_ALL_USERS)
  const { data: shiftsData, loading: shiftsLoading } = useQuery(GET_ALL_SHIFTS)
  const { data: perimeterData, loading: perimeterLoading } = useQuery(GET_LOCATION_PERIMETER)
  const [updatePerimeter] = useMutation(UPDATE_LOCATION_PERIMETER)

  const allUsers = usersData?.getAllUsers || []
  const allShifts = shiftsData?.getAllShifts || []
  const perimeterSettings = perimeterData?.getLocationPerimeter;

  // Helper function to format duration
  const formatDuration = (startTime: string | number, endTime: string | number | null) => {
    const start = typeof startTime === "string" ? parseInt(startTime, 10) : startTime;
    const end = endTime ? (typeof endTime === "string" ? parseInt(endTime, 10) : endTime) : Date.now();

    if (end < start) return "Invalid Duration"; // Should not happen with correct data

    const diff = end - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (!endTime) return `${hours}h ${minutes}m ${seconds}s (ongoing)`;

    return `${hours}h ${minutes}m`;
  };

  // Calculate statistics from real data
  const workers = usersData?.getAllUsers?.filter((u: any) => u.role === "CARE_WORKER") || [];
  const currentlyWorking = workers.filter((worker: any) =>
    allShifts.some((shift: any) => shift.userId === worker.id && !shift.clockOutTime),
  )
  const totalWorkers = workers.length

  const today = new Date().toDateString()
  const todayShifts = allShifts.filter((shift: any) => {
    return new Date(shift.clockInTime).toDateString() === today
  })

  const avgHoursPerDay =
    todayShifts.reduce((acc: number, shift: any) => {
      if (shift.clockOutTime) {
        const hours =
          (new Date(shift.clockOutTime).getTime() - new Date(shift.clockInTime).getTime()) / (1000 * 60 * 60)
        return acc + hours
      }
      return acc
    }, 0) / Math.max(todayShifts.length, 1)

  const handleViewWorkerLogs = (workerId: string) => {
    setSelectedWorker(workerId)
    setActiveTab("logs")
  }

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
      })
      messageApi.success("Perimeter settings updated successfully")
      console.log(perimeterSettings);
      // router.refresh();
    } catch (error) {
      messageApi.error("Failed to update perimeter settings")
    }
  }
  
  // Data preparation for Manager Shift History Table
  const getShiftHistory = () => {
    if (!allShifts) return [];

    return allShifts
      .map((shift: any) => {
        const clockIn = parseInt(shift.clockInTime, 10);
        const clockOut = shift.clockOutTime ? parseInt(shift.clockOutTime, 10) : null;

        const durationInMs = clockOut ? clockOut - clockIn : Date.now() - clockIn;
        const durationHours = durationInMs / (1000 * 60 * 60);

        return {
          ...shift,
          key: shift.id,
          workerName: shift.user.name || 'Unknown Worker',
          clockInTimeFormatted: new Date(clockIn).toLocaleString(),
          clockOutTimeFormatted: clockOut ? new Date(clockOut).toLocaleString() : "Still clocked in",
          durationFormatted: formatDuration(clockIn, clockOut),
          totalHours: durationHours, // Keep in hours for calculations
        };
      });
  };

  if (usersLoading || shiftsLoading || perimeterLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f0f2f5" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Loading dashboard...</div>
      </div>
    )
  }

  const tabItems = [
    {
      key: "overview",
      label: "Overview",
      children: (
        <OverviewTab
          currentlyWorking={currentlyWorking}
          workers={totalWorkers}
          todayShifts={todayShifts}
          avgHoursPerDay={avgHoursPerDay}
          allShifts={allShifts}
          onViewWorkerLogs={handleViewWorkerLogs}
        />
      ),
    },
    {
      key: "staff",
      label: "Staff",
      children: (
        <StaffTab users={allUsers} onViewWorkerLogs={handleViewWorkerLogs} />
      ),
    },
    {
      key: "location",
      label: "Location Settings",
      children: (
        <LocationSettingsTab
          perimeterSettings={perimeterSettings}
          form={form}
          onUpdatePerimeter={handleUpdatePerimeter}
        />
      ),
    },
    {
      key: "logs",
      label: "Shift Logs",
      children: (
        <ShiftLogsTab
          shifts={getShiftHistory()}
          workers={workers}
          selectedWorker={selectedWorker}
          onSelectWorker={setSelectedWorker}
        />
      ),
    },
  ];
  return (
    <>
    {contextHolder}
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <DashboardNavBar/>
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} size="large" />
      </div>
    </div>
    </>
  )
}

export default ManagerDashboard;