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
  Timeline,
  Avatar,
  Divider,
  Form,
  Input,
  message,
} from "antd"
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  DashboardOutlined,
  TeamOutlined,
  SafetyOutlined,
  MobileOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons"

const { Header, Content, Footer } = Layout
const { Title, Paragraph, Text } = Typography

export default function LandingPage() {
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    message.success("Thank you for your interest! We'll be in touch soon.")
    form.resetFields()
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Header
        style={{
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          padding: "0 50px",
        }}
      >
        <Row justify="space-between" align="middle" style={{ height: "64px" }}>
          <Col>
            <Space align="center">
              <SafetyOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
              <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
                ShiftGuard
              </Title>
            </Space>
          </Col>
          <Col>
            <Space size="large">
              <Button type="text">Features</Button>
              <Button type="text">Pricing</Button>
              <Button type="text">About</Button>
              <Button type="primary">Get Started</Button>
            </Space>
          </Col>
        </Row>
      </Header>

      <Content style={{ marginTop: "64px" }}>
        {/* Hero Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "120px 50px",
            textAlign: "center",
            color: "white",
          }}
        >
          <Row justify="center">
            <Col xs={24} md={16} lg={12}>
              <Title level={1} style={{ color: "white", fontSize: "3.5rem", marginBottom: "24px" }}>
                Smart Care Worker Management
              </Title>
              <Paragraph
                style={{
                  fontSize: "1.25rem",
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: "40px",
                  lineHeight: "1.6",
                }}
              >
                Location-based shift tracking for healthcare organizations. Monitor attendance, enforce check-ins, and
                gain valuable insights with ShiftGuard's intelligent platform.
              </Paragraph>
              <Space size="large">
                <Button type="primary" size="large" style={{ height: "50px", fontSize: "16px", padding: "0 40px" }}>
                  Start Free Trial
                </Button>
                <Button
                  size="large"
                  style={{
                    height: "50px",
                    fontSize: "16px",
                    padding: "0 40px",
                    background: "rgba(255,255,255,0.1)",
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "white",
                  }}
                >
                  Watch Demo
                </Button>
              </Space>
            </Col>
          </Row>
        </div>

        {/* Stats Section */}
        <div style={{ padding: "80px 50px", background: "#fafafa" }}>
          <Row gutter={[32, 32]} justify="center">
            <Col xs={12} md={6}>
              <Statistic
                title="Healthcare Organizations"
                value={500}
                suffix="+"
                valueStyle={{ color: "#1890ff", fontSize: "2.5rem" }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Statistic
                title="Care Workers Managed"
                value={25000}
                suffix="+"
                valueStyle={{ color: "#52c41a", fontSize: "2.5rem" }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Statistic
                title="Hours Tracked"
                value={2.5}
                suffix="M+"
                valueStyle={{ color: "#722ed1", fontSize: "2.5rem" }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Statistic
                title="Accuracy Rate"
                value={99.8}
                suffix="%"
                valueStyle={{ color: "#fa8c16", fontSize: "2.5rem" }}
              />
            </Col>
          </Row>
        </div>

        {/* Features Section */}
        <div style={{ padding: "100px 50px" }}>
          <Row justify="center" style={{ marginBottom: "80px" }}>
            <Col xs={24} md={16} lg={12} style={{ textAlign: "center" }}>
              <Title level={2} style={{ fontSize: "2.5rem", marginBottom: "24px" }}>
                Powerful Features for Modern Healthcare
              </Title>
              <Paragraph style={{ fontSize: "1.1rem", color: "#666" }}>
                Everything you need to manage your care workforce efficiently and compliantly
              </Paragraph>
            </Col>
          </Row>

          <Row gutter={[40, 40]}>
            <Col xs={24} md={12} lg={8}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  textAlign: "center",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
                bodyStyle={{ padding: "40px 30px" }}
              >
                <EnvironmentOutlined style={{ fontSize: "48px", color: "#1890ff", marginBottom: "24px" }} />
                <Title level={4}>Location-Based Check-ins</Title>
                <Paragraph style={{ color: "#666" }}>
                  Define GPS perimeters and ensure care workers can only clock in from authorized locations.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  textAlign: "center",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
                bodyStyle={{ padding: "40px 30px" }}
              >
                <DashboardOutlined style={{ fontSize: "48px", color: "#52c41a", marginBottom: "24px" }} />
                <Title level={4}>Real-time Dashboard</Title>
                <Paragraph style={{ color: "#666" }}>
                  Monitor attendance, track hours, and gain insights with comprehensive analytics and reporting.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  textAlign: "center",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
                bodyStyle={{ padding: "40px 30px" }}
              >
                <MobileOutlined style={{ fontSize: "48px", color: "#722ed1", marginBottom: "24px" }} />
                <Title level={4}>Mobile-First Design</Title>
                <Paragraph style={{ color: "#666" }}>
                  Responsive design that works perfectly on any device, with PWA capabilities for offline use.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  textAlign: "center",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
                bodyStyle={{ padding: "40px 30px" }}
              >
                <TeamOutlined style={{ fontSize: "48px", color: "#fa8c16", marginBottom: "24px" }} />
                <Title level={4}>Staff Management</Title>
                <Paragraph style={{ color: "#666" }}>
                  Comprehensive staff management with role-based access and detailed attendance tracking.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  textAlign: "center",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
                bodyStyle={{ padding: "40px 30px" }}
              >
                <BarChartOutlined style={{ fontSize: "48px", color: "#eb2f96", marginBottom: "24px" }} />
                <Title level={4}>Advanced Analytics</Title>
                <Paragraph style={{ color: "#666" }}>
                  Detailed reports on hours worked, attendance patterns, and workforce productivity metrics.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  textAlign: "center",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
                bodyStyle={{ padding: "40px 30px" }}
              >
                <SafetyOutlined style={{ fontSize: "48px", color: "#13c2c2", marginBottom: "24px" }} />
                <Title level={4}>Secure & Compliant</Title>
                <Paragraph style={{ color: "#666" }}>
                  Enterprise-grade security with HIPAA compliance and robust data protection measures.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* How It Works Section */}
        <div style={{ padding: "100px 50px", background: "#fafafa" }}>
          <Row justify="center" style={{ marginBottom: "80px" }}>
            <Col xs={24} md={16} lg={12} style={{ textAlign: "center" }}>
              <Title level={2} style={{ fontSize: "2.5rem", marginBottom: "24px" }}>
                How ShiftGuard Works
              </Title>
              <Paragraph style={{ fontSize: "1.1rem", color: "#666" }}>
                Simple, intuitive workflow that gets your team up and running in minutes
              </Paragraph>
            </Col>
          </Row>

          <Row gutter={[60, 60]} align="middle">
            <Col xs={24} lg={12}>
              <Timeline
                items={[
                  {
                    dot: <EnvironmentOutlined style={{ fontSize: "16px" }} />,
                    children: (
                      <div>
                        <Title level={4}>Set Location Perimeter</Title>
                        <Paragraph>Define GPS boundaries where care workers can clock in and out</Paragraph>
                      </div>
                    ),
                  },
                  {
                    dot: <TeamOutlined style={{ fontSize: "16px" }} />,
                    children: (
                      <div>
                        <Title level={4}>Add Your Team</Title>
                        <Paragraph>Invite care workers and assign appropriate roles and permissions</Paragraph>
                      </div>
                    ),
                  },
                  {
                    dot: <ClockCircleOutlined style={{ fontSize: "16px" }} />,
                    children: (
                      <div>
                        <Title level={4}>Start Tracking</Title>
                        <Paragraph>Care workers can now clock in/out with location validation and notes</Paragraph>
                      </div>
                    ),
                  },
                  {
                    dot: <BarChartOutlined style={{ fontSize: "16px" }} />,
                    children: (
                      <div>
                        <Title level={4}>Monitor & Analyze</Title>
                        <Paragraph>View real-time data and generate comprehensive reports</Paragraph>
                      </div>
                    ),
                  },
                ]}
              />
            </Col>
            <Col xs={24} lg={12}>
              <div
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "12px",
                  padding: "60px 40px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <CheckCircleOutlined style={{ fontSize: "64px", marginBottom: "24px" }} />
                <Title level={3} style={{ color: "white", marginBottom: "16px" }}>
                  Ready in 5 Minutes
                </Title>
                <Paragraph style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1rem" }}>
                  No complex setup required. Get your healthcare organization up and running with ShiftGuard in just a
                  few clicks.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>

        {/* Testimonials Section */}
        <div style={{ padding: "100px 50px" }}>
          <Row justify="center" style={{ marginBottom: "80px" }}>
            <Col xs={24} md={16} lg={12} style={{ textAlign: "center" }}>
              <Title level={2} style={{ fontSize: "2.5rem", marginBottom: "24px" }}>
                Trusted by Healthcare Leaders
              </Title>
            </Col>
          </Row>

          <Row gutter={[40, 40]}>
            <Col xs={24} md={8}>
              <Card style={{ height: "100%", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                <Space direction="vertical" size="large">
                  <Paragraph style={{ fontSize: "1.1rem", fontStyle: "italic", color: "#666" }}>
                    "ShiftGuard has revolutionized how we manage our care staff. The location-based check-ins ensure
                    accountability while the dashboard gives us real-time insights."
                  </Paragraph>
                  <Space>
                    <Avatar size={48} style={{ backgroundColor: "#1890ff" }}>
                      SM
                    </Avatar>
                    <div>
                      <Text strong>Sarah Mitchell</Text>
                      <br />
                      <Text type="secondary">Operations Director, CareFirst Health</Text>
                    </div>
                  </Space>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card style={{ height: "100%", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                <Space direction="vertical" size="large">
                  <Paragraph style={{ fontSize: "1.1rem", fontStyle: "italic", color: "#666" }}>
                    "The mobile-first design is perfect for our field workers. They can easily clock in and add notes,
                    making our operations much more efficient."
                  </Paragraph>
                  <Space>
                    <Avatar size={48} style={{ backgroundColor: "#52c41a" }}>
                      DJ
                    </Avatar>
                    <div>
                      <Text strong>Dr. James Wilson</Text>
                      <br />
                      <Text type="secondary">Medical Director, HealthCare Plus</Text>
                    </div>
                  </Space>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card style={{ height: "100%", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                <Space direction="vertical" size="large">
                  <Paragraph style={{ fontSize: "1.1rem", fontStyle: "italic", color: "#666" }}>
                    "Implementation was seamless and the support team is outstanding. ShiftGuard has improved our
                    compliance and reduced administrative overhead significantly."
                  </Paragraph>
                  <Space>
                    <Avatar size={48} style={{ backgroundColor: "#722ed1" }}>
                      LR
                    </Avatar>
                    <div>
                      <Text strong>Lisa Rodriguez</Text>
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
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "100px 50px",
            textAlign: "center",
            color: "white",
          }}
        >
          <Row justify="center">
            <Col xs={24} md={16} lg={12}>
              <Title level={2} style={{ color: "white", fontSize: "2.5rem", marginBottom: "24px" }}>
                Ready to Transform Your Care Management?
              </Title>
              <Paragraph
                style={{
                  fontSize: "1.25rem",
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: "40px",
                }}
              >
                Join hundreds of healthcare organizations already using ShiftGuard to streamline their operations.
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
                    style={{ width: "300px" }}
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
                      color: "#667eea",
                      fontWeight: "bold",
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
                  ShiftGuard
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
                <Text style={{ color: "rgba(255,255,255,0.7)" }}>hello@shiftguard.com</Text>
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
            <Text style={{ color: "rgba(255,255,255,0.7)" }}>© 2024 ShiftGuard. All rights reserved.</Text>
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
