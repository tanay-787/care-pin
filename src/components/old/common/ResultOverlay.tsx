// components/common/ResultOverlay.tsx
"use client";
import React from "react";
import { Result, Button } from "antd";
import type { ButtonProps } from "antd";

type ResultStatus = "success" | "error" | "info" | "warning" | "404" | "403" | "500";

interface ResultOverlayProps {
  status: ResultStatus;
  title: string;
  subTitle?: string;
  extraButtons?: React.ReactNode;
  onClose?: () => void;
}

const ResultOverlay: React.FC<ResultOverlayProps> = ({
  status,
  title,
  subTitle,
  extraButtons,
  onClose,
}) => {
  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={
        <>
          {extraButtons}
          {onClose && (
            <Button type="primary" key="close" onClick={onClose}>
              Close
            </Button>
          )}
        </>
      }
    />
  );
};

export default ResultOverlay;
