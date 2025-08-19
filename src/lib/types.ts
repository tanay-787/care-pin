export interface User {
    id: string
    email: string
    name?: string
    role?: "MANAGER" | "CARE_WORKER"
  }

  export interface Shift {
    id: string;
    clockInTime: string;
    clockOutTime: string | null;
    clockInLatitude: number;
    clockInLongitude: number;
    clockOutLatitude: number | null;
    clockOutLongitude: number | null;
    duration: number | null;
    notes: string | null;
    status: "CLOCKED_IN" | "CLOCKED_OUT";
    userId: string;
    user: User;
  }