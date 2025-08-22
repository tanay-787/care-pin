# CarePin - Healthcare Worker Shift Management PWA

CarePin is a Progressive Web Application (PWA) designed to streamline shift management for healthcare workers. It provides an efficient way for healthcare organizations to track employee clock-ins and clock-outs with a modern, mobile-friendly interface.

## 🎯 Project Overview

CarePin was developed as a take-home assignment project for lief@healthcare company. It serves as a comprehensive solution for:
- ⏰ Shift timing management
- 📱 Cross-platform accessibility (mobile & web)
- 🏥 Healthcare organization employee tracking
- 📊 Attendance monitoring

## 🚀 Technology Stack

CarePin is built using modern web technologies:

- **Frontend:**
  - Next.js - React framework for production
  - Ant Design - UI component library
  - Progressive Web App (PWA) capabilities

- **Backend:**
  - GraphQL - API query language
  - Prisma - Next-generation ORM
  - NeonDB - Serverless Postgres database

- **Authentication:**
  - Auth0 - Secure authentication service

## 🛠️ Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- npm or yarn package manager
- A NeonDB account
- Auth0 account and configuration

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tanay-787/care-pin.git
cd care-pin
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add necessary environment variables.

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🌟 Features

- Progressive Web App functionality
- Responsive design for both mobile and desktop
- Secure authentication with Auth0
- Real-time shift tracking
- User-friendly interface with Ant Design
- GraphQL API integration
- Persistent data storage with NeonDB

## 📱 PWA Features

- Installable on mobile devices
- Offline functionality
- Push notifications support
- Native app-like experience

## 💻 Development

The application uses Next.js app router and follows modern React patterns. Key directories:
- `/app` - Application routes and pages
- `/components` - Reusable React components
- `/graphql` - GraphQL schemas and resolvers
- `/prisma` - Database schema and migrations

## 📝 License

[Add your license information here]

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check issues page if you want to contribute.

## 👥 Authors

- **Tanay** - Initial work - [tanay-787](https://github.com/tanay-787)

---

Built with ❤️ for healthcare workers