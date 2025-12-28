"use client"

import AuthGuard from "@/components/AuthGuard"
import ManagerDashboard from "@/components/dashboards/ManagerDashboard"
import CareWorkerDashboard from "@/components/dashboards/CareWorkerDashboard"
import { User } from "@/lib/types"

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