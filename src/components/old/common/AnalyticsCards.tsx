// components/common/AnalyticsCards.tsx
"use client";
import React from "react";
import { Row, Col, Card, Statistic } from "antd";

interface AnalyticsCardsProps {
  averageHours: number;
  dailyClockIns: number;
  weeklyTotals: Record<string, number>;
}

const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({
  averageHours,
  dailyClockIns,
  weeklyTotals,
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8}>
        <Card hoverable>
          <Statistic title="Average Hours per Shift" value={averageHours} precision={1} suffix="hrs" />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card hoverable>
          <Statistic title="Clock-Ins Today" value={dailyClockIns} />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={8}>
        <Card hoverable title="Total Hours This Week">
          <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
            {Object.entries(weeklyTotals).map(([name, total]) => (
              <li key={name}>
                <Statistic title={name} value={total} suffix="hrs" />
              </li>
            ))}
          </ul>
        </Card>
      </Col>
    </Row>
  );
};

export default AnalyticsCards;
