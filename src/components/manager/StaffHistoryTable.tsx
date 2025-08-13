// components/manager/StaffHistoryTable.tsx
"use client";
import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ShiftRecord } from "@/components/careworker/ShiftHistoryTable";

interface StaffHistoryTableProps {
  data: ShiftRecord[];
}

const StaffHistoryTable: React.FC<StaffHistoryTableProps> = ({ data }) => {
  const columns: ColumnsType<ShiftRecord> = [
    { title: "Date", dataIndex: "date", key: "date", responsive: ["xs", "sm", "md"], sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() },
    { title: "Clock In", dataIndex: "clockIn", key: "clockIn", responsive: ["sm", "md"] },
    { title: "Clock Out", dataIndex: "clockOut", key: "clockOut", responsive: ["sm", "md"] },
    { title: "Location", dataIndex: "location", key: "location", responsive: ["md"] },
    { title: "Note", dataIndex: "note", key: "note", responsive: ["lg"], render: (text) => text || "—" },
  ];

  return (
    <div style={{ overflowX: "auto" }} aria-label="Staff shift history table">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
        rowKey="key"
        sticky
      />
    </div>
  );
};

export default StaffHistoryTable;