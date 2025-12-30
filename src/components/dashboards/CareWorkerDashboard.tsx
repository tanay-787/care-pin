"use client";

import { useState, useEffect, useCallback } from "react"
import { useQuery, useMutation } from "@apollo/client"
import {
  Tag,
  Typography,
  Tabs,

  Input,


  Modal,

  DatePicker,
  message,
  Grid
} from "antd"
const { useBreakpoint } = Grid;
import { CloseOutline, MoreOutline, SearchOutline } from 'antd-mobile-icons'
import {
  ClockCircleOutlined,
  HistoryOutlined,
} from "@ant-design/icons"
import {
  GET_LOCATION_PERIMETER,
  GET_USER_SHIFTS,
  CLOCK_IN,
  CLOCK_OUT,
  GREET_USER,
} from "@/lib/graphql-queries"
import { getUserLocation } from "@/lib/get-location"
import { getAddressFromCoords } from "@/lib/get-address"
import LocationTracker from "@/components/pwa/LocationTracker"
import type { User } from "@/lib/types"
import ClockScreen from "@/components/careworker/ClockScreen";
import HistoryScreen from "@/components/careworker/HistoryScreen";
import { NavBar, TabBar, Space } from "antd-mobile";
import UserButton from "../UserButton";
import Image from "next/image";
import Logo from "../../../public/logo.png"
import DashboardNavBar from "./NavBar";

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs
const { RangePicker } = DatePicker

const CareWorkerDashboard = ({ user }: { user: User }) => {
  const [currentShift, setCurrentShift] = useState<any>(null)
  const [location, setLocation] = useState<any>(null)
  const [locationLoading, setLocationLoading] = useState(false)
  const [clockLoading, setClockLoading] = useState(false)
  const [noteModalVisible, setNoteModalVisible] = useState(false)
  const [clockAction, setClockAction] = useState<"in" | "out">("in")
  const [note, setNote] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [messageApi, contextHolder] = message.useMessage();
  const [activeKey, setActiveKey] = useState<'clock' | 'history'>('clock');


  const {
    data: shiftsData,
    loading: shiftsLoading,
    refetch: refetchShifts,
  } = useQuery(GET_USER_SHIFTS, {
    variables: { userId: user.id },
  })

  const { data: perimeterData, loading: perimeterLoading } = useQuery(GET_LOCATION_PERIMETER, {
    pollInterval: 30000, // Poll every 30 seconds for perimeter updates
  })

  const [clockInMutation] = useMutation(CLOCK_IN, {
    onCompleted: (data) => {
      setCurrentShift(data.clockIn)
      messageApi.success("Successfully clocked in!")
      refetchShifts()
    },
    onError: (error) => {
      messageApi.error(error.message || "Failed to clock in")
    },
  })

  const [clockOutMutation] = useMutation(CLOCK_OUT, {
    onCompleted: (data) => {
      setCurrentShift(null)
      messageApi.success("Successfully clocked out!")
      refetchShifts()
    },
    onError: (error) => {
      messageApi.error(error.message || "Failed to clock out")
    },
  })

  const getCurrentLocation = useCallback(async () => {
    setLocationLoading(true);

    try {
      const { lat, lon } = await getUserLocation();
      const address = await getAddressFromCoords(lat, lon);

      setLocation({
        latitude: lat,
        longitude: lon,
        address: address,
      });
      setLocationLoading(false);
    } catch (error: any) {
      setLocation(null); // Set location to null on error
      setLocationLoading(false);
      messageApi.error(error.message || "Failed to get your current location.");
    }
  }, []);


  useEffect(() => {
    if (shiftsData?.getUserShifts) {
      const activeShift = shiftsData.getUserShifts.find((shift: any) => shift.status === "CLOCKED_IN")
      setCurrentShift(activeShift || null)
    }

    // Get current location when the component mounts and shiftsData changes
    getCurrentLocation()
  }, [shiftsData, getCurrentLocation])

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

    const distance = calculateDistance(location.latitude, location.longitude, perimeter.centerLatitude, perimeter.centerLongitude)
    return distance <= perimeter.radiusKm
  }

  const handleClockAction = (action: "in" | "out") => {
    if (!location) {
      messageApi.error("Location not available. Please wait for GPS to load.")
      return
    }

    const perimeter = perimeterData?.getLocationPerimeter
    if (perimeter?.isActive && !isWithinPerimeter()) {
      messageApi.error(
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

  const formatDuration = (startTime: string | number) => {
    const now = Date.now()
    const start = typeof startTime === "string" ? parseInt(startTime, 10) : startTime
    const diff = now - start
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }


  const getWorkerHistory = () => {
    if (!shiftsData?.getUserShifts) return []

    return shiftsData.getUserShifts
      .map((shift: any) => {
        const clockIn = parseInt(shift.clockInTime, 10)
        const clockOut = shift.clockOutTime ? parseInt(shift.clockOutTime, 10) : null

        const durationHours = clockOut
          ? (clockOut - clockIn) / (1000 * 60 * 60) // convert ms diff → hours
          : null

        return {
          ...shift,
          key: shift.id,
          clockInTimeFormatted: new Date(clockIn).toLocaleString(),
          clockOutTimeFormatted: clockOut ? new Date(clockOut).toLocaleString() : "Still clocked in",
          duration: durationHours !== null
            ? `${durationHours.toFixed(2)}h`
            : formatDuration(clockIn),
          totalHours: durationHours !== null ? durationHours : 0,
        }
      })
      .sort((a: any, b: any) => parseInt(b.clockInTime, 10) - parseInt(a.clockInTime, 10))
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


  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <>
      {contextHolder}

      <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
        {/* Main content area */}
      <DashboardNavBar />

        <div style={{ flex: 1, overflow: 'auto', padding: activeKey === 'clock' ? 0 : (isMobile ? '8px 4px' : 16) }}>
          {activeKey === 'clock' ? <ClockScreen currentShift={currentShift}
            clockLoading={clockLoading}
            perimeter={perimeter}
            isWithinPerimeter={isWithinPerimeter}
            formatDuration={formatDuration}
            handleClockAction={handleClockAction} /> : <HistoryScreen workerStats={workerStats}
              workerHistory={workerHistory}
              shiftsLoading={shiftsLoading}
              historyColumns={historyColumns} />}
        </div>

        {/* Bottom TabBar */}
        <TabBar activeKey={activeKey} onChange={(key: string) => {
          setActiveKey(key as 'clock' | 'history');
        }}>
          <TabBar.Item key="clock" icon={<ClockCircleOutlined />} title="Clock In/Out" />
          <TabBar.Item key="history" icon={<HistoryOutlined />} title="Shift History" />
        </TabBar>
      </div>

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
    </>
  )
}

export default CareWorkerDashboard;