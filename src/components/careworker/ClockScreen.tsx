"use client";

import React from "react";
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

  return (
    <div style={{ padding: 16, textAlign: "center" }}>
      {/* Map */}
      {location && perimeter ? (
        <ClockMap
          userLat={location.latitude}
          userLng={location.longitude}
          perimeterLat={perimeter.centerLatitude}
          perimeterLng={perimeter.centerLongitude}
          radius={perimeter.radiusKm}
        />
      ) : (
        <div style={{ height: 250, background: "#f5f5f5", borderRadius: 12 }} />
      )}

      {/* Clock In/Out Button */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <Button
          color={currentShift ? "danger" : "primary"}
          loading={clockLoading}
          onClick={() => handleClockAction(currentShift ? "out" : "in")}
          disabled={!isWithinPerimeter() || locationLoading}
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            fontSize: 18,
            fontWeight: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {clockLoading ? (
            <DotLoading color="currentColor" />
          ) : (
            <>
              <ClockCircleOutline style={{ fontSize: 28, marginRight: 8 }} />
              {currentShift ? "Clock Out" : "Clock In"}
            </>
          )}
        </Button>
      </div>

      {/* Location Status */}
      {locationLoading ? (
        <div style={{ marginTop: 12, color: "#999" }}>
          <DotLoading /> Getting your location...
        </div>
      ) : !isWithinPerimeter() && perimeter?.isActive ? (
        <div style={{ marginTop: 12, color: "#fa541c", fontSize: 14 }}>
          You are not in the work zone. Move closer to clock in/out.
        </div>
      ) : null}
    </div>
  );
}
