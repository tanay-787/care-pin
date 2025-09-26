"use client"

import React from "react"
import { Row, Col, Button, Typography, Space, Form, Input } from "antd"
import { MailOutlined, PlayCircleOutlined } from "@ant-design/icons"
import NextImage from "next/image"
import { motion } from "motion/react"

const { Title, Paragraph } = Typography

export default function HeroSectionAntd({
  heading = "Track careworkers, Instantly",
  subheading =
    "Simple location tracking that just works, so you can focus on what matters most - providing great care.",
  ctaLabel = "Get Started",
  onCta = () => {},
}: {
  heading?: string
  subheading?: string
  ctaLabel?: string
  onCta?: () => void
}) {
  return (
    <section style={{ background: "#f2f0ef", padding: "64px 16px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} md={12}>
            <div style={{ maxWidth: 680 }}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <Title
                  level={1}
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3.8rem)",
                    lineHeight: 1.15,
                    color: "#111827",
                    marginBottom: 8,
                  }}
                >
                  {heading}
                </Title>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                <Paragraph style={{ color: "#4b5563", fontSize: "clamp(0.95rem,1.2vw,1.15rem)", maxWidth: "40ch" }}>
                  {subheading}
                </Paragraph>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="hero-cta"
              >
                <Space size="middle" wrap>
                  <Button type="primary" size="large" onClick={onCta} style={{ height: 48, padding: "0 24px", borderRadius: 10 }}>
                    {ctaLabel}
                  </Button>

                  <Button size="large" icon={<PlayCircleOutlined />} style={{ height: 48, borderRadius: 10 }}>
                    Watch Demo
                  </Button>
                </Space>

              </motion.div>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {/* Decorative layered cards + hero image to resemble the Shadcn mockup */}
              <div style={{ position: "relative", width: 520, maxWidth: "92%" }}>
                {/* Back floating card */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: -24,
                    top: -20,
                    width: 220,
                    height: 220,
                    borderRadius: 24,
                    background: "rgba(59,130,246,0.06)",
                    transform: "rotate(-8deg)",
                    boxShadow: "0 12px 30px rgba(2,6,23,0.08)",
                  }}
                />

                {/* Middle card with subtle border pattern */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 12,
                    top: 8,
                    width: 300,
                    height: 360,
                    borderRadius: 20,
                    background: "white",
                    boxShadow: "0 18px 40px rgba(2,6,23,0.06)",
                    border: "1px solid rgba(0,0,0,0.04)",
                    overflow: "hidden",
                  }}
                />

                {/* Main image card */}
                <div style={{ position: "relative", borderRadius: 20, overflow: "hidden" }}>
                  <NextImage src="/hero-img.png" alt="CarePin" width={520} height={360} style={{ display: "block", width: "100%", height: "auto" }} />
                </div>

                {/* Foreground small card (mock app preview) */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    right: -10,
                    bottom: -18,
                    width: 180,
                    height: 120,
                    borderRadius: 16,
                    background: "rgba(17,24,39,0.96)",
                    color: "white",
                    padding: 12,
                    transform: "translateX(4px)",
                    boxShadow: "0 12px 30px rgba(2,6,23,0.12)",
                  }}
                >
                  <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 8 }}>Live view</div>
                  <div style={{ height: 56, borderRadius: 8, background: "rgba(255,255,255,0.06)", marginBottom: 8 }} />
                  <div style={{ height: 8, width: "60%", borderRadius: 6, background: "rgba(255,255,255,0.04)" }} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}
