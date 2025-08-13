// app/manager/dashboard/page.tsx
"use client";
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AnalyticsCards from "@/components/common/AnalyticsCards";
import PerimeterMap from "@/components/manager/PerimeterMap";
import LiveStaffTable, { StaffRecord } from "@/components/manager/LiveStaffTable";
import type { ShiftRecord } from "@/components/careworker/ShiftHistoryTable";
import StaffSelect from "@/components/manager/StaffSelect";
import StaffHistoryTable from "@/components/manager/StaffHistoryTable";

export default function ManagerDashboardPage() {
  // Mock state
  const [center, setCenter] = useState<[number, number]>([19.0760, 72.8777]);
  const [radius, setRadius] = useState(2000);
  const [selectedStaff, setSelectedStaff] = useState("Alice");

  const staffOptions = [
    { value: "Alice", label: "Alice" },
    { value: "Bob", label: "Bob" },
  ];

  const mockLive: StaffRecord[] = [
    { key: "1", name: "Alice", clockIn: "08:00", location: "Ward 3" },
  ];

  const mockHistory = [
    { key: "1", date: "2025-08-01", clockIn: "08:00", clockOut: "16:00", location: "Ward 3", note: "Shift" },
  ];

  return (
    <DashboardLayout userRole="manager">
      <AnalyticsCards averageHours={7.5} dailyClockIns={5} weeklyTotals={{ Alice: 35, Bob: 28 }} />
      <PerimeterMap center={center} radius={radius} onChange={(c, r) => { setCenter(c); setRadius(r); }} />
      <LiveStaffTable data={mockLive} />
      <StaffSelect options={staffOptions} onChange={(v) => setSelectedStaff(v)} defaultValue={selectedStaff} />
      <StaffHistoryTable data={mockHistory} />
    </DashboardLayout>
  );
}
