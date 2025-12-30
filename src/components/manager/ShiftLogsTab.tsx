"use client";

import { FC } from "react";
import { Card, Table, Typography, Tag, Select, Space, Grid } from "antd";
import type { Shift, User } from "@/lib/types";

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface ShiftLogsTabProps {
  shifts: Shift[];
  workers: User[];
  selectedWorker: string | null;
  onSelectWorker: (id: string | null) => void;
}

const ShiftLogsTab: FC<ShiftLogsTabProps> = ({ shifts, workers, selectedWorker, onSelectWorker }) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <Card 
      title="All Shift Logs" 
      size={isMobile ? "small" : "default"}
      styles={{ body: { padding: isMobile ? 0 : "24px" } }}
    >
      <Space style={{ marginBottom: 16, padding: isMobile ? "12px 12px 0" : 0 }}>
        <Select
          placeholder="Filter by worker"
          style={{ width: isMobile ? "100%" : 200 }}
          allowClear
          value={selectedWorker}
          onChange={onSelectWorker}
        >
          {workers.map((w) => (
            <Select.Option key={w.id} value={w.id}>{w.name}</Select.Option>
          ))}
        </Select>
      </Space>

      <Table
        dataSource={shifts.filter((s) => (selectedWorker ? s.user.id === selectedWorker : true))}
        rowKey="id"
        scroll={{ x: "max-content" }}
        pagination={{ pageSize: 4, size: isMobile ? "small" : "default" }}
        size={isMobile ? "small" : "middle"}
        columns={[
          { title: "Worker", dataIndex: "workerName", render: (name: string) => <Text strong>{name}</Text> },
          { title: "Clock In", dataIndex: "clockInTimeFormatted" },
          { title: "Clock Out", dataIndex: "clockOutTimeFormatted", render: (time: string) => time === "Still clocked in" ? <Tag color="green">Still Working</Tag> : time },
          { title: "Duration", dataIndex: "durationFormatted" },
          { title: "Status", dataIndex: "status", render: (s: string) => <Tag color={s === "CLOCKED_IN" ? "green" : "default"}>{s}</Tag> },
        ]}
      />
    </Card>
  );
};

export default ShiftLogsTab;
