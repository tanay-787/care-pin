"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Select,
  Alert,
} from "antd";
import { HistoryOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface User {
  id: string;
  email: string;
  name: string;
  role?: "MANAGER" | "CARE_WORKER";
}

interface Shift {
  id: string;
  clockInTime: string;
  clockOutTime: string | null;
  clockInLatitude: number | null;
  clockInLongitude: number | null;
  clockOutLatitude: number | null;
  clockOutLongitude: number | null;
  duration: number | null;
  notes: string | null;
  status: "CLOCKED_IN" | "CLOCKED_OUT";
  user: User;
}

interface ShiftLog extends Shift {
  key: string;
  clockInTimeFormatted: string;
  clockOutTimeFormatted: string;
  durationFormatted: string;
  totalHours: number;
}


interface ShiftLogsTabProps {
  allShifts: Shift[];
  allUsers: User[];
  selectedWorker: string | null;
  setSelectedWorker: (workerId: string | null) => void;
  workers: User[];
}

const ShiftLogsTab: React.FC<ShiftLogsTabProps> = ({
  allShifts,
  allUsers,
  selectedWorker,
  setSelectedWorker,
  workers,
}) => {

  const formatDuration = (startTime: string | number, endTime: string | number | null) => {
    if (endTime === null) {
       const now = Date.now()
       const start = typeof startTime === "string" ? parseInt(startTime, 10) : startTime
       const diff = now - start
       const hours = Math.floor(diff / (1000 * 60 * 60))
       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
       return `${hours}h ${minutes}m (ongoing)`
    }

    const start = typeof startTime === "string" ? parseInt(startTime, 10) : startTime
    const end = typeof endTime === "string" ? parseInt(endTime, 10) : endTime
    const diff = end - start
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
   };


   const getManagerShiftHistory = (shifts: Shift[]): ShiftLog[] => {
    if (!shifts) return [];

    return shifts
      .map((shift) => {
        const clockIn = parseInt(shift.clockInTime, 10);
        const clockOut = shift.clockOutTime ? parseInt(shift.clockOutTime, 10) : null;

        const durationHours = clockOut
          ? (clockOut - clockIn) / (1000 * 60 * 60) // convert ms diff → hours
          : 0; // Or calculate elapsed time if needed for ongoing

        return {
          ...shift,
          key: shift.id,
          clockInTimeFormatted: new Date(clockIn).toLocaleString(),
          clockOutTimeFormatted: clockOut ? new Date(clockOut).toLocaleString() : "Still clocked in",
          durationFormatted: formatDuration(clockIn, clockOut),
          totalHours: durationHours,
        };
      })
      .sort((a, b) => parseInt(b.clockInTime, 10) - parseInt(a.clockInTime, 10));
  };


  const filteredShifts = selectedWorker
    ? allShifts.filter((shift) => shift.user.id === selectedWorker)
    : allShifts;

  const managerShiftHistory = getManagerShiftHistory(filteredShifts);


  const shiftLogColumns = [
    {
      title: "Worker",
      key: "worker",
      render: (_: any, record: ShiftLog) => {
        return <Text strong>{record.user?.name}</Text>;
      },
    },
    {
      title: "Clock In",
      dataIndex: "clockInTimeFormatted",
      key: "clockIn",
      render: (time: string) => (
        <div>
          <div>{time.split(", ")[0]}</div> {/* Date part */}
          <Text type="secondary">{time.split(", ")[1]}</Text> {/* Time part */}
        </div>
      ),
    },
    {
      title: "Clock Out",
      dataIndex: "clockOutTimeFormatted",
      key: "clockOut",
      render: (time: string) =>
        time !== "Still clocked in" ? (
          <div>
            <div>{time.split(", ")[0]}</div> {/* Date part */}
            <Text type="secondary">{time.split(", ")[1]}</Text> {/* Time part */}
          </div>
        ) : (
          <Tag color="green">Still Working</Tag>
        ),
    },
    {
      title: "Duration",
      dataIndex: "durationFormatted",
      key: "duration",
    },
    {
      title: "Location",
      key: "location",
      render: (_: any, record: ShiftLog) => {
        if (record.clockInLatitude && record.clockInLongitude) { // Check for coordinates
          return <Tag color="green">Recorded</Tag>;
        } else {
          return <Tag color="orange">Not Recorded</Tag>;
        }
      },
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      render: (notes: string | null) =>
        notes ? (
          <Text ellipsis style={{ maxWidth: 150 }}>
            {notes}
          </Text>
        ) : (
          <Text type="secondary">-</Text>
        ),
    },
  ];

  return (
    <div>
      <Card title="All Shift Logs" style={{ marginBottom: 24 }}>
        <Space style={{ marginBottom: 16 }}>
          <Select
            placeholder="Filter by worker"
            style={{ width: 200 }}
            allowClear
            value={selectedWorker}
            onChange={setSelectedWorker}
          >
            {workers.map((worker) => (
              <Select.Option key={worker.id} value={worker.id}>
                {worker.name}
              </Select.Option>
            ))}
          </Select>
        </Space>

        {managerShiftHistory.length > 0 ? (
          <Table
            columns={shiftLogColumns}
            dataSource={managerShiftHistory}
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
          />
        ) : (
            <Alert
              message="No shift history found"
              description={selectedWorker ? `No shift history found for the selected worker.` : `No shift history found.`}
              type="info"
              showIcon
            />
          )}
      </Card>
    </div>
  );
};

export default ShiftLogsTab;