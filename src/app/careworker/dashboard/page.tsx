// app/careworker/dashboard/page.tsx
"use client";
import React, { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import AnalyticsCards from "@/components/old/common/AnalyticsCards";
import ClockStatusCard from "@/components/old/careworker/ClockStatusCard";
import ClockButton from "@/components/old/careworker/ClockButton";
import ShiftHistoryTable, { ShiftRecord } from "@/components/old/careworker/ShiftHistoryTable";
import NoteModal from "@/components/old/common/NoteModal";
import ResultOverlay from "@/components/old/common/ResultOverlay";

export default function CareWorkerDashboardPage() {
  // Mock state
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [actionResult, setActionResult] = useState<{
    status: "success" | "error"
    title: string;
  } | null>(null);

  const mockShifts: ShiftRecord[] = [
    { key: "1", date: "2025-08-01", clockIn: "08:00", clockOut: "16:00", location: "Ward A", note: "Routine check" },
    { key: "2", date: "2025-07-30", clockIn: "09:00", clockOut: "17:00", location: "Ward B" },
  ];

  const handleClock = () => {
    setNoteModalOpen(true);
  };

  const handleSubmitNote = (note: string) => {
    setNoteModalOpen(false);
    setIsClockedIn((prev) => !prev);
    setActionResult({
      status: "success",
      title: isClockedIn ? "Successfully clocked out" : "Successfully clocked in",
    });
  };

  return (
    <DashboardLayout userRole="careworker">
      <AnalyticsCards averageHours={8} dailyClockIns={12} weeklyTotals={{ You: 40 }} />
      <ClockStatusCard isClockedIn={isClockedIn} timestamp={new Date().toLocaleTimeString()} location="Ward A" />
      <ClockButton isClockedIn={isClockedIn} onAction={handleClock} />
      <ShiftHistoryTable data={mockShifts} />
      <NoteModal open={noteModalOpen} onCancel={() => setNoteModalOpen(false)} onSubmit={handleSubmitNote} />
      {actionResult && (
        <ResultOverlay status={actionResult.status} title={actionResult.title} onClose={() => setActionResult(null)} />
      )}
    </DashboardLayout>
  );
}
