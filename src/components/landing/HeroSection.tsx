"use client"
import { Button, Typography, Row, Col, Space, Modal } from "antd"
import { useState } from "react";
import Image from "next/image";
import HeroImage from "../../../public/hero-img.png";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
const { Title, Paragraph, Text } = Typography

interface HeroSectionProps {
  user: any | undefined;
}

export default function HeroSection({ user }: HeroSectionProps) {
  const router = useRouter();
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  return (
    <div style={{ padding: "64px 32px", maxWidth: 1160, margin: "0 auto", background: "#f2f0ef" }}>
      <Row gutter={[48, 48]} align="middle">
        {/* Text Column */}
        <Col xs={24} md={12}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Title
              level={1}
              style={{
                fontSize: "clamp(2.5rem, 1rem + 8vw, 4.5rem);", // responsive scaling
                lineHeight: "1.1", // Golden ratio for readability
                color: "#1a1a1a",
                fontWeight: 700,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {"Care" + " Check-ins," + " Managed"}
            </Title>

            <Paragraph
              style={{
                fontSize: "clamp(0.9rem, 3vw, 1rem)",
                color: "#666",
                lineHeight: 1.6,
                maxWidth: "50ch", // keeps optimal reading width
              }}
            >
              Simple location tracking that just works, so you can focus on what
              matters most - providing great care.
            </Paragraph>

            {/* Buttons */}
            <Space size="middle" wrap>
              <Button
                type="primary"
                size="large"
                style={{
                  height: "48px",
                  fontSize: "1rem",
                  padding: "0 2rem",
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
                onClick={() => {
                  router.push("/dashboard")
                }}
              >
                {user ? 'To Dashboard' : 'Get Started'}
              </Button>
              <Button
                size="large"
                icon={<PlayCircleOutlined />}
                style={{
                  height: "48px",
                  fontSize: "1rem",
                  padding: "0 2rem",
                  borderColor: "#d9d9d9",
                  color: "#666",
                  borderRadius: "8px",
                }}
                onClick={() => setIsDemoOpen(true)}
              >
                Try Demo
              </Button>
            </Space>
          </Space>
        </Col>

        {/* Image Column */}
        <Col xs={24} md={12}>
          <div style={{ textAlign: "center" }}>
            <Image src={HeroImage} alt="CarePin" style={{ width: "100%", maxWidth: "600px", height: "auto", borderRadius: "12px", }} />
          </div>
        </Col>
      </Row>
      {/* Demo Credentials Modal */}
      <Modal
        title="Demo credentials"
        open={isDemoOpen}
        onCancel={() => setIsDemoOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsDemoOpen(false)}>
            Close
          </Button>,
        ]}
      >
        <Paragraph>
          Use these demo credentials to sign in and explore both dashboards. Each
          field is copyable — click the value to copy it to your clipboard.
        </Paragraph>


        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ padding: 12, borderRadius: 8, background: "#fff", border: "1px solid #eee" }}>
            <Title level={5} style={{ marginBottom: 8 }}>
              Manager Creds
            </Title>
            <div style={{ marginBottom: 6 }}>
              <Text strong>Email: </Text>
              <Text copyable={{ text: "manager1@test.com" }}>manager1@test.com</Text>
            </div>
            <div>
              <Text strong>Password: </Text>
              <Text copyable={{ text: "manager@1" }}>manager@1</Text>
            </div>
          </div>


          <div style={{ padding: 12, borderRadius: 8, background: "#fff", border: "1px solid #eee" }}>
            <Title level={5} style={{ marginBottom: 8 }}>
              Careworker Creds
            </Title>
            <div style={{ marginBottom: 6 }}>
              <Text strong>Email: </Text>
              <Text copyable={{ text: "worker1@test.com" }}>worker1@test.com</Text>
            </div>
            <div>
              <Text strong>Password: </Text>
              <Text copyable={{ text: "worker@1" }}>worker@1</Text>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}