// components/careworker/ShiftHistoryTable.tsx
"use client";
import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

export interface ShiftRecord {
  key: string;
  date: string;
  clockIn: string;
  clockOut: string;
  location: string;
  note?: string;
}

interface ShiftHistoryTableProps {
  data: ShiftRecord[];
}

const ShiftHistoryTable: React.FC<ShiftHistoryTableProps> = ({ data }) => {
  const columns: ColumnsType<ShiftRecord> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["xs", "sm", "md", "lg"],
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Clock In",
      dataIndex: "clockIn",
      key: "clockIn",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Clock Out",
      dataIndex: "clockOut",
      key: "clockOut",
      responsive: ["sm", "md", "lg"],
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
      render: (text) => text || "—",
    },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
        rowKey="key"
        aria-label="Shift history table"
      />
    </div>
  );
};

export default ShiftHistoryTable;
