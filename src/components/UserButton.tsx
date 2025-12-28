'use client';

import { Dropdown, Button, Avatar, Typography, Space, Switch } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useUser } from '@auth0/nextjs-auth0'; // To get the authenticated Auth0 user
import Link from 'next/link'; // For navigation links (if needed)
import { useAutoGeoAlerts } from '@/hooks/useAutoGeoAlerts';

const { Text } = Typography;

interface UserButtonProps{
  size?: 'small' | 'large' | 'default';
}

const UserButton: React.FC<UserButtonProps> = ({ size = 'default'}) => {
  const { user, error, isLoading } = useUser(); // Get the authenticated Auth0 user
  const { autoEnabled, toggleAutoGeo, contextHolder } = useAutoGeoAlerts();
  
  if (isLoading) {
    // Optional: Show a loading state while fetching user
    return <Button type="text" loading shape="circle" icon={<UserOutlined />} />;
  }

  if (error || !user) {
    // Optional: Show a login button or handle error
    return (
      <Button type="primary" style={{ borderRadius: "999px"}}>
        <a href="/auth/login">Sign In</a> {/* Link to your Auth0 login route */}
      </Button>
    );
  }

  // Get user's initials for avatar
  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : user.email
    ? user.email[0].toUpperCase()
    : '?';

  const items: MenuProps['items'] = [
    {
      key: 'user-info',
      disabled: true,
      label: (
        <Space>
          <Avatar size={'large'} icon={<UserOutlined />} src={user.picture}>{initials}</Avatar> {/* Use user.picture for profile image if available */}
          <div>
            <Text strong>{user.userName || user.email}</Text> {/* Display name or email */}
            {user.email && <Text type="secondary" style={{ display: 'block' }}>{user.email}</Text>} {/* Display email if available */}
          </div>
        </Space>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'auto-geo',
      label: (
        <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: '160px' }}>
          <Text>Auto Alerts</Text>
          <Switch size="small" checked={autoEnabled} onChange={toggleAutoGeo} />
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined style={{ color: 'red' }} />,
      danger: true,
      label: <Link href="/auth/logout">Logout</Link>, // Link to your Auth0 logout route
    },
  ];

  return (
    <>
      {contextHolder}
      <Dropdown menu={{ items }} placement="bottomRight" arrow>
        <Button type="text" size='large' shape="circle" icon={user.picture ? <Avatar size={size} src={user.picture} /> : <Avatar size={size} icon={<UserOutlined />}>{initials}</Avatar>} />
      </Dropdown>
    </>
  );
};

export default UserButton;