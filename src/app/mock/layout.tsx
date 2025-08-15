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
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#1890ff",
                borderRadius: 6,
              },
            }}
          ><App>{children}</App>
          </ConfigProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}
