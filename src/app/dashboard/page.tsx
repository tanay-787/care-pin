"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation } from "@apollo/client"
import AuthGuard from "@/components/AuthGuard"
import ManagerDashboard from "@/components/dashboards/ManagerDashboard"
import CareWorkerDashboard from "@/components/dashboards/CareWorkerDashboard"


export interface User {
  id: string
  email: string
  name: string
  role?: "MANAGER" | "CARE_WORKER"
}

const appTheme = {
  token: {
    colorPrimary: "#1890ff",
    borderRadius: 8,
  },
}


const DashboardPage: React.FC = () => {
  return (
    <AuthGuard
      // Pass functions that take the user object and return the dashboard component
      managerDashboard={(user: User) => <ManagerDashboard user={user} />}
      careWorkerDashboard={(user: User) => <CareWorkerDashboard user={user} />}
    />
  );
};

export default DashboardPage;