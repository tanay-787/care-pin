"use client";

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
} from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import type { User, Shift} from "@/lib/types";
const { Title, Text } = Typography;



interface OverviewTabProps {
  currentlyWorking: User[];
  totalWorkers: number;
  todayShifts: Shift[];
  avgHoursPerDay: number;
  allShifts: Shift[];
  allUsers: User[];
  handleViewWorkerLogs: (workerId: string) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  currentlyWorking,
  totalWorkers,
  todayShifts,
  avgHoursPerDay,
  allShifts,
  allUsers,
  handleViewWorkerLogs,
}) => {
  return (
    <div>
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Currently Working"
              value={currentlyWorking.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Staff"
              value={totalWorkers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Today's Clock-ins"
              value={todayShifts.length}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg Hours/Day"
              value={avgHoursPerDay}
              precision={1}
              prefix={<HistoryOutlined />}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Currently Working Staff" style={{ marginBottom: 24 }}>
        <Table
          dataSource={currentlyWorking.map((worker) => {
            const currentShift = allShifts.find(
              (shift) => shift.userId === worker.id && !shift.clockOutTime
            );
            return { ...worker, currentShift };
          })}
          rowKey="id"
          pagination={false}
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
              render: (name: string) => <Text strong>{name}</Text>,
            },
            {
              title: "Status",
              key: "status",
              render: () => <Tag color="green">Working</Tag>,
            },
            {
              title: "Clock In Time",
              key: "clockIn",
              render: (_, record: any) => {
                if (record.currentShift) {
                  return new Date(
                    parseInt(record.currentShift.clockInTime, 10)
                  ).toLocaleTimeString();
                }
                return "-";
              },
            },
            {
              title: "Duration",
              key: "duration",
              render: (_, record: any) => {
                if (record.currentShift) {
                  const duration =
                    Date.now() - parseInt(record.currentShift.clockInTime, 10);
                  const hours = Math.floor(duration / (1000 * 60 * 60));
                  const minutes = Math.floor(
                    (duration % (1000 * 60 * 60)) / (1000 * 60)
                  );
                  return `${hours}h ${minutes}m`;
                }
                return "-";
              },
            },
            {
              title: "Location",
              key: "location",
              render: (_, record: any) => {
                // Assuming 'clockInLocation' is a boolean indicating if within perimeter
                if (record.currentShift?.clockInLatitude && record.currentShift?.clockInLongitude) {
                   // More accurate check might involve comparing against perimeter here if needed
                   return <Tag color="green">Location Logged</Tag>
                 }
                return <Tag color="orange">No Location Logged</Tag>;

              },
            },
            {
              title: "Actions",
              key: "actions",
              render: (_, record: any) => (
                <Button
                  type="link"
                  size="small"
                  onClick={() => handleViewWorkerLogs(record.id)}
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