"use client";

import React, { useState } from "react";
import { Button, DotLoading } from "antd-mobile";
import { ClockCircleOutline } from "antd-mobile-icons";
import type { Shift } from "@/lib/types";
import dynamic from "next/dynamic";
import { useAutoGeoAlerts } from "@/hooks/useAutoGeoAlerts";

const ClockMap = dynamic(() => import("@/components/careworker/ClockMap"), {
  ssr: false,
});

interface ClockScreenProps {
  currentShift: Shift | null;
  clockLoading: boolean;
  perimeter: {
    centerLatitude: number;
    centerLongitude: number;
    radiusKm: number;
    isActive: boolean;
  } | null;
  isWithinPerimeter: () => boolean;
  formatDuration: (startTime: string | number) => string;
  handleClockAction: (action: "in" | "out") => void;
}

export default function ClockScreen({
  currentShift,
  clockLoading,
  perimeter,
  isWithinPerimeter,
  handleClockAction,
}: ClockScreenProps) {
  const { location, locationLoading } = useAutoGeoAlerts();
  const [showPerimeterError, setShowPerimeterError] = useState(false);

  const handleButtonClick = () => {
    if (perimeter?.isActive && !isWithinPerimeter()) {
      setShowPerimeterError(true);
      return;
    }
    setShowPerimeterError(false);
    handleClockAction(currentShift ? "out" : "in");
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {/* Layer 1: Map (Background) */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        {location && perimeter ? (
          <ClockMap
            userLat={location.latitude}
            userLng={location.longitude}
            perimeterLat={perimeter.centerLatitude}
            perimeterLng={perimeter.centerLongitude}
            radius={perimeter.radiusKm}
          />
        ) : (
          <div style={{ 
            width: "100%", 
            height: "100%", 
            background: "#f5f5f5", 
            display: "flex", 
            flexDirection: "column",
            justifyContent: "center", 
            alignItems: "center", 
            color: "#999" 
          }}>
            <DotLoading color="primary" /> 
            <div style={{ marginTop: 16 }}>Loading Map...</div>
          </div>
        )}
      </div>

      {/* Layer 2: Overlay Controls */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 16,
        right: 16,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none", // Let clicks pass through if not on children
      }}>
        
        {/* Floating Card for Controls */}
        <div style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: 24,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          padding: 24,
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          pointerEvents: "auto", // Re-enable clicks
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          {/* Status Message */}
          {locationLoading ? (
            <div style={{ marginBottom: 16, color: "#666", display: 'flex', alignItems: 'center', gap: 8 }}>
              <DotLoading /> Getting your location...
            </div>
          ) : showPerimeterError ? (
            <div style={{ marginBottom: 16, color: "#ff4d4f", fontSize: 14, fontWeight: 500, textAlign: 'center' }}>
              You are outside the work zone.
            </div>
          ) : null}

{currentShift && (
             <div style={{ marginBottom: 12, fontSize: 13, color: '#666' }}>
                 Shift started at {new Date(parseInt(currentShift.clockInTime)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
             </div>
          )}

          {/* Big Button */}
          <Button
            color={currentShift ? "danger" : "primary"}
            loading={clockLoading}
            onClick={handleButtonClick}
            disabled={locationLoading}
            style={{
              width: "100%",
              height: '3.8rem',
              fontSize: 18,
              fontWeight: 600,
              borderRadius: 28,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              border: 'none'
            }}
          >
            {clockLoading ? (
              <DotLoading color="currentColor" />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <ClockCircleOutline fontSize={24} />
                {currentShift ? "Clock Out" : "Clock In"}
              </div>
            )}
          </Button>
{/* 
          {currentShift && (
             <div style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
                 Shift started at {new Date(parseInt(currentShift.clockInTime)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
             </div>
          )} */}
        </div>
      </div>
    </div>
  );
}