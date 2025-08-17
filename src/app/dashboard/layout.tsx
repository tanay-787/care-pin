import type React from "react"
import type { Metadata } from "next"
import { ConfigProvider } from "antd"
import { ApolloWrapper } from "@/lib/apollo-wrapper"
import "./globals.css"
import { App } from "antd"
import '@ant-design/v5-patch-for-react-19';


export const metadata: Metadata = {
  title: "Care Worker Shift Tracking",
  description: "Track care worker shifts with location-based check-ins",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ApolloWrapper>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1890ff",
            colorBgBase: "#f9ffff",
            borderRadius: 6,
          },
        }}
      >
        <App>{children}</App>
      </ConfigProvider>
    </ApolloWrapper>
  )
}
