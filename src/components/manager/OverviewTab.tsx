"use client";

import { FC } from "react";
import { Row, Col, Card, Statistic, Table, Tag, Typography, Button } from "antd";
import { UserOutlined, TeamOutlined, ClockCircleOutlined, HistoryOutlined } from "@ant-design/icons";
import type { User, Shift } from "@/lib/types";

const { Text } = Typography;

interface OverviewTabProps {
  workers: number;
  currentlyWorking: User[];
  allShifts: Shift[];
  avgHoursPerDay: number;
  todayShifts: Shift[];
  onViewWorkerLogs: (workerId: string) => void;
}

const OverviewTab: FC<OverviewTabProps> = ({
  workers,
  currentlyWorking,
  allShifts,
  avgHoursPerDay,
  todayShifts,
  onViewWorkerLogs,
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
              value={workers}
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

      <Card title="Currently Working Staff">
        <Table
          dataSource={currentlyWorking.map((worker) => {
            const currentShift = allShifts.find((s) => s.userId === worker.id && !s.clockOutTime);
            return { ...worker, currentShift };
          })}
          rowKey="id"
          pagination={{ pageSize: 4 }}
          scroll={{ x: true }}
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
              render: (name: string) => <Text strong>{name}</Text>,
            },
            { title: "Status", render: () => <Tag color="green">Working</Tag> },
            {
              title: "Clock In Time",
              render: (_: unknown, record: any) =>
                record.currentShift ? new Date(record.currentShift.clockInTime).toLocaleTimeString() : "-",
            },
            {
              title: "Duration",
              render: (_: unknown, record: any) => {
                if (record.currentShift) {
                  const duration = Date.now() - new Date(record.currentShift.clockInTime).getTime();
                  const hours = Math.floor(duration / (1000 * 60 * 60));
                  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
                  return `${hours}h ${minutes}m`;
                }
                return "-";
              },
            },
            {
              title: "Location",
              render: (_: unknown, record: any) =>
                record.currentShift?.clockInLocation ? <Tag color="green">Within Perimeter</Tag> : "-",
            },
            {
              title: "Actions",
              render: (_: unknown, record: any) => (
                <Button type="link" size="small" onClick={() => onViewWorkerLogs(record.id)}>
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