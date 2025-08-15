// components/manager/AnalyticsCards.tsx
"use client";

import React, { FC } from "react";
import { Card, Row, Col, Statistic } from "antd";
import type { StatisticProps } from "antd";

interface AnalyticsCardsProps {
  averageHours: number;
  dailyClockIns: number;
  weeklyTotals: { [staffName: string]: number };
}

const AnalyticsCards: FC<AnalyticsCardsProps> = ({
  averageHours,
  dailyClockIns,
  weeklyTotals,
}) => (
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={8}>
      <Card>
        <Statistic title="Avg Hours/Day" value={averageHours.toFixed(2)} suffix="hrs" />
      </Card>
    </Col>
    <Col xs={24} sm={8}>
      <Card>
        <Statistic title="Clock-Ins Today" value={dailyClockIns} />
      </Card>
    </Col>
    <Col xs={24} sm={8}>
      <Card title="Weekly Hours / Staff">
        {Object.entries(weeklyTotals).map(([staff, hours]) => (
          <div key={staff}>
            <strong>{staff}</strong>: {hours.toFixed(2)} hrs
          </div>
        ))}
      </Card>
    </Col>
  </Row>
);

export default AnalyticsCards;
