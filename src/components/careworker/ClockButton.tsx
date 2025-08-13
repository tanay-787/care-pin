// components/careworker/ClockButton.tsx
"use client";

import React from "react";
import { Button } from "antd";
import type { FC } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";

interface ClockButtonProps {
  isClockedIn: boolean;
  disabled?: boolean;
  onAction: () => void;
}


/**
 * @description Main action button for clocking in/out with accessibility states handled. */ 

const ClockButton: FC<ClockButtonProps> = ({ isClockedIn, disabled=false, onAction }) => (
  <Button
    type={isClockedIn ? "default" : "primary"}
    icon={<ClockCircleOutlined />}
    size="large"
    block
    onClick={onAction}
    disabled={disabled}
    aria-label={isClockedIn ? "Clock Out" : "Clock In"}
    aria-pressed={isClockedIn}
  >
    {isClockedIn ? "Clock Out" : "Clock In"}
  </Button>
);

export default ClockButton;
