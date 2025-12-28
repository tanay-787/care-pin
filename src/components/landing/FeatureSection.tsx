"use client"

import React, { useState } from "react"
import {
  Row,
  Col,
  Collapse,
  Card,
  Typography,
  Space,
  Divider,
  Grid,
} from "antd"
import { RightOutlined, DownOutlined } from "@ant-design/icons"
import NextImage, { StaticImageData } from "next/image"
import { motion, AnimatePresence } from "motion/react"
import FeatureOne from "../../../public/feature-one.png"; 
import FeatureTwo from "../../../public/feature-two.png"; 
import FeatureThree from "../../../public/feature-three.png";

const { Title, Paragraph, Text } = Typography

export type Feature = {
  id: string
  title: string
  description: string
  bullets?: string[]
  image: StaticImageData
  alt?: string
}

export default function FeatureSection({
  features = defaultFeatures,
  heading = "What Makes CarePin Stand Out?",
  subheading = "Simple, transparent, and built for teams that care.",
}: {
  features?: Feature[]
  heading?: string
  subheading?: string
}) {
  // activeKey keeps the currently open panel's id (AntD Collapse uses string[] or string)
  const [activeKey, setActiveKey] = useState<string>(features[0].id)

  const activeFeature = features.find((f) => f.id === activeKey) || features[0]

  const items = features.map((f, idx) => ({
    key: f.id,
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "#1890ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 600,
          }}
        >
          {String(idx + 1).padStart(2, "0")}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <div>
            <Text style={{ color: "white", fontSize: 16, fontWeight: 600 }}>{f.title}</Text>
          </div>
        </div>
      </div>
    ),
    children: (
      <div style={{ padding: 6 }}>
        <Paragraph style={{ color: "rgba(255,255,255,0.9)", marginBottom: 8 }}>{f.description}</Paragraph>
        {f.bullets && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {f.bullets.map((b, i) => (
              <Text key={i} style={{ color: "rgba(255,255,255,0.9)" }}>
                ✓ {b}
              </Text>
            ))}
          </div>
        )}
      </div>
    ),
    extra: activeKey === f.id ? <DownOutlined style={{ color: "rgba(255,255,255,0.85)" }} /> : <RightOutlined style={{ color: "rgba(255,255,255,0.7)" }} />,
    style: {
      background: activeKey === f.id ? "rgba(255,255,255,0.04)" : "transparent",
      borderRadius: 12,
      padding: 8,
      marginBottom: 12,
    },
    showArrow: false,
  }))

  return (
    <section style={{ background: "#001529", padding: "72px 16px", color: "white" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Title level={2} style={{ color: "white", margin: 0, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700 }}>
            {heading}
          </Title>
          <Paragraph style={{ color: "rgba(255,255,255,0.85)", marginTop: 12 }}>{subheading}</Paragraph>
        </div>

        <Row gutter={[48, 48]} align="middle">
        <Col xs={{ span: 24, order: 2 }} lg={{ span: 12, order: 1 }}>
            {/* AntD Collapse used as Accordion. We control which panel is open via activeKey. */}
            <Collapse
              activeKey={activeKey}
              onChange={(key) => setActiveKey(String(key))}
              accordion
              bordered={false}
              style={{ background: "transparent" }}
              expandIconPosition="end"
              items={items}
            />
          </Col>

          <Col xs={{ span: 24, order: 1 }} lg={{ span: 12, order: 2 }}>
            <Card
              variant="borderless"
              style={{ padding: 12, borderRadius: 16, background: "rgba(255,255,255,0.03)" }}
            >
              <div style={{ position: "relative", width: "100%", height: 0, paddingBottom: "75%", overflow: "hidden", borderRadius: 12 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature.id}
                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.99 }}
                    transition={{ duration: 0.25 }}
                    style={{ position: "absolute", inset: 0 }}
                  >
                    <NextImage
                      src={activeFeature.image}
                      alt={activeFeature.alt ?? activeFeature.title}
                      fill
                      style={{ objectFit: "cover", borderRadius: 8 }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <Divider style={{ borderColor: "rgba(255,255,255,0.06)", margin: "16px 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <Text style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{activeFeature.title}</Text>
                  <Paragraph style={{ color: "rgba(255,255,255,0.7)", margin: 0, marginTop: 4 }}>{activeFeature.description}</Paragraph>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  )
}


const defaultFeatures: Feature[] = [
  {
    id: "f-1",
    title: "No more guessing games!",
    description:
      "Care workers simply tap to check in when they arrive. You instantly know who’s where, when they arrived, and if they’re running late.",
    bullets: ["One-tap check-in", "Instant notifications", "Real-time location updates"],
    image: FeatureOne,
    alt: "Location Check-in",
  },
  {
    id: "f-2",
    title: "Get the reports you need, when you need them",
    description:
      "Click a button, get a report. See who worked where, for how long, and when. Perfect for payroll, compliance, or just keeping track.",
    bullets: ["One-click reports", "Simple daily summaries", "Easy payroll export"],
    image: FeatureTwo,
    alt: "Analytics Dashboard",
  },
  {
    id: "f-3",
    title: "Works on any phone, anywhere",
    description:
      "Your care workers already have phones. That’s all they need. No special equipment, no complicated setup. Just download and start.",
    bullets: ["Works on iPhone & Android", "Set up in minutes", "Simple, clean interface"],
    image: FeatureThree,
    alt: "Ease of Access",
  },
]
