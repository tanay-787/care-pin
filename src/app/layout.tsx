import type React from "react"
import type { Metadata } from "next"
import { ConfigProvider, App } from "antd"
import { Auth0Provider } from "@auth0/nextjs-auth0"
import { ApolloWrapper } from "@/lib/apollo-wrapper"
import { AntdRegistry } from '@ant-design/nextjs-registry';
import "./globals.css"
import "@ant-design/v5-patch-for-react-19"
import PushManager from "@/components/pwa/PushManager"

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
          <AntdRegistry>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#1890ff",
                  borderRadius: 6,
                },
              }}
            >
              
             <App>
              <PushManager />
              {children}</App> 
            </ConfigProvider>
            </AntdRegistry>
          </ApolloWrapper>
        </Auth0Provider>
      </body>
    </html>
  )
}
