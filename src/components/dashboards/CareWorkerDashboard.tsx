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
import AuthGuard from "@/components/AuthGuard"
import {
  GET_ALL_USERS,
  GET_ALL_SHIFTS,
  GET_LOCATION_PERIMETER,
  UPDATE_LOCATION_PERIMETER,
  GET_USER_SHIFTS,
  CLOCK_IN,
  CLOCK_OUT,
} from "@/lib/graphql-queries"

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs
const { RangePicker } = DatePicker

export interface User {
  id: string
  email: string
  name: string
  role?: "MANAGER" | "CARE_WORKER"
}

const CareWorkerDashboard = ({ user }: { user: User }) => {
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
    onCompleted: (data) => {
      setCurrentShift(data.clockIn)
      message.success("Successfully clocked in!")
      refetchShifts()
    },
    onError: (error) => {
      message.error(error.message || "Failed to clock in")
    },
  })

  const [clockOutMutation] = useMutation(CLOCK_OUT, {
    onCompleted: (data) => {
      setCurrentShift(null)
      message.success("Successfully clocked out!")
      refetchShifts()
    },
    onError: (error) => {
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
      latitude: 40.7128 + (Math.random() - 0.5) * 0.01,
      longitude: -74.006 + (Math.random() - 0.5) * 0.01,
      address: "123 Healthcare Center, New York, NY",
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

    const perimeter = perimeterData?.locationPerimeter
    if (!perimeter || !perimeter.enabled) return true

    const distance = calculateDistance(location.latitude, location.longitude, perimeter.centerLat, perimeter.centerLng)
    return distance <= perimeter.radiusKm
  }

  const handleClockAction = (action: "in" | "out") => {
    if (!location) {
      message.error("Location not available. Please wait for GPS to load.")
      return
    }

    const perimeter = perimeterData?.locationPerimeter
    if (perimeter?.enabled && !isWithinPerimeter()) {
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
        key: shift.id, // Ant Design Table requires a unique key
        clockInTimeFormatted: new Date(parseInt(shift.clockInTime, 10)).toLocaleString(),
        clockOutTimeFormatted: shift.clockOutTime ? new Date(parseInt(shift.clockOutTime, 10)).toLocaleString() : "Still clocked in",
        duration: shift.clockOutTime ? `${Math.round((parseInt(shift.clockOutTime, 10) - parseInt(shift.clockInTime, 10)) / (1000 * 60 * 60) * 100) / 100}h`
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
  const perimeter = perimeterData?.locationPerimeter

  const historyColumns = [
    {
      title: "Date",
      dataIndex: "clockInTime",
      key: "clockInDate",
      render: (time: string) => new Date(parseInt(time, 10)).toLocaleDateString(),
    },
    {
      title: "Clock In",
      dataIndex: "clockInTime",
      key: "clockInTime",
      render: (time: string) => new Date(parseInt(time, 10)).toLocaleTimeString(),
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

                  {perimeter?.enabled && !isWithinPerimeter() && (
                    <Alert
                      message="You are outside the allowed perimeter"
                      description={`You must be within ${perimeter.radiusKm}km of ${perimeter.centerAddress} to clock in/out.`}
                      type="warning"
                      showIcon
                    />
                  )}

                  {!perimeter?.enabled && (
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

            {((!isWithinPerimeter() && perimeter?.enabled) || locationLoading) && (
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

export default CareWorkerDashboard;