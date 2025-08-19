# Requirements Document for Care Worker Shift Tracking App

## Project Overview

The goal of this project is to build a web application (usable on desktop and mobile) for healthcare organizations to allow care workers to clock in and out of their shifts. The application should allow managers to monitor attendance, enforce location-based check-ins, and gain insights through dashboards.

## 1. User Roles

### 1.1 Manager

*   Can view and manage staff attendance records
*   Can define a geographic clock-in perimeter
*   Has access to a dashboard for analytics

### 1.2 Care Worker

*   Can clock in/out of shifts within the allowed perimeter
*   Can add optional notes when clocking in/out
*   Can view their clock-in history

## 2. Functional Requirements

### 2.1 Manager Features

| Feature                 | Description                                                                                                        |
| :---------------------- | :----------------------------------------------------------------------------------------------------------------- |
| Set Clock-in Perimeter  | Define a GPS-based location perimeter (e.g., 2 km radius) within which care workers are allowed to clock in            |
| Staff Table             | View a list of currently clocked-in care workers                                                                 |
| Clock-in/Clock-out Logs | View individual care worker logs, including timestamp and geolocation                                            |
| Dashboard Analytics     | View metrics such as:<ul><li>Avg hours worked/day</li><li>Daily clock-ins</li><li>Total hours per staff in the past week</li></ul> |

### 2.2 Care Worker Features

| Feature             | Description                                                                 |
| :------------------ | :-------------------------------------------------------------------------- |
| Clock In            | Allowed only if within the defined perimeter; can add optional note       |
| Clock Out           | Allowed only if clocked in; can add optional note                           |
| Location Validation | Show an error if trying to clock in from outside the allowed perimeter      |
| View History        | View their own past clock-in/out history (with timestamps and locations) |

### 2.3 Authentication

| Feature             | Description                                                         |
| :------------------ | :------------------------------------------------------------------ |
| Sign Up / Sign In   | Via username-password, Google, or email                             |
| Auth Provider       | Use Auth0                                                           |
| Session Management  | Maintain login sessions, allow logout                               |

## 3. Non-Functional Requirements

### 3.1 UI/UX

*   Responsive design for both desktop and mobile
*   Use Grommet or Ant Design for the UI library
*   Simple, intuitive interface
*   Clean visual hierarchy

### 3.2 PWA (Bonus)

*   Installable on home screen
*   Works offline
*   Uses service workers

### 3.3 Location-based Notifications (Bonus)

*   Notify user to clock in when entering the perimeter
*   Notify to clock out when leaving the perimeter

## 4. Technical Requirements

### 4.1 Frontend

*   Framework: Next.js
*   Design Library: Ant Design with default Ant Design colors
*   State Management: React Context API (no Redux)

### 4.2 Backend

*   API Protocol: GraphQL
*   ORM: Prisma
*   Database: NeonDB

### 4.3 Authentication

*   Provider: Auth0
*   Options: Google, email, username-password

### 4.4 Analytics/Charts

*   Use Chart.js or D3.js for manager dashboards