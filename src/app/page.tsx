"use client"
import {
  Layout,
  Button,
  Typography,
  Row,
  Col,
  Card,
  Space,
  Statistic,
  Avatar,
  Divider,
  Form,
  Input,
  message,
} from "antd"
import {
  SafetyOutlined,
  CheckCircleOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons"
import UserButton from '@/components/UserButton';
import Image from "next/image";
import HeroImage from "../../public/hero-img.png";
import FeatureOne from "../../public/feature-one.png";
import FeatureTwo from "../../public/feature-two.png";
// import FeatureThree from "/feature-three.png";

const { Header, Content, Footer } = Layout
const { Title, Paragraph, Text } = Typography

export default function LandingPage() {
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    message.success("Thank you for your interest! We'll be in touch soon.")
    form.resetFields()
  }

  return (
    <Layout style={{ minHeight: "100vh", margin: "0" }}>
      {/* Header */}
      <Header
        style={{
          background: "#f2f0ef",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          padding: "0 50px",
        }}
      >
        <Row justify="space-between" align="bottom" style={{ height: "64px" }}>
          <Col>
            <Space align="baseline">
              <img src="/logo.png" alt="CarePin" style={{ margin: 0, height: "2rem", width: "2rem"}} />
              <Title level={2} style={{ margin: 0, color: "#1890ff", fontWeight: 700 }}>
                CarePin
              </Title>
            </Space>
          </Col>
          <Col>
            <Space size="large">
              <Button type="text" style={{ color: "#666" }}>
                Features
              </Button>
              <Button type="text" style={{ color: "#666" }}>
                Pricing
              </Button>
              <Button type="text" style={{ color: "#666" }}>
                Resources
              </Button>
              <Button type="text" style={{ color: "#666" }}>
                About
              </Button>
             <UserButton />
            </Space>
          </Col>
        </Row>
      </Header>

      <Content style={{ marginTop: "64px" }}>
        {/* Hero Section */}
        <div style={{ padding: "100px 50px", background: "#f2f0ef" }}>
          <Row gutter={[60, 60]} align="middle">
            <Col xs={24} lg={12}>
              <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Title
                  level={1}
                  style={{
                    fontSize: "4rem",
                    lineHeight: "4rem",
                    color: "#1a1a1a",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  CareWorker Tracking Made Simple
                </Title>
                <Paragraph
                  style={{
                    fontSize: "1rem",
                    color: "#666",
                    lineHeight: "1.5",
                    marginBottom: "16px",
                  }}
                >
                  Know where your care workers are and when they arrive. Simple location tracking that just works, so
                  you can focus on what matters most - providing great care.
                </Paragraph>
                <Space size="large">
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      height: "48px",
                      fontSize: "16px",
                      padding: "0 32px",
                      borderRadius: "6px",
                      fontWeight: 500,
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    size="large"
                    icon={<PlayCircleOutlined />}
                    style={{
                      height: "48px",
                      fontSize: "16px",
                      padding: "0 32px",
                      borderColor: "#d9d9d9",
                      color: "#666",
                      borderRadius: "6px",
                    }}
                  >
                    Watch Demo
                  </Button>
                </Space>
                <Paragraph style={{ fontSize: "14px", color: "#999", marginTop: "16px" }}>
                  Trusted by 500+ care organizations who wanted something simple that works
                </Paragraph>
              </Space>
            </Col>
            <Col xs={24} lg={12}>
              <div style={{ textAlign: "center" }}>
                <Image
                  src={HeroImage}
                  alt="CarePin"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* What Makes CarePin Stand Out Section */}
        <div style={{ background: "#001529", padding: "100px 50px", color: "white" }}>
          <Row justify="center" style={{ marginBottom: "80px" }}>
            <Col xs={24} md={16} style={{ textAlign: "center" }}>
              <Title
                level={2}
                style={{
                  color: "white",
                  fontSize: "3.2rem",
                  lineHeight: "3.2rem",
                  fontWeight: 600,
                  marginBottom: "24px",
                }}
              >
                What Makes CarePin Stand Out?
              </Title>
            </Col>
          </Row>

          <Row gutter={[60, 80]}>
            {/* Feature 1 */}
            <Col xs={24} lg={12}>
              <Space direction="vertical" size="large">
                <div
                  style={{
                    background: "#1890ff",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  01
                </div>
                <Title level={2} style={{ color: "white", marginBottom: "8px", fontSize: "2.5rem", lineHeight: "2.5rem" }}>
                  No more guessing games!
                </Title>
                <Paragraph style={{ color: "rgba(255,255,255,0.8)", fontSize: "18px", lineHeight: "1.5" }}>
                  Care workers simply tap to check in when they arrive. You instantly know who`&apos;`s
                  where, when they arrived, and if they`&apos;`re running late. It`&apos;`s that simple.
                </Paragraph>
                <Space direction="vertical" size="small">
                  <Text style={{ color: "rgba(255,255,255,0.9)" }}>✓ One-tap check-in</Text>
                  <Text style={{ color: "rgba(255,255,255,0.9)" }}>✓ Instant notifications</Text>
                  <Text style={{ color: "rgba(255,255,255,0.9)" }}>✓ Real-time location updates</Text>
                </Space>
              </Space>
            </Col>
            <Col xs={24} lg={12}>
              <div style={{ textAlign: "center" }}>
                <Image
                  src={FeatureOne}
                  alt="Location Check-in"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                  }}
                />
              </div>
            </Col>

            {/* Feature 2 */}
            <Col xs={24} lg={12}>
              <div style={{ textAlign: "center" }}>
                <Image
                  src={FeatureTwo}
                  alt="Analytics Dashboard"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                  }}
                />
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <Space direction="vertical" size="large">
                <div
                  style={{
                    background: "#1890ff",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  02
                </div>
                <Title level={2} style={{ color: "white", marginBottom: "8px", fontSize: "2.5rem", lineHeight: "2.5rem" }}>
                  Get the reports you need, when you need them
                </Title>
                <Paragraph style={{ color: "rgba(255,255,255,0.8)", fontSize: "18px", lineHeight: "1.5" }}>
                  Click a button, get a report. See who worked where, for how long, and when. Perfect for payroll,
                  compliance, or just keeping track of your team`&apos;`s daily activities.
                </Paragraph>
                <Space direction="vertical" size="small">
                  <Text style={{ color: "rgba(255,255,255,0.9)" }}>✓ One-click reports</Text>
                  <Text style={{ color: "rgba(255,255,255,0.9)" }}>✓ Simple daily summaries</Text>
                  <Text style={{ color: "rgba(255,255,255,0.9)" }}>✓ Easy payroll export</Text>
                </Space>
              </Space>
            </Col>
           

                   {/* Feature 3*/}
            <Col xs={24} lg={12}>
              <Space direction="vertical" size="large">
                <div
                  style={{
                    background: "#1890ff",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  03
                </div>
                <Title level={2} style={{ color: "white", marginBottom: "8px", fontSize: "2.5rem", lineHeight: "2.5rem" }}>
                  Works on any phone, anywhere
                </Title>
                <Paragraph style={{ color: "rgba(255,255,255,0.8)", fontSize: "18px", lineHeight: "1.5" }}>
                Your care workers already have phones. That`&apos;`s all they need. No special equipment, no complicated
                setup. Just download the app and start tracking shifts immediately.
                </Paragraph>
                <Space direction="vertical" size="small">
                  <Text style={{ color: "rgba(255,255,255,0.9)" }}>✓ Works on iPhone and Android</Text>
                  <Text style={{ color: "rgba(255,255,255,0.9)" }}>✓ Set up in minutes, not hours</Text>
                  <Text style={{ color: "rgba(255,255,255,0.9)" }}>✓ Simple, clean interface anyone can use</Text>
                </Space>
              </Space>
            </Col>
            <Col xs={24} lg={12}>
              <div style={{ textAlign: "center" }}>
                <Image
                  src={FeatureOne}
                  alt="Intuitive Access"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* Stats Section */}
        <div style={{ padding: "80px 50px", background: "#f2f0ef" }}>
          <Row gutter={[32, 32]} justify="center">
            <Col xs={12} md={6} style={{ textAlign: "center" }}>
              <Statistic
                title="Healthcare Organizations"
                value={500}
                suffix="+"
                valueStyle={{ color: "#1890ff", fontSize: "2.5rem", fontWeight: 600 }}
                style={{ marginBottom: "8px" }}
              />
            </Col>
            <Col xs={12} md={6} style={{ textAlign: "center" }}>
              <Statistic
                title="Care Workers Managed"
                value={25000}
                suffix="+"
                valueStyle={{ color: "#1890ff", fontSize: "2.5rem", fontWeight: 600 }}
              />
            </Col>
            <Col xs={12} md={6} style={{ textAlign: "center" }}>
              <Statistic
                title="Hours Tracked"
                value={2.5}
                suffix="M+"
                valueStyle={{ color: "#1890ff", fontSize: "2.5rem", fontWeight: 600 }}
              />
            </Col>
            <Col xs={12} md={6} style={{ textAlign: "center" }}>
              <Statistic
                title="Accuracy Rate"
                value={99.8}
                suffix="%"
                valueStyle={{ color: "#1890ff", fontSize: "2.5rem", fontWeight: 600 }}
              />
            </Col>
          </Row>
        </div>

        {/* Testimonials Section */}
        <div style={{ padding: "100px 50px", background: "#f2f0ef" }}>
          <Row justify="center" style={{ marginBottom: "80px" }}>
            <Col xs={24} md={16} lg={12} style={{ textAlign: "center" }}>
              <Title level={2} style={{ fontSize: "2.5rem", marginBottom: "24px", fontWeight: 600 }}>
                Trusted by Healthcare Leaders
              </Title>
            </Col>
          </Row>

          <Row gutter={[40, 40]}>
            <Col xs={24} md={8}>
              <Card
                style={{
                  height: "100%",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  borderRadius: "12px",
                }}
              >
                <Space direction="vertical" size="large">
                  <Paragraph style={{ fontSize: "16px", color: "#666", lineHeight: "1.6" }}>
                    `&quot;`CarePin has revolutionized how we manage our care staff. The location-based check-ins ensure
                    accountability while the dashboard gives us real-time insights.`&quot;`
                  </Paragraph>
                  <Space>
                    <Avatar size={48} style={{ backgroundColor: "#1890ff" }}>
                      SM
                    </Avatar>
                    <div>
                      <Text strong style={{ color: "#1a1a1a" }}>
                        Sarah Mitchell
                      </Text>
                      <br />
                      <Text type="secondary">Operations Director, CareFirst Health</Text>
                    </div>
                  </Space>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                style={{
                  height: "100%",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  borderRadius: "12px",
                }}
              >
                <Space direction="vertical" size="large">
                  <Paragraph style={{ fontSize: "16px", color: "#666", lineHeight: "1.6" }}>
                  `&quot;`The mobile-first design is perfect for our field workers. They can easily clock in and add notes,
                    making our operations much more efficient.`&quot;`
                  </Paragraph>
                  <Space>
                    <Avatar size={48} style={{ backgroundColor: "#1890ff" }}>
                      DJ
                    </Avatar>
                    <div>
                      <Text strong style={{ color: "#1a1a1a" }}>
                        Dr. James Wilson
                      </Text>
                      <br />
                      <Text type="secondary">Medical Director, HealthCare Plus</Text>
                    </div>
                  </Space>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                style={{
                  height: "100%",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  borderRadius: "12px",
                }}
              >
                <Space direction="vertical" size="large">
                  <Paragraph style={{ fontSize: "16px", color: "#666", lineHeight: "1.6" }}>
                  `&quot;`Implementation was seamless and the support team is outstanding. CarePin has improved our
                    compliance and reduced administrative overhead significantly.`&quot;`
                  </Paragraph>
                  <Space>
                    <Avatar size={48} style={{ backgroundColor: "#1890ff" }}>
                      LR
                    </Avatar>
                    <div>
                      <Text strong style={{ color: "#1a1a1a" }}>
                        Lisa Rodriguez
                      </Text>
                      <br />
                      <Text type="secondary">HR Manager, Community Care Network</Text>
                    </div>
                  </Space>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>

        {/* CTA Section */}
        <div
          style={{
            background: "#1890ff",
            padding: "100px 50px",
            textAlign: "center",
            color: "white",
          }}
        >
          <Row justify="center">
            <Col xs={24} md={16} lg={12}>
              <Title level={2} style={{ color: "white", fontSize: "2.5rem", marginBottom: "24px", fontWeight: 600 }}>
                Ready to Make Care Tracking Simple?
              </Title>
              <Paragraph
                style={{
                  fontSize: "1.2rem",
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: "40px",
                  lineHeight: "1.6",
                }}
              >
                Join hundreds of care organizations who chose the simple solution that just works.
              </Paragraph>
              <Form
                form={form}
                layout="inline"
                onFinish={handleSubmit}
                style={{ justifyContent: "center", flexWrap: "wrap", gap: "16px" }}
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    placeholder="Enter your work email"
                    size="large"
                    style={{ borderRadius: "6px" }}
                    prefix={<MailOutlined />}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={{
                      background: "white",
                      borderColor: "white",
                      color: "#1890ff",
                      fontWeight: 600,
                      borderRadius: "6px",
                    }}
                  >
                    Start Free Trial
                  </Button>
                </Form.Item>
              </Form>
              <Paragraph
                style={{
                  marginTop: "16px",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "14px",
                }}
              >
                No credit card required • 14-day free trial • Setup in 5 minutes
              </Paragraph>
            </Col>
          </Row>
        </div>
      </Content>

      {/* Footer */}
      <Footer style={{ background: "#001529", color: "white", padding: "60px 50px 30px" }}>
        <Row gutter={[40, 40]}>
          <Col xs={24} md={6}>
            <Space direction="vertical" size="large">
              <Space align="center">
                <SafetyOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
                <Title level={4} style={{ color: "white", margin: 0 }}>
                  CarePin
                </Title>
              </Space>
              <Paragraph style={{ color: "rgba(255,255,255,0.7)" }}>
                Smart care worker management for modern healthcare organizations.
              </Paragraph>
              <Space size="large">
                <TwitterOutlined style={{ fontSize: "20px", color: "#1890ff", cursor: "pointer" }} />
                <LinkedinOutlined style={{ fontSize: "20px", color: "#1890ff", cursor: "pointer" }} />
                <GlobalOutlined style={{ fontSize: "20px", color: "#1890ff", cursor: "pointer" }} />
              </Space>
            </Space>
          </Col>
          <Col xs={12} md={6}>
            <Title level={5} style={{ color: "white" }}>
              Product
            </Title>
            <Space direction="vertical">
              <Text style={{ color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>Features</Text>
              <Text style={{ color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>Pricing</Text>
              <Text style={{ color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>Security</Text>
              <Text style={{ color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>Integrations</Text>
            </Space>
          </Col>
          <Col xs={12} md={6}>
            <Title level={5} style={{ color: "white" }}>
              Company
            </Title>
            <Space direction="vertical">
              <Text style={{ color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>About</Text>
              <Text style={{ color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>Careers</Text>
              <Text style={{ color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>Blog</Text>
              <Text style={{ color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>Contact</Text>
            </Space>
          </Col>
          <Col xs={24} md={6}>
            <Title level={5} style={{ color: "white" }}>
              Contact
            </Title>
            <Space direction="vertical">
              <Space>
                <MailOutlined style={{ color: "#1890ff" }} />
                <Text style={{ color: "rgba(255,255,255,0.7)" }}>hello@CarePin.com</Text>
              </Space>
              <Space>
                <PhoneOutlined style={{ color: "#1890ff" }} />
                <Text style={{ color: "rgba(255,255,255,0.7)" }}>1-800-SHIFT-01</Text>
              </Space>
            </Space>
          </Col>
        </Row>
        <Divider style={{ borderColor: "rgba(255,255,255,0.2)", margin: "40px 0 20px" }} />
        <Row justify="space-between" align="middle">
          <Col>
            <Text style={{ color: "rgba(255,255,255,0.7)" }}>© 2024 CarePin. All rights reserved.</Text>
          </Col>
          <Col>
            <Space>
              <Text style={{ color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>Privacy Policy</Text>
              <Text style={{ color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>Terms of Service</Text>
            </Space>
          </Col>
        </Row>
      </Footer>
    </Layout>
  )
}
