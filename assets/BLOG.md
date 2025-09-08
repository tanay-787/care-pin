# CarePin – Transforming Shift Management for Healthcare Workers

When I developed **CarePin**, my objective was clear: to create a solution that simplifies and streamlines shift management for healthcare workers and organizations. Built as a Progressive Web Application (PWA), CarePin addresses the unique challenges healthcare organizations face in tracking employee attendance, managing shifts, and maintaining efficiency in a high-stakes environment.

## Why CarePin?

Healthcare workers are the backbone of any medical institution, yet managing their shifts and attendance is often a logistical nightmare. CarePin was designed to solve this problem by providing a **cross-platform, user-friendly platform** that makes shift management straightforward and accessible for employees and administrators alike.

## What Makes CarePin Unique?

CarePin brings together modern technology with a focus on user experience to deliver a seamless platform for healthcare organizations:

* 📱 **Cross-Platform Accessibility** – Accessible on both mobile and desktop devices with a responsive design.
* ⏰ **Real-Time Shift Tracking** – Employees and admins can monitor shift timings and attendance in real time.
* 🔒 **Secure Authentication** – Powered by Auth0, ensuring a secure and hassle-free login experience.
* 📊 **Progressive Web App Features** – Offline functionality, push notifications, and the ability to install CarePin as a mobile app for a native-like experience.

![CarePin Dashboard](./carepin-dashboard.png)
*Intuitive dashboards for tracking shifts and attendance.*

![Mobile PWA Functionality](./carepin-pwa.png)
*Installable Progressive Web App for seamless access.*

## Core Features

* **Progressive Web App (PWA)** – Provides offline functionality, push notifications, and an app-like experience on mobile devices.
* **Responsive UI** – Built with Ant Design components for a polished, user-friendly interface.
* **GraphQL API Integration** – Ensures smooth and efficient communication between the frontend and backend.
* **Persistent Data Management** – Uses NeonDB, a serverless Postgres database, for reliable data storage.
* **Real-Time Functionality** – Enables organizations to track attendance and manage shifts dynamically.

## How I Built It

* **Frontend**: Developed using Next.js with Ant Design for component styling. Progressive Web App features are integrated using Serwist.
* **Backend**: Built with GraphQL Yoga and Prisma ORM for managing database operations. NeonDB handles serverless Postgres data storage.
* **Authentication**: Auth0 ensures secure login and role-based access.
* **Deployment**: The application is hosted on Vercel, leveraging its seamless deployment pipeline.

## Technology Stack

* **Frontend**: Next.js 15, Ant Design v5, Serwist (for PWA capabilities)
* **Backend**: GraphQL Yoga, Prisma ORM
* **Database**: NeonDB (serverless Postgres)
* **Authentication**: Auth0
* **Deployment**: Vercel

## Lessons Learned

* The importance of **responsive design** in ensuring accessibility across devices for a diverse user base.
* Leveraging **PWA capabilities** to provide offline access and notifications, greatly enhancing usability.
* Efficiently using **GraphQL** and Prisma to handle complex backend operations.
* Building a solution tailored to the unique needs of healthcare organizations, where reliability and accessibility are critical.

**CarePin** was built with ❤️ for healthcare workers, and I believe it has the potential to make a meaningful impact on their daily workflows. If you'd like to explore it or contribute, check out the [repository here](https://github.com/tanay-787/care-pin).