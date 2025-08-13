import type { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import React from 'react';
import { ConfigProvider } from 'antd';
import { antdTheme } from '@/theme';
import AppLayout from '@/layouts/AppLayout';
import type { AppLayoutProps } from '@/layouts/AppLayout';
import DashboardLayout from "@/layouts/DashboardLayout";


export const metadata: Metadata = {
  title: "Lief Clock-In App",
  description: "Attendance system for Lief Care Workers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const userRole: AppLayoutProps['userRole'] = 'careworker';

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
        <ConfigProvider theme={{ ...antdTheme }}>
        <DashboardLayout userRole={userRole}>{children}</DashboardLayout>
        </ConfigProvider>
          </AntdRegistry>
      </body>
    </html>
  );
}

