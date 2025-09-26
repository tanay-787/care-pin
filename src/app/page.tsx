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
import Logo from "../../public/logo.png"
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0";
import FeatureSectionAntd from "@/components/landing/FeatureSection";
import HeroSection from "@/components/landing/HeroSection"


const { Header, Content, Footer } = Layout
const { Title, Paragraph, Text } = Typography

export default function LandingPage() {
  const { user } = useUser();
  const [form] = Form.useForm()
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = (values: any) => {
    
messageApi.success("Thank you for your interest! We'll be in touch soon.")
    form.resetFields()
  }

  return (
    <>
    {contextHolder}
    <Layout style={{ minHeight: "100vh", margin: "0", background: "#f2f0ef" }}>
      {/* Header */}
      <div
      className="Header"
        style={{
          position: "fixed",
          top: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          width: "calc(100% - 2rem)",
          maxWidth: "480px",
          background: "transparent"
        }}>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#f2f0ef",
      borderRadius: "999px", // capsule
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      padding: "0 20px",
      height: "56px",
      minWidth: "280px",
      maxWidth: "480px",
      width: "100%",
    }}
  >
    {/* Brand */}
    <Space align="center">
      <Image
        src={Logo}
        alt="CarePin"
        style={{ height: "1.7rem", width: "1.7rem" }}
      />
      <Title
        level={2}
        style={{
          margin: 0,
          color: "#1890ff",
          fontWeight: 700,
          lineHeight: "1",
        }}
      >
        CarePin
      </Title>
    </Space>

    {/* User Button */}
    <UserButton />
  </div>
</div>



      <Content style={{ marginTop: "32px", background: "#f2f0ef" }}>
        {/* Hero Section */}
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
         {"Care"+" Check-ins,"+" Managed"}
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
            { user ? 'To Dashboard': 'Get Started'}
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
          >
            Watch Demo
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
</div>


        {/* What Makes CarePin Stand Out Section */}
        <FeatureSectionAntd />
        
        
         {/* Stats Section */}
<div style={{ padding: "64px 32px", background: "#f2f0ef" }}>
  <div style={{ textAlign: "center", marginBottom: "64px" }}>
    <h2 style={{ fontSize: "2.6rem", marginBottom: "16px", fontWeight: 600 }}>
      Our Impact
    </h2>
    <p style={{ fontSize: "1.125rem", color: "#666" }}>
      Helping healthcare providers streamline care delivery
    </p>
  </div>
  <Row gutter={[32, 48]} justify="center">
    <Col xs={12} md={6} style={{ textAlign: "center" }}>
      <Statistic
        title={<span style={{ fontSize: "1.1rem", color: "#444" }}>Healthcare Organizations</span>}
        value={500}
        suffix="+"
        valueStyle={{ color: "#1890ff", fontSize: "2.5rem", fontWeight: 600 }}
      />
    </Col>
    <Col xs={12} md={6} style={{ textAlign: "center" }}>
      <Statistic
        title={<span style={{ fontSize: "1.1rem", color: "#444" }}>Care Workers Managed</span>}
        value={25000}
        suffix="+"
        valueStyle={{ color: "#1890ff", fontSize: "2.5rem", fontWeight: 600 }}
      />
    </Col>
    <Col xs={12} md={6} style={{ textAlign: "center" }}>
      <Statistic
        title={<span style={{ fontSize: "1.1rem", color: "#444" }}>Hours Tracked</span>}
        value={2.5}
        suffix="M+"
        valueStyle={{ color: "#1890ff", fontSize: "2.5rem", fontWeight: 600 }}
      />
    </Col>
    <Col xs={12} md={6} style={{ textAlign: "center" }}>
      <Statistic
        title={<span style={{ fontSize: "1.1rem", color: "#444" }}>Accuracy Rate</span>}
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
                    &quot;CarePin has revolutionized how we manage our care staff. The location-based check-ins ensure
                    accountability while the dashboard gives us real-time insights.&quot;
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
                  &quot;The mobile-first design is perfect for our field workers. They can easily clock in and add notes,
                    making our operations much more efficient.&quot;
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
                  &quot;Implementation was seamless and the support team is outstanding. CarePin has improved our
                    compliance and reduced administrative overhead significantly.&quot;
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
                    Request Demo
                  </Button>
                </Form.Item>
              </Form>
              {/* <Paragraph
                style={{
                  marginTop: "16px",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "14px",
                }}
              >
                No credit card required • 14-day free trial • Setup in 5 minutes
              </Paragraph> */}
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
                {/* <SafetyOutlined style={{ fontSize: "24px", color: "#1890ff" }} /> */}
                <Image
        src={Logo}
        alt="CarePin"
        style={{ height: "1.4rem", width: "1.4rem" }}
      />
                <Title level={3} style={{ color: "white", margin: 0 }}>
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
            <Text style={{ color: "rgba(255,255,255,0.7)" }}>© 2025 CarePin. All rights reserved.</Text>
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
    </>
  )
}
