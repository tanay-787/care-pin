"use client";

import { FC } from "react";
import { Card, Table, Typography, Tag, Button, Space } from "antd";
import type { User } from "@/lib/types";

const { Text } = Typography;

interface StaffTabProps {
  users: User[];
  onViewWorkerLogs: (workerId: string) => void;
}

const StaffTab: FC<StaffTabProps> = ({ users, onViewWorkerLogs }) => {
  return (
    <Card title="Staff Management">
      <Table
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 4 }}
        scroll={{ x: true }}
        columns={[
          { title: "Name", dataIndex: "name", render: (name: string) => <Text strong>{name}</Text> },
          { title: "Email", dataIndex: "email" },
          {
            title: "Role",
            dataIndex: "role",
            filters: [
              { text: "Manager", value: "MANAGER" },
              { text: "Care Worker", value: "CARE_WORKER" },
            ],
            onFilter: (value, record) => record.role === value,
            render: (role: User["role"]) => (
              <Tag color={role === "MANAGER" ? "blue" : "green"}>
                {role === "MANAGER" ? "Manager" : "Care Worker"}
              </Tag>
            ),
          },
          {
            title: "Actions",
            render: (_: unknown, record: User) =>
              record.role === "CARE_WORKER" && (
                <Space>
                  <Button type="link" size="small" onClick={() => onViewWorkerLogs(record.id)}>
                    View Logs
                  </Button>
                </Space>
              ),
          },
        ]}
      />
    </Card>
  );
};

export default StaffTab;
