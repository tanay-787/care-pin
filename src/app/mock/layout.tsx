import type React from "react"
import type { Metadata } from "next"
// import { Geist } from "next/font/google/index"
// import { Geist_Mono } from "next/font/google/index"
import { ConfigProvider } from "antd"
import "./globals.css"

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
      <head>
        {/* <style>{`
html {
  font-family: ${Geist.style.fontFamily};
  --font-sans: ${Geist.variable};
  --font-mono: ${Geist_Mono.variable};
}
        `}</style> */}
      </head>
      <body>
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
      </body>
    </html>
  )
}
