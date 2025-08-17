"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation } from "@apollo/client"
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
  Tabs,
  Form,
  Input,
  Switch,
  InputNumber,
  Modal,
  Select,
  DatePicker,
  Spin,
  Alert,
  message,
  Divider,
  ConfigProvider,
} from "antd"
import {
  UserOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
  HistoryOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  StopOutlined,
  BarChartOutlined,
} from "@ant-design/icons"
import {
  GET_ALL_USERS,
  GET_ALL_SHIFTS,
  GET_LOCATION_PERIMETER,
  UPDATE_LOCATION_PERIMETER,
  GET_USER_SHIFTS,
  CLOCK_IN,
  CLOCK_OUT,
} from "@/lib/graphql-queries"
import UserButton from "@/components/UserButton"

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs
const { RangePicker } = DatePicker

export interface User {
  id: string
  email: string
  name: string
  role?: "MANAGER" | "CARE_WORKER"
}


const ManagerDashboard = ({ user }: { user: User }) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null)

  // GraphQL queries and mutations
  const { data: usersData, loading: usersLoading } = useQuery(GET_ALL_USERS)
  const { data: shiftsData, loading: shiftsLoading } = useQuery(GET_ALL_SHIFTS)
  const { data: perimeterData, loading: perimeterLoading } = useQuery(GET_LOCATION_PERIMETER)
  const [updatePerimeter] = useMutation(UPDATE_LOCATION_PERIMETER)

  const allUsers = usersData?.users || []
  const allShifts = shiftsData?.shifts || []
  const perimeterSettings = perimeterData?.locationPerimeter || {
    enabled: true,
    radius: 2,
    centerAddress: "123 Healthcare Center, Medical District",
    centerLat: 40.7128,
    centerLng: -74.006,
  }

  // Calculate statistics from real data
  const workers = usersData?.getAllUsers?.filter((u: any) => u.role === "CARE_WORKER") || [];
  const currentlyWorking = workers.filter((worker: any) =>
    allShifts.some((shift: any) => shift.userId === worker.id && !shift.clockOutTime),
  )
  const totalWorkers = workers.length

  const today = new Date().toDateString()
  const todayShifts = allShifts.filter((shift: any) => {
    return new Date(shift.clockInTime).toDateString() === today
  })

  const avgHoursPerDay =
    todayShifts.reduce((acc: number, shift: any) => {
      if (shift.clockOutTime) {
        const hours =
          (new Date(shift.clockOutTime).getTime() - new Date(shift.clockInTime).getTime()) / (1000 * 60 * 60)
        return acc + hours
      }
      return acc
    }, 0) / Math.max(todayShifts.length, 1)

  const handleViewWorkerLogs = (workerId: string) => {
    setSelectedWorker(workerId)
    setActiveTab("logs")
  }

  const handleUpdatePerimeter = async (values: any) => {
    try {
      await updatePerimeter({
        variables: {
          input: {
            enabled: values.enabled,
            radius: values.radius,
            centerAddress: values.centerAddress,
            centerLat: perimeterSettings.centerLat,
            centerLng: perimeterSettings.centerLng,
          },
        },
        refetchQueries: [{ query: GET_LOCATION_PERIMETER }],
      })
      message.success("Perimeter settings updated successfully")
    } catch (error) {
      message.error("Failed to update perimeter settings")
    }
  }

  if (usersLoading || shiftsLoading || perimeterLoading) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Loading dashboard...</div>
      </div>
    )
  }

  const tabItems = [
    {
      key: "overview",
      label: "Overview",
      children: (
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
              dataSource={currentlyWorking.map((worker: any) => {
                const currentShift = allShifts.find((shift: any) => shift.userId === worker.id && !shift.clockOutTime)
                return { ...worker, currentShift }
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
                      return new Date(record.currentShift.clockInTime).toLocaleTimeString()
                    }
                    return "-"
                  },
                },
                {
                  title: "Duration",
                  key: "duration",
                  render: (_, record: any) => {
                    if (record.currentShift) {
                      const duration = Date.now() - new Date(record.currentShift.clockInTime).getTime()
                      const hours = Math.floor(duration / (1000 * 60 * 60))
                      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
                      return `${hours}h ${minutes}m`
                    }
                    return "-"
                  },
                },
                {
                  title: "Location",
                  key: "location",
                  render: (_, record: any) => {
                    if (record.currentShift?.clockInLocation) {
                      return <Tag color="green">Within Perimeter</Tag>
                    }
                    return "-"
                  },
                },
                {
                  title: "Actions",
                  key: "actions",
                  render: (_, record: any) => (
                    <Button type="link" size="small" onClick={() => handleViewWorkerLogs(record.id)}>
                      View Logs
                    </Button>
                  ),
                },
              ]}
            />
          </Card>
        </div>
      ),
    },
    {
      key: "staff",
      label: "Staff",
      children: (
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
                  { text: 'Manager', value: 'MANAGER' },
                  { text: 'Care Worker', value: 'CARE_WORKER' },
                ],
                onFilter: (value: string | boolean | number | bigint, record: any) => record.role === value,
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
                      <Button type="link" size="small" onClick={() => handleViewWorkerLogs(record.id)}>
                        View Logs
                      </Button>
                    )}
                  </Space>
                ),
              },
            ]}
          />
        </Card>
      ),
    },
    {
      key: "location",
      label: "Location Settings",
      children: (
        <Card title="GPS Perimeter Management">
          <Form layout="vertical" initialValues={perimeterSettings} onFinish={handleUpdatePerimeter}>
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item name="enabled" label="Location Restrictions" valuePropName="checked">
                  <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
                </Form.Item>

                <Form.Item
                  name="centerAddress"
                  label="Center Location Address"
                  rules={[{ required: true, message: "Please enter center address" }]}
                >
                  <Input.TextArea rows={2} placeholder="Enter the address of your healthcare center" />
                </Form.Item>

                <Form.Item
                  name="radius"
                  label="Allowed Radius (km)"
                  rules={[{ required: true, message: "Please set radius" }]}
                >
                  <InputNumber min={0.1} max={50} step={0.1} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Card size="small" title="Current Settings">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Text>
                      <strong>Status:</strong>{" "}
                      <Tag color={perimeterSettings.enabled ? "green" : "red"}>
                        {perimeterSettings.enabled ? "Active" : "Disabled"}
                      </Tag>
                    </Text>
                    <Text>
                      <strong>Radius:</strong> {perimeterSettings.radius} km
                    </Text>
                    <Text>
                      <strong>Center:</strong> {perimeterSettings.centerAddress}
                    </Text>
                    <Text type="secondary">Workers can only clock in/out within this perimeter</Text>
                  </Space>
                </Card>
              </Col>
            </Row>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Perimeter Settings
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: "logs",
      label: "Shift Logs",
      children: (
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
                {workers.map((worker: any) => (
                  <Select.Option key={worker.id} value={worker.id}>
                    {worker.name}
                  </Select.Option>
                ))}
              </Select>
            </Space>

            <Table
              dataSource={
                selectedWorker ? allShifts.filter((shift: any) => shift.userId === selectedWorker) : allShifts
              }
              rowKey="id"
              pagination={{ pageSize: 10 }}
              columns={[
                {
                  title: "Worker",
                  key: "worker",
                  render: (_, record: any) => {
                    const worker = allUsers.find((u: any) => u.id === record.userId)
                    return <Text strong>{worker?.name}</Text>
                  },
                },
                {
                  title: "Clock In",
                  dataIndex: "clockInTime",
                  key: "clockIn",
                  render: (time: string) => (
                    <div>
                      <div>{new Date(time).toLocaleDateString()}</div>
                      <Text type="secondary">{new Date(time).toLocaleTimeString()}</Text>
                    </div>
                  ),
                },
                {
                  title: "Clock Out",
                  dataIndex: "clockOutTime",
                  key: "clockOut",
                  render: (time: string | null) =>
                    time ? (
                      <div>
                        <div>{new Date(time).toLocaleDateString()}</div>
                        <Text type="secondary">{new Date(time).toLocaleTimeString()}</Text>
                      </div>
                    ) : (
                      <Tag color="green">Still Working</Tag>
                    ),
                },
                {
                  title: "Duration",
                  key: "duration",
                  render: (_, record: any) => {
                    if (record.clockOutTime) {
                      const duration = new Date(record.clockOutTime).getTime() - new Date(record.clockInTime).getTime()
                      const hours = Math.floor(duration / (1000 * 60 * 60))
                      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
                      return `${hours}h ${minutes}m`
                    }
                    const duration = Date.now() - new Date(record.clockInTime).getTime()
                    const hours = Math.floor(duration / (1000 * 60 * 60))
                    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
                    return `${hours}h ${minutes}m (ongoing)`
                  },
                },
                {
                  title: "Location",
                  key: "location",
                  render: (_, record: any) => {
                    if (record.clockInLocation) {
                      return <Tag color="green">Valid</Tag>
                    } else {
                      return <Tag color="orange">No Location</Tag>
                    }
                  },
                },
                {
                  title: "Notes",
                  dataIndex: "clockInNote",
                  key: "notes",
                  render: (notes: string) =>
                    notes ? (
                      <Text ellipsis style={{ maxWidth: 100 }}>
                        {notes}
                      </Text>
                    ) : (
                      <Text type="secondary">-</Text>
                    ),
                },
              ]}
            />
          </Card>
        </div>
      ),
    },
  ]

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Manager Dashboard</Title>
        <Text type="secondary">Welcome back, {user.name}. Here`&apos;`s your staff overview and management tools.</Text>
      </div>
      <UserButton />
      </div>
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} size="large" />
    </div>
  )
}

export default ManagerDashboard;