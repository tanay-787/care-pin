"use client"

import { useState, useEffect } from "react"
import { useMutation, useQuery } from "@apollo/client"
import {
  Card,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Typography,
  message,
  Space,
  Tag,
  Alert,
  Modal,
  Row,
  Col,
  Statistic,
  Table,
  Tabs,
  Tooltip,
  ConfigProvider,
  Divider,
  Switch,
  Spin,
} from "antd"
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  UserAddOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  StopOutlined,
  TeamOutlined,
  BarChartOutlined,
  HistoryOutlined,
} from "@ant-design/icons"

import {
  LOGIN_USER,
  REGISTER_USER,
  CLOCK_IN,
  CLOCK_OUT,
  GET_USER_SHIFTS,
  GET_LOCATION_PERIMETER,
  GET_ALL_USERS,
  GET_ALL_SHIFTS,
  UPDATE_LOCATION_PERIMETER,
} from "@/lib/graphql-queries"

const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { TabPane } = Tabs

const appTheme = {
  token: {
    colorPrimary: "#1677ff",
    borderRadius: 8,
    wireframe: false,
  },
  components: {
    Card: {
      paddingLG: 24,
    },
    Button: {
      borderRadius: 8,
    },
  },
}

interface User {
  id: string
  email: string
  name: string
  role: "MANAGER" | "WORKER"
  token?: string
}

// Mock location data (simulating GPS)
const mockLocation = {
  latitude: 40.7128,
  longitude: -74.006,
  address: "123 Healthcare Center, New York, NY",
}

// Enhanced perimeter system with manager controls
const allowedPerimeter: PerimeterSettings = {
  centerLat: 40.7128,
  centerLng: -74.006,
  centerAddress: "123 Healthcare Center, New York, NY",
  radiusKm: 2,
  enabled: true,
  lastModified: new Date(),
  modifiedBy: "John Manager",
}

// Mock user data
const mockUsers: User[] = [
  { id: "1", email: "manager1@example.com", name: "John Manager", role: "MANAGER" },
  { id: "2", email: "worker1@example.com", name: "Jane Worker", role: "WORKER" },
  { id: "3", email: "worker2@example.com", name: "Bob Worker", role: "WORKER" },
]

// Enhanced mock shift data with more historical records for analytics
const mockShifts: Shift[] = [
  {
    id: 1,
    workerId: 2,
    workerName: "Jane Worker",
    clockInTime: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    clockInLocation: mockLocation.address,
    clockOutTime: undefined,
    clockOutLocation: undefined,
    clockInNote: "Starting morning shift",
    clockOutNote: undefined,
    status: "clocked-in",
  },
  {
    id: 2,
    workerId: 3,
    workerName: "Bob Worker",
    clockInTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    clockInLocation: mockLocation.address,
    clockInNote: "Regular shift",
    clockOutTime: new Date(Date.now() - 16 * 60 * 60 * 1000), // 8 hours later
    clockOutLocation: mockLocation.address,
    clockOutNote: "End of shift",
    status: "clocked-out",
  },
  {
    id: 3,
    workerId: 2,
    workerName: "Jane Worker",
    clockInTime: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    clockInLocation: mockLocation.address,
    clockOutTime: new Date(Date.now() - 40 * 60 * 60 * 1000), // 8 hours later
    clockOutLocation: mockLocation.address,
    clockInNote: "Early morning shift",
    clockOutNote: "Completed tasks",
    status: "clocked-out",
  },
  {
    id: 4,
    workerId: 3,
    workerName: "Bob Worker",
    clockInTime: new Date(Date.now() - 72 * 60 * 60 * 1000), // 3 days ago
    clockInLocation: mockLocation.address,
    clockInNote: "Weekend shift",
    clockOutTime: new Date(Date.now() - 64 * 60 * 60 * 1000), // 8 hours later
    clockOutLocation: mockLocation.address,
    clockOutNote: "All good",
    status: "clocked-out",
  },
]

interface Shift {
  id: number
  workerId: number
  workerName: string
  clockInTime: Date
  clockOutTime?: Date
  clockInLocation: string
  clockOutLocation?: string
  clockInNote: string
  clockOutNote?: string
  status: "clocked-in" | "clocked-out"
}

interface PerimeterSettings {
  enabled: boolean
  centerAddress: string
  centerLat: number
  centerLng: number
  radiusKm: number
  lastModified: Date
  modifiedBy: string
}

const ManagerDashboard = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
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
  const workers = allUsers.filter((u: any) => u.role === "WORKER")
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
                  prefix={<BarChartOutlined />}
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
                      return (
                        <Tooltip title={`${record.currentShift.clockInLocation}`}>
                          <Tag color="green">Within Perimeter</Tag>
                        </Tooltip>
                      )
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
      label: "All Staff",
      children: (
        <Card title="Staff Management">
          <Table
            dataSource={workers}
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
                title: "Status",
                key: "status",
                render: (_, record: any) => {
                  const hasActiveShift = allShifts.some(
                    (shift: any) => shift.userId === record.id && !shift.clockOutTime,
                  )
                  return hasActiveShift ? <Tag color="green">Working</Tag> : <Tag color="default">Off Duty</Tag>
                },
              },
              {
                title: "Actions",
                key: "actions",
                render: (_, record: any) => (
                  <Space>
                    <Button type="link" size="small" onClick={() => handleViewWorkerLogs(record.id)}>
                      View Logs
                    </Button>
                    <Button type="link" size="small" danger>
                      Suspend
                    </Button>
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
                      return (
                        <Tooltip title={`${record.clockInLocation}`}>
                          <Tag color="green">Valid</Tag>
                        </Tooltip>
                      )
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
                      <Tooltip title={notes}>
                        <Text ellipsis style={{ maxWidth: 100 }}>
                          {notes}
                        </Text>
                      </Tooltip>
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
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Manager Dashboard</Title>
        <Text type="secondary">Welcome back, {user.name}. Here's your staff overview and management tools.</Text>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} size="large" />
      <Button onClick={onLogout} style={{ marginTop: 16 }}>
        Logout
      </Button>
    </div>
  )
}

const WorkerDashboard = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
  const [currentShift, setCurrentShift] = useState<any>(null)
  const [location, setLocation] = useState<any>(null)
  const [locationLoading, setLocationLoading] = useState(false)
  const [clockLoading, setClockLoading] = useState(false)
  const [noteModalVisible, setNoteModalVisible] = useState(false)
  const [clockAction, setClockAction] = useState<"in" | "out">("in")
  const [note, setNote] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")

  const {
    data: shiftsData,
    loading: shiftsLoading,
    refetch: refetchShifts,
  } = useQuery(GET_USER_SHIFTS, {
    variables: { userId: user.id },
    pollInterval: 30000, // Poll every 30 seconds for real-time updates
  })

  const { data: perimeterData, loading: perimeterLoading } = useQuery(GET_LOCATION_PERIMETER, {
    pollInterval: 60000, // Poll every minute for perimeter updates
  })

  const [clockInMutation] = useMutation(CLOCK_IN, {
    onCompleted: (data: { clockIn: any }) => {
      setCurrentShift(data.clockIn)
      message.success("Successfully clocked in!")
      refetchShifts()
    },
    onError: (error: { message: any }) => {
      message.error(error.message || "Failed to clock in")
    },
  })

  const [clockOutMutation] = useMutation(CLOCK_OUT, {
    onCompleted: (data: any) => {
      setCurrentShift(null)
      message.success("Successfully clocked out!")
      refetchShifts()
    },
    onError: (error: { message: any }) => {
      message.error(error.message || "Failed to clock out")
    },
  })

  useEffect(() => {
    if (shiftsData?.getUserShifts) {
      const activeShift = shiftsData.getUserShifts.find((shift: any) => shift.status === "CLOCKED_IN")
      setCurrentShift(activeShift || null)
    }

    // Simulate getting current location
    getCurrentLocation()
  }, [shiftsData])

  const getCurrentLocation = async () => {
    setLocationLoading(true)

    try {
      // Try to get real GPS location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            setLocation({
              latitude,
              longitude,
              address: "Current GPS Location", // In real app, you'd reverse geocode this
            })
            setLocationLoading(false)
          },
          (error) => {
            console.warn("GPS not available, using mock location:", error)
            // Fallback to mock location
            setMockLocation()
          },
        )
      } else {
        setMockLocation()
      }
    } catch (error) {
      setMockLocation()
    }
  }

  const setMockLocation = async () => {
    // Simulate GPS delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock location with slight variations
    const mockCurrentLocation = {
      latitude: mockLocation.latitude + (Math.random() - 0.5) * 0.01,
      longitude: mockLocation.longitude + (Math.random() - 0.5) * 0.01,
      address: mockLocation.address,
    }

    setLocation(mockCurrentLocation)
    setLocationLoading(false)
  }

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const isWithinPerimeter = () => {
    if (!location) return false

    const perimeter = perimeterData?.getLocationPerimeter
    if (!perimeter || !perimeter.isActive) return true

    const distance = calculateDistance(
      location.latitude,
      location.longitude,
      perimeter.centerLatitude,
      perimeter.centerLongitude,
    )
    return distance <= perimeter.radiusKm
  }

  const handleClockAction = (action: "in" | "out") => {
    if (!location) {
      message.error("Location not available. Please wait for GPS to load.")
      return
    }

    const perimeter = perimeterData?.getLocationPerimeter
    if (perimeter?.isActive && !isWithinPerimeter()) {
      message.error(
        `You are outside the allowed perimeter (${perimeter.radiusKm}km radius). Please move closer to the workplace.`,
      )
      return
    }

    setClockAction(action)
    setNote("")
    setNoteModalVisible(true)
  }

  const confirmClockAction = async () => {
    setClockLoading(true)

    try {
      if (clockAction === "in") {
        await clockInMutation({
          variables: {
            latitude: location.latitude,
            longitude: location.longitude,
            notes: note || undefined,
          },
        })
      } else {
        // Clock out
        if (currentShift) {
          await clockOutMutation({
            variables: {
              shiftId: currentShift.id,
              latitude: location.latitude,
              longitude: location.longitude,
              notes: note || undefined,
            },
          })
        }
      }
    } catch (error) {
      console.error("Clock action error:", error)
    }

    setClockLoading(false)
    setNoteModalVisible(false)
  }

  const formatDuration = (startTime: string | Date) => {
    const now = new Date()
    const start = new Date(startTime)
    const diff = now.getTime() - start.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const getWorkerHistory = () => {
    if (!shiftsData?.getUserShifts) return []

    return shiftsData.getUserShifts
      .map((shift: any) => ({
        ...shift,
        key: shift.id,
        clockInTimeFormatted: new Date(shift.clockInTime).toLocaleString(),
        clockOutTimeFormatted: shift.clockOutTime ? new Date(shift.clockOutTime).toLocaleString() : "Still clocked in",
        duration: shift.clockOutTime
          ? `${Math.round((new Date(shift.clockOutTime).getTime() - new Date(shift.clockInTime).getTime()) / (1000 * 60 * 60 * 100)) / 100}h`
          : formatDuration(shift.clockInTime),
        totalHours: shift.duration || 0,
      }))
      .sort((a: any, b: any) => new Date(b.clockInTime).getTime() - new Date(a.clockInTime).getTime())
  }

  const getWorkerStats = () => {
    const history = getWorkerHistory()
    const completedShifts = history.filter((shift: any) => shift.status === "CLOCKED_OUT")

    const totalHours = completedShifts.reduce((acc: number, shift: any) => acc + (shift.totalHours || 0), 0)
    const avgHoursPerShift = completedShifts.length > 0 ? totalHours / completedShifts.length : 0

    // This week's hours
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const thisWeekShifts = completedShifts.filter((shift: any) => new Date(shift.clockInTime) >= weekAgo)
    const thisWeekHours = thisWeekShifts.reduce((acc: number, shift: any) => acc + (shift.totalHours || 0), 0)

    return {
      totalShifts: history.length,
      completedShifts: completedShifts.length,
      totalHours: totalHours.toFixed(1),
      avgHoursPerShift: avgHoursPerShift.toFixed(1),
      thisWeekHours: thisWeekHours.toFixed(1),
    }
  }

  const workerHistory = getWorkerHistory()
  const workerStats = getWorkerStats()
  const perimeter = perimeterData?.getLocationPerimeter

  const historyColumns = [
    {
      title: "Date",
      dataIndex: "clockInTime",
      key: "date",
      render: (time: string) => new Date(time).toLocaleDateString(),
    },
    {
      title: "Clock In",
      dataIndex: "clockInTimeFormatted",
      key: "clockIn",
      render: (time: string) => time.split(" ")[1], // Show only time part
    },
    {
      title: "Clock Out",
      dataIndex: "clockOutTimeFormatted",
      key: "clockOut",
      render: (time: string) => (time === "Still clocked in" ? time : time.split(" ")[1]),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "CLOCKED_IN" ? "green" : "default"}>
          {status === "CLOCKED_IN" ? "Active" : "Completed"}
        </Tag>
      ),
    },
    {
      title: "Clock In Note",
      dataIndex: "notes",
      key: "clockInNote",
      ellipsis: true,
    },
  ]

  return (
    <div>
      <Title level={3}>Worker Dashboard</Title>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Dashboard" key="dashboard">
          {/* Current Status */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12}>
              <Card size="small">
                <Statistic
                  title="Current Status"
                  value={currentShift ? "Clocked In" : "Clocked Out"}
                  prefix={
                    currentShift ? (
                      <CheckCircleOutlined style={{ color: "#52c41a" }} />
                    ) : (
                      <StopOutlined style={{ color: "#ff4d4f" }} />
                    )
                  }
                  valueStyle={{ color: currentShift ? "#52c41a" : "#ff4d4f" }}
                />
              </Card>
            </Col>

            {currentShift && (
              <Col xs={24} sm={12}>
                <Card size="small">
                  <Statistic
                    title="Time Worked Today"
                    value={formatDuration(currentShift.clockInTime)}
                    prefix={<ClockCircleOutlined />}
                  />
                </Card>
              </Col>
            )}
          </Row>

          {/* Location Status */}
          <Card style={{ marginBottom: 24 }}>
            <Title level={4}>
              <EnvironmentOutlined /> Location Status
            </Title>

            {locationLoading ? (
              <Alert message="Getting your location..." type="info" showIcon />
            ) : location ? (
              <div>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div>
                    <Text strong>Current Location: </Text>
                    <Text>{location.address}</Text>
                  </div>

                  <div>
                    <Text strong>Perimeter Status: </Text>
                    <Tag color={isWithinPerimeter() ? "green" : "red"}>
                      {isWithinPerimeter() ? "Within Allowed Area" : "Outside Allowed Area"}
                    </Tag>
                  </div>

                  {perimeter?.isActive && !isWithinPerimeter() && (
                    <Alert
                      message="You are outside the allowed perimeter"
                      description={`You must be within ${perimeter.radiusKm}km of ${perimeter.address} to clock in/out.`}
                      type="warning"
                      showIcon
                    />
                  )}

                  {!perimeter?.isActive && (
                    <Alert
                      message="Location restrictions disabled"
                      description="You can clock in/out from any location."
                      type="info"
                      showIcon
                    />
                  )}
                </Space>
              </div>
            ) : (
              <Alert message="Location unavailable" type="error" showIcon />
            )}

            <Button onClick={getCurrentLocation} loading={locationLoading} style={{ marginTop: "12px" }}>
              Refresh Location
            </Button>
          </Card>

          {/* Clock In/Out Actions */}
          <Card>
            <Title level={4}>
              <ClockCircleOutlined /> Clock In/Out
            </Title>

            {currentShift ? (
              <div>
                <Space direction="vertical" style={{ width: "100%", marginBottom: "16px" }}>
                  <div>
                    <Text strong>Clocked in at: </Text>
                    <Text>{new Date(currentShift.clockInTime).toLocaleString()}</Text>
                  </div>
                  <div>
                    <Text strong>Note: </Text>
                    <Text>{currentShift.notes || "No note provided"}</Text>
                  </div>
                </Space>

                <Button
                  type="primary"
                  danger
                  size="large"
                  icon={<StopOutlined />}
                  onClick={() => handleClockAction("out")}
                  disabled={!isWithinPerimeter() || locationLoading || clockLoading}
                  style={{ width: "100%" }}
                >
                  Clock Out
                </Button>
              </div>
            ) : (
              <Button
                type="primary"
                size="large"
                icon={<CheckCircleOutlined />}
                onClick={() => handleClockAction("in")}
                disabled={!isWithinPerimeter() || locationLoading || clockLoading}
                style={{ width: "100%" }}
              >
                Clock In
              </Button>
            )}

            {((!isWithinPerimeter() && perimeter?.isActive) || locationLoading) && (
              <Text type="secondary" style={{ display: "block", marginTop: "8px", textAlign: "center" }}>
                {locationLoading ? "Waiting for location..." : "Move closer to workplace to enable clock in/out"}
              </Text>
            )}
          </Card>
        </TabPane>

        <TabPane tab="My History" key="history">
          {/* Worker Statistics */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={6}>
              <Card size="small">
                <Statistic title="Total Shifts" value={workerStats.totalShifts} prefix={<HistoryOutlined />} />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small">
                <Statistic
                  title="Total Hours"
                  value={workerStats.totalHours}
                  suffix="hrs"
                  prefix={<ClockCircleOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small">
                <Statistic
                  title="Avg Hours/Shift"
                  value={workerStats.avgHoursPerShift}
                  suffix="hrs"
                  prefix={<BarChartOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small">
                <Statistic title="This Week" value={workerStats.thisWeekHours} suffix="hrs" prefix={<TeamOutlined />} />
              </Card>
            </Col>
          </Row>

          {/* Shift History Table */}
          <Card>
            <Title level={4}>
              <HistoryOutlined /> My Shift History
            </Title>
            {shiftsLoading ? (
              <Alert message="Loading shift history..." type="info" showIcon />
            ) : workerHistory.length > 0 ? (
              <Table
                columns={historyColumns}
                dataSource={workerHistory}
                pagination={{ pageSize: 10 }}
                scroll={{ x: true }}
              />
            ) : (
              <Alert
                message="No shift history found"
                description="Your shift history will appear here once you start clocking in and out."
                type="info"
                showIcon
              />
            )}
          </Card>
        </TabPane>
      </Tabs>

      {/* Note Modal */}
      <Modal
        title={`${clockAction === "in" ? "Clock In" : "Clock Out"} - Add Note`}
        open={noteModalVisible}
        onOk={confirmClockAction}
        onCancel={() => setNoteModalVisible(false)}
        confirmLoading={clockLoading}
        okText={clockAction === "in" ? "Clock In" : "Clock Out"}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Text>Add an optional note for this {clockAction === "in" ? "clock in" : "clock out"}:</Text>
          <Input.TextArea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={`Optional note for ${clockAction === "in" ? "starting" : "ending"} your shift...`}
            maxLength={200}
          />
        </Space>
      </Modal>
    </div>
  )
}

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const [loginUser, { loading: loginLoading }] = useMutation(LOGIN_USER)
  const [registerUser, { loading: registerLoading }] = useMutation(REGISTER_USER)

  useEffect(() => {
    const token = localStorage.getItem("auth-token")
    const userData = localStorage.getItem("user-data")

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem("auth-token")
        localStorage.removeItem("user-data")
      }
    }
  }, [])

  const handleAuth = async (values: any) => {
    try {
      if (isLogin) {
        const { data } = await loginUser({
          variables: {
            email: values.email,
            password: values.password,
          },
        })

        if (data?.loginUser) {
          const userData = data.loginUser
          // Store token and user data
          localStorage.setItem("auth-token", userData.token)
          localStorage.setItem(
            "user-data",
            JSON.stringify({
              id: userData.id,
              email: userData.email,
              name: userData.name,
              role: userData.role,
            }),
          )

          setUser({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role,
          })

          message.success(`Welcome back, ${userData.name}!`)
        }
      } else {
        const { data } = await registerUser({
          variables: {
            email: values.email,
            password: values.password,
            name: values.name,
            role: values.role,
          },
        })

        if (data?.registerUser) {
          const userData = data.registerUser
          // Store token and user data
          localStorage.setItem("auth-token", userData.token)
          localStorage.setItem(
            "user-data",
            JSON.stringify({
              id: userData.id,
              email: userData.email,
              name: userData.name,
              role: userData.role,
            }),
          )

          setUser({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role,
          })

          message.success(`Account created successfully! Welcome, ${userData.name}!`)
        }
      }
    } catch (error: any) {
      console.error("Authentication error:", error)
      message.error(error.message || "Authentication failed")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user-data")
    setUser(null)
    message.info("Logged out successfully")
  }

  return (
    <ConfigProvider theme={appTheme}>
      {user ? (
        <div style={{ minHeight: "100vh", padding: 24, backgroundColor: "#f5f5f5" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Card>
              <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                <Col>
                  <Title level={2} style={{ margin: 0, color: appTheme.token.colorPrimary }}>
                    Care Worker Shift Tracking
                  </Title>
                  <Text type="secondary" style={{ fontSize: 16 }}>
                    Welcome, {user.name} • {user.role === "MANAGER" ? "Manager" : "Care Worker"}
                  </Text>
                </Col>
                <Col>
                  <Button onClick={handleLogout} size="large">
                    Logout
                  </Button>
                </Col>
              </Row>

              <Divider />

              {user.role === "MANAGER" ? (
                <ManagerDashboard user={user} onLogout={handleLogout} />
              ) : (
                <WorkerDashboard user={user} onLogout={handleLogout} />
              )}
            </Card>
          </div>
        </div>
      ) : (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: 24,
          }}
        >
          <Card
            style={{
              width: "100%",
              maxWidth: 400,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            }}
          >
            <Space direction="vertical" size="large" style={{ width: "100%", textAlign: "center" }}>
              <div>
                <Title level={2} style={{ color: appTheme.token.colorPrimary, marginBottom: 8 }}>
                  Care Worker Shift Tracking
                </Title>
                <Paragraph type="secondary" style={{ fontSize: 16, margin: 0 }}>
                  {isLogin ? "Sign in to your account" : "Create a new account"}
                </Paragraph>
              </div>

              <Form name="auth" onFinish={handleAuth} layout="vertical" size="large">
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Email" type="email" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                  <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>

                {!isLogin && (
                  <>
                    <Form.Item name="name" rules={[{ required: true, message: "Please input your full name!" }]}>
                      <Input prefix={<UserOutlined />} placeholder="Full Name" />
                    </Form.Item>

                    <Form.Item name="role" rules={[{ required: true, message: "Please select your role!" }]}>
                      <Select placeholder="Select Role" size="large">
                        <Option value="CARE_WORKER">Care Worker</Option>
                        <Option value="MANAGER">Manager</Option>
                      </Select>
                    </Form.Item>
                  </>
                )}

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loginLoading || registerLoading}
                    size="large"
                    style={{ width: "100%", height: 48 }}
                    icon={isLogin ? <LoginOutlined /> : <UserAddOutlined />}
                  >
                    {isLogin ? "Sign In" : "Sign Up"}
                  </Button>
                </Form.Item>
              </Form>

              <Button type="link" onClick={() => setIsLogin(!isLogin)} size="large">
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </Button>
            </Space>
          </Card>
        </div>
      )}
    </ConfigProvider>
  )
}
