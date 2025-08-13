// components/layout/DashboardLayout.tsx
"use client";
import React, { ReactNode, useState } from "react";
import { Layout, Menu, Button, Typography, Avatar, Dropdown, Drawer } from "antd";
import {
  MenuOutlined,
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: "manager" | "careworker";
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userRole }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    ...(userRole === "manager"
      ? [
          { key: "/manager/staff", icon: <UserOutlined />, label: "Staff" },
          { key: "/manager/analytics", icon: <DashboardOutlined />, label: "Analytics" },
        ]
      : []),
  ].map((item) => ({
    ...item,
    onClick: () => {
      router.push(item.key);
      setDrawerOpen(false);
    },
  }));

  const userMenu = {
    items: [
      { key: "profile", label: "Profile", onClick: () => router.push("/profile") },
      { key: "logout", label: "Logout", icon: <LogoutOutlined />, onClick: () => {} },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="dark"
        collapsed={collapsed}
        onCollapse={setCollapsed}
        collapsible
        breakpoint="lg"
        width={200}
        collapsedWidth={60}
        trigger={null}
        style={{ position: "fixed", height: "100vh" }}
        aria-label="Sidebar navigation"
      >
        <div style={{ display: "flex", alignItems: "center", padding: 16 }}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle sidebar"
            style={{ color: "#fff", lineHeight: 0 }}
          />
          {!collapsed && (
            <Typography.Title level={5} style={{ color: "#fff", marginLeft: 8 }}>
              Lief
            </Typography.Title>
          )}
        </div>
        <Menu theme="dark" mode="inline" items={navItems.map((i) => ({ ...i, title: "" }))} />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 60 : 200, transition: "margin-left .2s" }}>
        <Header style={{ background: "#fff", padding: "0 16px", display: "flex", alignItems: "center" }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {userRole === "manager" ? "Manager Dashboard" : "Care Worker Dashboard"}
          </Typography.Title>
          <div style={{ marginLeft: "auto" }}>
            <Dropdown menu={userMenu} placement="bottomRight">
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>

        <Content style={{ margin: "24px 16px", overflow: "auto" }}>{children}</Content>
      </Layout>

      <Drawer placement="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Menu mode="inline" items={navItems} />
      </Drawer>
    </Layout>
  );
};

export default DashboardLayout;
