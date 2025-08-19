"use client";

import { Card, Table, Tag, Button, Space, Typography } from "antd";
import { type User } from "@/lib/types";

const { Text } = Typography;

interface StaffTabProps {
  usersData: {
    getAllUsers: User[];
  } | undefined;
  handleViewWorkerLogs: (workerId: string) => void;
}

const StaffTab: React.FC<StaffTabProps> = ({
  usersData,
  handleViewWorkerLogs,
}) => {
  return (
    <Card title="Staff Management">
      <Table
        dataSource={usersData?.getAllUsers || []}
        rowKey="id"
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (name: string) => <Text strong>{name}</Text>,
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Role",
            dataIndex: "role",
            key: "role",
            filters: [
              { text: "Manager", value: "MANAGER" },
              { text: "Care Worker", value: "CARE_WORKER" },
            ],
            onFilter: (
              value: string | boolean | number | bigint,
              record: any
            ) => record.role === value,
            render: (role: "MANAGER" | "CARE_WORKER") => (
              <Tag color={role === "MANAGER" ? "blue" : "green"}>
                {role === "MANAGER" ? "Manager" : "Care Worker"}
              </Tag>
            ),
          },
          {
            title: "Actions",
            key: "actions",
            render: (_, record: any) => (
              <Space>
                {record.role === "CARE_WORKER" && (
                  <Button
                    type="link"
                    size="small"
                    onClick={() => handleViewWorkerLogs(record.id)}
                  >
                    View Logs
                  </Button>
                )}
              </Space>
            ),
          },
        ]}
      />
    </Card>
  );
};

export default StaffTab;