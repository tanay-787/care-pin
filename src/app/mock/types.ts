export interface User {
    id: number
    username: string
    role: "manager" | "worker"
    name: string
  }
  
  export interface Shift {
    id: number
    workerId: number
    clockInTime: Date
    clockInLocation: any
    clockInNote: string
    clockOutTime: Date | null
    clockOutLocation: any
    clockOutNote: string | null
    status: "clocked-in" | "clocked-out"
  }
  