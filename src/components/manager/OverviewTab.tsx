'use client';

import { FC, useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Tag,
  Typography,
  Button,
  Grid,
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  HistoryOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import type { User, Shift } from '@/lib/types';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface OverviewTabProps {
  workers: number;
  currentlyWorking: User[];
  allShifts: Shift[];
  avgHoursPerDay: number;
  todayShifts: Shift[];
  onViewWorkerLogs: (workerId: string) => void;
  formatDuration: (
    startTime: string | number,
    endTime: string | number | null
  ) => string;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const OverviewTab: FC<OverviewTabProps> = ({
  workers,
  currentlyWorking,
  allShifts,
  avgHoursPerDay,
  todayShifts,
  onViewWorkerLogs,
  formatDuration,
  onRefresh,
  isRefreshing,
}) => {
  const [, setTick] = useState(0);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: isMobile ? '0' : '0 8px' }}>
      <Row gutter={[isMobile ? 8 : 24, isMobile ? 8 : 24]} style={{ marginBottom: isMobile ? 16 : 24 }}>
        <Col xs={12} sm={12} lg={6}>
          <Card size="small" styles={{ body: { padding: isMobile ? '8px' : '12px' } }}>
            <Statistic
              title={<span style={{ fontSize: isMobile ? '12px' : '14px' }}>Currently Working</span>}
              value={currentlyWorking.length}
              prefix={<UserOutlined style={{ fontSize: isMobile ? '14px' : '16px' }} />}
              valueStyle={{ color: '#52c41a', fontSize: isMobile ? '18px' : '24px' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card size="small" styles={{ body: { padding: isMobile ? '8px' : '12px' } }}>
            <Statistic
              title={<span style={{ fontSize: isMobile ? '12px' : '14px' }}>Total Staff</span>}
              value={workers}
              prefix={<TeamOutlined style={{ fontSize: isMobile ? '14px' : '16px' }} />}
              valueStyle={{ color: '#1890ff', fontSize: isMobile ? '18px' : '24px' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card size="small" styles={{ body: { padding: isMobile ? '8px' : '12px' } }}>
            <Statistic
              title={<span style={{ fontSize: isMobile ? '12px' : '14px' }}>Today&apos;s Clock-ins</span>}
              value={todayShifts.length}
              prefix={<ClockCircleOutlined style={{ fontSize: isMobile ? '14px' : '16px' }} />}
              valueStyle={{ color: '#722ed1', fontSize: isMobile ? '18px' : '24px' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card size="small" styles={{ body: { padding: isMobile ? '8px' : '12px' } }}>
            <Statistic
              title={<span style={{ fontSize: isMobile ? '12px' : '14px' }}>Avg Hours/Day</span>}
              value={avgHoursPerDay}
              precision={1}
              prefix={<HistoryOutlined style={{ fontSize: isMobile ? '14px' : '16px' }} />}
              valueStyle={{ color: '#fa8c16', fontSize: isMobile ? '18px' : '24px' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="Currently Working Staff"
        size={isMobile ? 'small' : 'default'}
        styles={{ body: { padding: isMobile ? 0 : '24px' } }}
        extra={
          <Button
            icon={<RedoOutlined />}
            onClick={onRefresh}
            loading={isRefreshing}
            size={isMobile ? 'small' : 'middle'}
          >
            {isMobile ? '' : 'Refresh'}
          </Button>
        }
      >
        <Table
          dataSource={currentlyWorking.map((worker) => {
            const currentShift = allShifts.find(
              (s) => s.userId === worker.id && !s.clockOutTime
            );
            return { ...worker, currentShift };
          })}
          rowKey="id"
          pagination={{ pageSize: 4, size: isMobile ? 'small' : 'default' }}
          scroll={{ x: 'max-content' }}
          size={isMobile ? 'small' : 'middle'}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: (name: string) => <Text strong>{name}</Text>,
            },
            { title: 'Status', render: () => <Tag color="green">Working</Tag> },
            {
              title: 'Clock In Time',
              render: (_: unknown, record: any) =>
                record.currentShift
                  ? new Date(
                      parseInt(record.currentShift.clockInTime, 10)
                    ).toLocaleString()
                  : '-',
            },
            {
              title: 'Duration',
              render: (_: unknown, record: any) => {
                if (record.currentShift) {
                  return formatDuration(record.currentShift.clockInTime, null);
                }
                return '-';
              },
            },
            {
              title: 'Location',
              render: (_: unknown, record: any) =>
                record.currentShift?.clockInLocation ? (
                  <Tag color="green">Within Perimeter</Tag>
                ) : (
                  '-'
                ),
            },
            {
              title: 'Actions',
              render: (_: unknown, record: any) => (
                <Button
                  type="link"
                  size="small"
                  onClick={() => onViewWorkerLogs(record.id)}
                >
                  View Logs
                </Button>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default OverviewTab;
