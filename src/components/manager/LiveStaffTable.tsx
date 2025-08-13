// components/manager/LiveStaffTable.tsx
"use client";
import React from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface StaffRecord {
  key: string;
  name: string;
  clockIn: string;
  location: string;
  note?: string;
}

interface LiveStaffTableProps {
  data: StaffRecord[];
}

const LiveStaffTable: React.FC<LiveStaffTableProps> = ({ data }) => {
  const columns: ColumnsType<StaffRecord> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Clock In Time",
      dataIndex: "clockIn",
      key: "clockIn",
      responsive: ["sm", "md", "lg"],
      sorter: (a, b) => Date.parse(a.clockIn) - Date.parse(b.clockIn),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      responsive: ["md", "lg"],
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      responsive: ["lg"],
      render: (text) => text || <Tag color="default">—</Tag>,
    },
  ];

  return (
    <div style={{ overflowX: "auto" }} aria-label="Currently clocked in staff table">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: "max-content" }}
        rowKey="key"
        sticky
      />
    </div>
  );
};

export default LiveStaffTable;
