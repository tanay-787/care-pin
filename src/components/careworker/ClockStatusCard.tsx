// components/careworker/ClockStatusCard.tsx
"use client";
import React from "react";
import { Card, Statistic, Tag } from "antd";

interface ClockStatusCardProps {
  isClockedIn: boolean;
  timestamp?: string;
  location?: string;
}

const ClockStatusCard: React.FC<ClockStatusCardProps> = ({
  isClockedIn,
  timestamp,
  location,
}) => {
  const statusText = isClockedIn ? "Clocked In" : "Clocked Out";
  const color = isClockedIn ? "green" : "volcano";

  return (
    <Card aria-label={`Current status: ${statusText}`}>
      <Tag color={color} style={{ marginBottom: 16 }}>
        {statusText}
      </Tag>
      {timestamp && (
        <Statistic
          title="Time"
          value={timestamp}
          valueStyle={{ fontSize: '1.5rem' }}
        />
      )}
      {location && (
        <div style={{ marginTop: 8, fontSize: '0.9rem', color: '#888' }}>
          {location}
        </div>
      )}
    </Card>
  );
};

export default ClockStatusCard;
