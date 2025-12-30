// components/HistoryScreen.tsx
"use client";

import React from "react";
import { Row, Col, Card, Statistic, Table, Alert, Grid } from "antd";
import { HistoryOutlined, ClockCircleOutlined, BarChartOutlined, TeamOutlined } from "@ant-design/icons";
import type { Shift } from "@/lib/types"; // Define your own types

const { useBreakpoint } = Grid;

interface HistoryScreenProps {
  workerStats: {
    totalShifts: string;
    totalHours: string;
    avgHoursPerShift: string;
    thisWeekHours: string;
  };
  workerHistory: Shift[];
  shiftsLoading: boolean;
  historyColumns: any[];
}

export default function HistoryScreen({ workerStats, workerHistory, shiftsLoading, historyColumns }: HistoryScreenProps) {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <div style={{ padding: isMobile ? "0px" : "0 8px" }}>
      <Row gutter={[isMobile ? 8 : 16, isMobile ? 8 : 16]} style={{ marginBottom: isMobile ? 16 : 24 }}>
        <Col xs={12} sm={12} md={6}>
          <Card size="small" styles={{ body: { padding: isMobile ? "8px" : "12px" } }}>
            <Statistic
              title={<span style={{ fontSize: isMobile ? "12px" : "14px" }}>Total Shifts</span>}
              value={workerStats.totalShifts}
              prefix={<HistoryOutlined style={{ fontSize: isMobile ? "14px" : "16px" }} />}
              valueStyle={{ fontSize: isMobile ? "18px" : "24px" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card size="small" styles={{ body: { padding: isMobile ? "8px" : "12px" } }}>
            <Statistic
              title={<span style={{ fontSize: isMobile ? "12px" : "14px" }}>Total Hours</span>}
              value={workerStats.totalHours}
              suffix={<span style={{ fontSize: isMobile ? "12px" : "14px" }}>hrs</span>}
              prefix={<ClockCircleOutlined style={{ fontSize: isMobile ? "14px" : "16px" }} />}
              valueStyle={{ fontSize: isMobile ? "18px" : "24px" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card size="small" styles={{ body: { padding: isMobile ? "8px" : "12px" } }}>
            <Statistic
              title={<span style={{ fontSize: isMobile ? "12px" : "14px" }}>Avg Hours/Shift</span>}
              value={workerStats.avgHoursPerShift}
              suffix={<span style={{ fontSize: isMobile ? "12px" : "14px" }}>hrs</span>}
              prefix={<BarChartOutlined style={{ fontSize: isMobile ? "14px" : "16px" }} />}
              valueStyle={{ fontSize: isMobile ? "18px" : "24px" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card size="small" styles={{ body: { padding: isMobile ? "8px" : "12px" } }}>
            <Statistic
              title={<span style={{ fontSize: isMobile ? "12px" : "14px" }}>This Week</span>}
              value={workerStats.thisWeekHours}
              suffix={<span style={{ fontSize: isMobile ? "12px" : "14px" }}>hrs</span>}
              prefix={<TeamOutlined style={{ fontSize: isMobile ? "14px" : "16px" }} />}
              valueStyle={{ fontSize: isMobile ? "18px" : "24px" }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <span>
            <HistoryOutlined /> My Shift History
          </span>
        }
        styles={{ body: { padding: isMobile ? 0 : "24px" } }}
        size={isMobile ? "small" : "default"}
      >
        {shiftsLoading ? (
          <div style={{ padding: 16 }}>
            <Alert message="Loading shift history..." type="info" showIcon />
          </div>
        ) : workerHistory.length > 0 ? (
          <Table
            columns={historyColumns}
            dataSource={workerHistory}
            pagination={{ pageSize: 10, size: isMobile ? "small" : "default" }}
            scroll={{ x: "max-content" }}
            size={isMobile ? "small" : "middle"}
          />
        ) : (
          <div style={{ padding: 16 }}>
            <Alert
              message="No shift history found"
              description="Your shift history will appear here once you start clocking in and out."
              type="info"
              showIcon
            />
          </div>
        )}
      </Card>
    </div>
  );
}
