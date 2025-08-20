"use client"
import React from 'react';
import { useRouter } from "next/navigation"
import Image from "next/image";
import { NavBar, Space } from 'antd-mobile';
import { Typography} from 'antd';
import Logo from "../../../public/logo.png"
import UserButton from '../UserButton';

const { Title } = Typography;

  
const right = (
    <div>
      <Space style={{ '--gap': '16px' }}>
        <UserButton size="default" />
      </Space>
    </div>
  )

const DashboardNavBar: React.FC = () => {
    const router = useRouter();

    const back = () => router.push("/");


    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: 16}}>
    <NavBar right={right} onBack={back} style={{ width: "100%" }}>
        <Space align="baseline" style={{ paddingTop: "6px" }}>
            <Image
                src={Logo}
                alt="CarePin"
                style={{ height: "1.8rem", width: "1.9rem" }}
            />
            <Title
            className='navbar-brand-text'
                level={2}
                style={{
                    margin: 0,
                    color: "#1890ff",
                    fontWeight: 700,
                    lineHeight: "1",
                    paddingRight:'16px'
                }}
            >
                CarePin&apos;s
            </Title>
        </Space>
        <Space align="baseline" style={{ paddingTop: "6px" }}>
            <Title
                level={2}
                style={{
                    margin: 0,
                    fontWeight: 700,
                    lineHeight: "1",
                    color: "#1a1a1a",
                }}
            >
                Dashboard
            </Title>
        </Space>
    </NavBar>
    </div>
    )
}

export default DashboardNavBar;