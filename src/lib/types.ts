export interface User {
  id: string;
  email: string;
  name?: string | null;
  role?: "MANAGER" | "CARE_WORKER" | null;
  createdAt: string;
  auth0Id?: string | null;
  autoGeoAlerts: boolean;
  isInPerimeter: boolean;
}

export interface Shift {
  id: string;
  clockInTime: string;
  clockOutTime: string | null;
  clockInLatitude: number | null;
  clockInLongitude: number | null;
  clockOutLatitude: number | null;
  clockOutLongitude: number | null;
  duration: number | null;
  notes: string | null;
  status: "CLOCKED_IN" | "CLOCKED_OUT";
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface LocationPerimeter {
  id: string;
  centerLatitude: number;
  centerLongitude: number;
  radiusKm: number;
  address: string;
  isActive: boolean;
  updatedAt: string;
  updatedBy?: User | null;
}
