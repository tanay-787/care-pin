import type React from "react"
import type { Metadata } from "next"
import { ConfigProvider } from "antd"
import { Auth0Provider } from "@auth0/nextjs-auth0"
import { ApolloWrapper } from "@/lib/apollo-wrapper"
import "./globals.css"
import "@ant-design/v5-patch-for-react-19"

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
    <html lang="en">
      <body>
        <Auth0Provider>
          <ApolloWrapper>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#1890ff",
                  borderRadius: 6,
                },
              }}
            >
              {children}
            </ConfigProvider>
          </ApolloWrapper>
        </Auth0Provider>
      </body>
    </html>
  )
}
