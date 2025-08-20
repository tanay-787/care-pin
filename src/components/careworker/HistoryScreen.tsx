// components/HistoryScreen.tsx
"use client";

import React from "react";
import { Row, Col, Card, Statistic, Table, Alert } from "antd";
import { HistoryOutlined, ClockCircleOutlined, BarChartOutlined, TeamOutlined } from "@ant-design/icons";
import type { Shift } from "@/lib/types"; // Define your own types

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
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic title="Total Shifts" value={workerStats.totalShifts} prefix={<HistoryOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic title="Total Hours" value={workerStats.totalHours} suffix="hrs" prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic title="Avg Hours/Shift" value={workerStats.avgHoursPerShift} suffix="hrs" prefix={<BarChartOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic title="This Week" value={workerStats.thisWeekHours} suffix="hrs" prefix={<TeamOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card>
        <HistoryOutlined /> My Shift History
        {shiftsLoading ? (
          <Alert message="Loading shift history..." type="info" showIcon />
        ) : workerHistory.length > 0 ? (
          <Table columns={historyColumns} dataSource={workerHistory} pagination={{ pageSize: 10 }} scroll={{ x: true }} />
        ) : (
          <Alert
            message="No shift history found"
            description="Your shift history will appear here once you start clocking in and out."
            type="info"
            showIcon
          />
        )}
      </Card>
    </>
  );
}
