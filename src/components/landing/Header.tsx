"use client"
import { Layout, Button, Typography, Row, Col, Space, Drawer } from "antd"
import { MenuOutlined } from "@ant-design/icons"
import { useState } from "react"
import UserButton from "@/components/UserButton"

const { Header } = Layout
const { Title } = Typography

export default function LandingHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <Header
      style={{
        background: "#f2f0ef",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        position: "fixed",
        width: "100%",
        zIndex: 1000,
        paddingInline: "clamp(16px, 5vw, 50px)", // golden-ratio responsive padding
      }}
    >
      <Row justify="space-between" align="middle" style={{ height: "64px" }}>
        {/* Logo */}
        <Col>
          <Space align="center">
            <img
              src="/logo.png"
              alt="CarePin"
              style={{ height: "2rem", width: "2rem" }}
            />
            <Title
              level={2}
              style={{
                margin: 0,
                color: "#1890ff",
                fontWeight: 700,
                fontSize: "clamp(1.25rem, 2vw, 2rem)", // scales with screen
              }}
            >
              CarePin
            </Title>
          </Space>
        </Col>

        {/* Desktop Nav */}
        <Col flex="none" className="hidden md:block">
          <Space size="large">
            {["Features", "Pricing", "Resources", "About"].map((label) => (
              <Button key={label} type="text" style={{ color: "#666" }}>
                {label}
              </Button>
            ))}
            <UserButton />
          </Space>
        </Col>

        {/* Mobile Nav Button */}
        <Col flex="none" className="block md:hidden">
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 20 }} />}
            onClick={() => setDrawerOpen(true)}
          />
        </Col>
      </Row>

      {/* Mobile Drawer */}
      <Drawer
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        bodyStyle={{ padding: "24px" }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {["Features", "Pricing", "Resources", "About"].map((label) => (
            <Button
              key={label}
              type="text"
              style={{ color: "#1a1a1a", fontSize: "1.1rem" }}
              block
            >
              {label}
            </Button>
          ))}
          <UserButton />
        </Space>
      </Drawer>
    </Header>
  )
}
