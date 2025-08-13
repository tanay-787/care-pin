// components/layout/AppLayout.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Layout, Menu, Drawer, Button, Avatar, Dropdown, Typography } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Header, Sider, Content, Footer } = Layout;
import type { ReactNode } from "react";

export interface AppLayoutProps {
  children: ReactNode;
  userRole: "manager" | "careworker";
}

const navItems: MenuProps["items"] = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/manager/staff",
    icon: <UserOutlined />,
    label: "Staff",
  },
];

const AppLayout: React.FC<AppLayoutProps> = ({ children, userRole }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState<string>(pathname);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedKey(e.key);
    router.push(e.key);
    setDrawerOpen(false);
  };

  const userMenu: MenuProps = {
    items: [
      {
        key: "profile",
        label: "Profile",
        onClick: () => router.push("/profile"),
      },
      {
        key: "logout",
        label: "Logout",
        icon: <LogoutOutlined />,
        onClick: () => {
          // handle logout logic
        },
      },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth={0}
        style={{ position: "fixed", height: "100vh", left: 0 }}
        className="hidden md:block"
        aria-label="Sidebar navigation"
      >
        <div className="p-4 text-white text-xl font-bold">Lief</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
					onClick={handleMenuClick}
					items={navItems.filter((item) => {
						if (!item) return false; // Handle null or undefined items
						return userRole === "careworker" && item.key === "/manager/staff"
							? false
							: true;
					})}
        />
      </Sider>

      <Layout className="md:ml-10">
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            icon={<MenuOutlined />}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            className="md:hidden"
          />

          <Typography.Title level={5} style={{ margin: 0 }}>
            Lief Clock App
          </Typography.Title>

          <Dropdown menu={userMenu} placement="bottomRight" trigger={["click"]}>
            <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
          </Dropdown>
        </Header>

        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          {children}
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Lief © {new Date().getFullYear()} — PWA Ready
        </Footer>
      </Layout>

      <Drawer
        title="Navigation"
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        aria-label="Navigation drawer"
        style={{ padding: 0}}
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
					onClick={handleMenuClick}
					items={navItems.filter((item) => {
						if (!item) return false;
						return userRole === "careworker" && item.key === "/manager/staff"
							? false
							: true;
					})}
        />
      </Drawer>
    </Layout>
  );
};

export default AppLayout;
