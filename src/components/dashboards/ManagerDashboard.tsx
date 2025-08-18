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
import Select from "antd/lib/select"
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic';

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs
const { RangePicker } = DatePicker
const { useForm } = Form;
const LocationMap = dynamic(() => import('@/components/pwa/LocationMap'), { ssr: false });


export interface User {
  id: string
  email: string
  name: string
  role?: "MANAGER" | "CARE_WORKER"
}


const ManagerDashboard = ({ user }: { user: User }) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null)
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  

  // GraphQL queries and mutations
  const { data: usersData, loading: usersLoading } = useQuery(GET_ALL_USERS)
  const { data: shiftsData, loading: shiftsLoading } = useQuery(GET_ALL_SHIFTS)
  const { data: perimeterData, loading: perimeterLoading } = useQuery(GET_LOCATION_PERIMETER)
  const [updatePerimeter] = useMutation(UPDATE_LOCATION_PERIMETER)

  const allUsers = usersData?.users || []
  const allShifts = shiftsData?.shifts || []
  const perimeterSettings = perimeterData?.getLocationPerimeter;


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

  const handleUpdatePerimeter = async () => { // No need for 'values' parameter here
    try {
      // Get the current values directly from the form instance
      const formValues = form.getFieldsValue();

      console.log(form.getFieldsValue());

      await updatePerimeter({
        variables: { 
            radiusKm: formValues.radius,
            address: formValues.centerAddress,
            centerLatitude: formValues.centerLat,
            centerLongitude: formValues.centerLng,
            isActive: true,
        },
        refetchQueries: [{ query: GET_LOCATION_PERIMETER }],
      })
      messageApi.success("Perimeter settings updated successfully")
      console.log(perimeterSettings);
      // router.refresh();
    } catch (error) {
      messageApi.error("Failed to update perimeter settings")
    }
  }
  

  if (usersLoading || shiftsLoading || perimeterLoading) {
    return (
      <div style={{ marginTop: "50%",marginLeft: "50%", textAlign: "center" }}>
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
          {/* Form for updating an existing perimeter */}
          {perimeterSettings ? (
            <Form
              form={form}
              layout="vertical"
              initialValues={perimeterSettings}
              onFinish={handleUpdatePerimeter}
            >
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <LocationMap
                    centerLat={perimeterSettings?.centerLatitude}
                    centerLng={perimeterSettings?.centerLongitude}
                    radius={perimeterSettings?.radiusKm ?? 2} 
                    editable={true}
                    onChange={(newCenter, newRadius, newAddress) => {
                      form.setFieldsValue({
                        centerLat: newCenter.lat,
                        centerLng: newCenter.lng,
                        centerAddress: newAddress,
                        radius: newRadius,
                      });
                    }}
                  />
                </Col>
    
                {/* Hidden Form Items to capture LocationMap coordinates and radius */}
                <Form.Item
                  name="centerLat"
                  hidden
                  initialValue={perimeterSettings?.centerLatitude}
                >
                  <Input type="hidden" />
                </Form.Item>
                <Form.Item
                  name="centerLng"
                  hidden
                  initialValue={perimeterSettings?.centerLongitude}
                >
                  <Input type="hidden" />
                </Form.Item>
                <Form.Item
                  name="radius"
                  hidden
                  initialValue={perimeterSettings?.radiusKm ?? 2}
                >
                  <Input type="hidden" />
                </Form.Item>
                <Form.Item name="centerAddress" hidden initialValue={perimeterSettings?.address}>
                        <Input type="hidden" />
                      </Form.Item>
                <Col xs={24} md={12}>
                  <Card size="small" title="Current Settings">
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Text>
                        <strong>Status:</strong>{" "}
                        <Tag color={perimeterSettings?.isActive ? "green" : "red"}>
                          {perimeterSettings?.isActive ? "Active" : "Disabled"}
                        </Tag>
                      </Text>
                      <Text>
                        <strong>Radius:</strong> {perimeterSettings?.radiusKm} km
                      </Text>
                      <Text>
                        <strong>Center:</strong> {perimeterSettings?.address}
                      </Text>
                      <Text type="secondary">
                        Workers can only clock in/out within this perimeter
                      </Text>
                    </Space>
                  </Card>
                </Col>
              </Row>
    
              <Form.Item>
                <Button type="primary" htmlType="submit" >
                  Update Location
                </Button>
              </Form.Item>
            </Form>
          ) : (
            // 🚀 Create new perimeter
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                centerLat: 19.076, // fallback Mumbai
                centerLng: 72.8777,
                radius: 2,
              }}
              onFinish={handleUpdatePerimeter}
            >
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <LocationMap
                    centerLat={19.076}
                    centerLng={72.8777}
                    radius={2}
                    editable={true}
                    onChange={(newCenter, newRadius, newAddress) => {
                      form.setFieldsValue({
                        centerLat: newCenter.lat,
                        centerLng: newCenter.lng,
                        centerAddress: newAddress,
                        radius: newRadius,
                      });
                    }}
                  />
                </Col>
    
                <Col xs={24} md={12}>
                  <Card size="small" title="New Perimeter">
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Text type="secondary">
                        Drag the marker to set your location, and adjust the radius with the slider.
                      </Text>
                      <Form.Item name="radius" label="Radius (km)">
                        <InputNumber min={0.5} max={20} step={0.5} />
                      </Form.Item>
                      <Form.Item name="centerAddress" label="Center Address">
                        <Input readOnly />
                      </Form.Item>
                      {/* Hidden Form Items to capture LocationMap coordinates */}
                      <Form.Item
                        name="centerLat"
                        hidden // This hides the form item visually
 initialValue={19.076}
                      >
                        <Input type="hidden" />
                      </Form.Item>
                      <Form.Item
 name="centerLng"
 hidden // This hides the form item visually
 initialValue={72.8777}
                      >
                        <Input type="hidden" />{/* Or any valid child */}
                      </Form.Item>
                    </Space>
                  </Card>
                </Col>
              </Row>
    
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save Location
                </Button>
              </Form.Item>
            </Form>
          )}
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
    <>
    {contextHolder}
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Manager Dashboard</Title>
        <Text type="secondary">Welcome back, {user.name}. Here`&apos;`s your staff overview and management tools.</Text>
      </div>
      <UserButton size="large" />
      </div>
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} size="large" />
    </div>
    </>
  )
}

export default ManagerDashboard;