// components/ClockScreen.tsx
"use client";

import React from "react";
import { Row, Col, Card, Statistic, Alert, Button, Space, Typography } from "antd";
import { ClockCircleOutlined, EnvironmentOutlined, CheckCircleOutlined, StopOutlined } from "@ant-design/icons";
import type { Shift } from "@/lib/types";

const { Text } = Typography;

interface ClockScreenProps {
  currentShift: Shift | null;
  location: any;
  locationLoading: boolean;
  clockLoading: boolean;
  perimeter: any;
  isWithinPerimeter: () => boolean;
  formatDuration: (startTime: string | number) => string;
  handleClockAction: (action: "in" | "out") => void;
  getCurrentLocation: () => void;
}

export default function ClockScreen({
  currentShift,
  location,
  locationLoading,
  clockLoading,
  perimeter,
  isWithinPerimeter,
  formatDuration,
  handleClockAction,
  getCurrentLocation,
}: ClockScreenProps) {
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12}>
          <Card size="small">
            <Statistic
              title="Current Status"
              value={currentShift ? "Clocked In" : "Clocked Out"}
              prefix={
                currentShift ? <CheckCircleOutlined style={{ color: "#52c41a" }} /> : <StopOutlined style={{ color: "#ff4d4f" }} />
              }
              valueStyle={{ color: currentShift ? "#52c41a" : "#ff4d4f" }}
            />
          </Card>
        </Col>
        {currentShift && (
          <Col xs={24} sm={12}>
            <Card size="small">
              <Statistic title="Time Worked Today" value={formatDuration(currentShift.clockInTime)} prefix={<ClockCircleOutlined />} />
            </Card>
          </Col>
        )}
      </Row>

      <Card style={{ marginBottom: 24 }}>
        <EnvironmentOutlined />{" "}
        {locationLoading ? (
          <Alert message="Getting your location..." type="info" showIcon />
        ) : location ? (
          <>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Current Location: </Text> <Text>{location.address}</Text>
              <Text strong>Perimeter Status: </Text>
              <Text type={isWithinPerimeter() ? "success" : "danger"}>
                {isWithinPerimeter() ? "Within Allowed Area" : "Outside Allowed Area"}
              </Text>
            </Space>
            {perimeter?.isActive && !isWithinPerimeter() && (
              <Alert
                message="You are outside the allowed perimeter"
                description={`You must be within ${perimeter.radiusKm}km to clock in/out.`}
                type="warning"
                showIcon
              />
            )}
            {!perimeter?.isActive && (
              <Alert message="Location restrictions disabled" description="You can clock in/out from any location." type="info" showIcon />
            )}
          </>
        ) : (
          <Alert message="Location unavailable" type="error" showIcon />
        )}

        <Button onClick={getCurrentLocation} loading={locationLoading} style={{ marginTop: 12 }}>
          Refresh Location
        </Button>
      </Card>

      <Card>
        {currentShift ? (
          <Space direction="vertical" style={{ width: "100%", marginBottom: 16 }}>
            <Text strong>Clocked in at: </Text> <Text>{new Date(currentShift.clockInTime).toLocaleString()}</Text>
            <Text strong>Note: </Text> <Text>{currentShift.notes || "No note provided"}</Text>
          </Space>
        ) : null}

        <Button
          type="primary"
          danger={currentShift !== null}
          size="large"
          icon={currentShift ? <StopOutlined /> : <CheckCircleOutlined />}
          onClick={() => handleClockAction(currentShift ? "out" : "in")}
          disabled={!isWithinPerimeter() || locationLoading || clockLoading}
          block
        >
          {currentShift ? "Clock Out" : "Clock In"}
        </Button>

        {(!isWithinPerimeter() && perimeter?.isActive) || locationLoading ? (
          <Text type="secondary" style={{ display: "block", marginTop: 8, textAlign: "center" }}>
            {locationLoading ? "Waiting for location..." : "Move closer to workplace to enable clock in/out"}
          </Text>
        ) : null}
      </Card>
    </>
  );
}
