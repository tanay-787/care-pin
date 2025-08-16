'use client';

import { Dropdown, Menu, Button, Avatar, Typography, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useUser } from '@auth0/nextjs-auth0'; // To get the Auth0 user
import Link from 'next/link'; // For navigation links (if needed)

const { Text } = Typography;

const UserButton: React.FC = () => {
  const { user, error, isLoading } = useUser(); // Get the authenticated Auth0 user

  if (isLoading) {
    // Optional: Show a loading state while fetching user
    return <Button type="text" loading shape="circle" icon={<UserOutlined />} />;
  }

  if (error || !user) {
    // Optional: Show a login button or handle error
    return (
      <Button type="primary">
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

  const menu = (
    <Menu>
      {/* User Info Item */}
      <Menu.Item key="user-info" disabled> {/* Disable this item as it's just info */}
        <Space>
          <Avatar icon={<UserOutlined />} src={user.picture}>{initials}</Avatar> {/* Use user.picture for profile image if available */}
          <div>
            <Text strong>{user.userName || user.email}</Text> {/* Display name or email */}
            {user.email && <Text type="secondary" style={{ display: 'block' }}>{user.email}</Text>} {/* Display email if available */}
          </div>
        </Space>
      </Menu.Item>

      <Menu.Divider /> {/* Separator */}

      {/* Example Menu Items (Customize as needed) */}
      {/* <Menu.Item key="theme">Theme</Menu.Item> */}
      {/* <Menu.Item key="billing">Billing</Menu.Item> */}
      {/* <Menu.Item key="settings">Settings</Menu.Item> */}

      {/* Logout Item */}
      <Menu.Item key="logout" icon={<LogoutOutlined style={{ color: 'red' }} />} danger>
        <Link href="/auth/logout">Logout</Link> {/* Link to your Auth0 logout route */}
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight" arrow>
      <Button type="text" size='large' shape="circle" icon={user.picture ? <Avatar src={user.picture} size="small" /> : <Avatar size="small" icon={<UserOutlined />}>{initials}</Avatar>} />
    </Dropdown>
  );
};

export default UserButton;
