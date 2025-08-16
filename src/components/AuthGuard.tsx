'use client'; // This component needs to be a Client Component

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spin, Modal, Select, Button, Typography, Result, Space, Radio, Card, Alert } from 'antd'; // Added necessary components
import { UserOutlined, CrownOutlined } from '@ant-design/icons'; // Added icons
import { useUser } from '@auth0/nextjs-auth0';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER, CREATE_OR_UPDATE_USER } from '@/lib/graphql-queries';
import { User } from '@/app/dashboard/page'
const { Title, Paragraph, Text } = Typography; // Destructure Text and Paragraph

interface AuthGuardProps {
  managerDashboard: (user: User) => React.ReactNode;
  careWorkerDashboard: (user: User) => React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ managerDashboard, careWorkerDashboard }) => {
  const router = useRouter();
  const { user: auth0User, error: auth0Error, isLoading: auth0Loading } = useUser(); // Auth0 user

  // Fetch user data from your database
  const {
    data: currentUserData,
    loading: userLoading,
    refetch: refetchCurrentUser,
  } = useQuery(GET_CURRENT_USER, {
    skip: !auth0User,
  });

  const [createOrUpdateUser, { loading: updateRoleLoading }] = useMutation(CREATE_OR_UPDATE_USER, {
    onCompleted: () => {
      refetchCurrentUser();
    },
    onError: (error) => {
      console.error("Failed to update role:", error);
    },
  });

  const [showRoleSelectionModal, setShowRoleSelectionModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!auth0Loading && !userLoading) {
      if (!auth0User) {
        router.push('/auth/login');
      } else {
        const userFromDB = currentUserData?.getCurrentUser;
        if (!userFromDB) {
          console.error('User data not found in database:', userFromDB);
          return;
        }
        if (!userFromDB.role) {
          setShowRoleSelectionModal(true);
        } else {
          if (userFromDB.role === 'MANAGER' || userFromDB.role === 'CARE_WORKER') {
            setIsAuthorized(true);
            setShowRoleSelectionModal(false);
          } else {
            setIsAuthorized(false);
            setShowRoleSelectionModal(false);
            console.error('Unauthorized role in database:', userFromDB.role);
          }
        }
      }
    }
  }, [auth0Loading, userLoading, auth0User, currentUserData, router]);

  // Effect to close modal after successful role update and refetch
   useEffect(() => {
      if (!updateRoleLoading && !userLoading && currentUserData?.getCurrentUser?.role) {
          setShowRoleSelectionModal(false);
          setIsAuthorized(true);
          
          router.refresh();// Assume authorized if role is now present
      }
  }, [updateRoleLoading, userLoading, currentUserData]);


  const handleRoleSelect = (e: any) => { 
    setSelectedRole(e.target.value);
  };

  const handleSetRole = async () => {
    if (!selectedRole || !auth0User || updateRoleLoading) return;

    try {
      await createOrUpdateUser({ // Use the new mutation function
        variables: {
            email: auth0User.email, // Pass user's email
            name: auth0User.name || auth0User.email, // Pass user's name (or email if name is null)
            role: selectedRole,
        },
      });
    } catch (error) {
      console.error('Error setting user role:', error);
    }
  };

  // Loading state UI
  if (auth0Loading || userLoading || updateRoleLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f0f2f5" }}>
        <Spin size="large" />
        <Typography.Text style={{ marginTop: 20, fontSize: 16, color: "rgba(0, 0, 0, 0.6)" }}>
          {auth0Loading ? "Checking authentication status..." : userLoading ? "Fetching your profile information..." : "Updating your role..."}
        </Typography.Text>
      </div>
    );
  }

  // Handle Auth0 authentication errors
  if (auth0Error) {
      console.error('Auth0 Authentication error:', auth0Error);
      return (
          <Result
              status="error"
              title="Authentication Error"
              subTitle={auth0Error.message}
              extra={<Button type="primary" onClick={() => router.push('/api/auth/login')}>Try Login Again</Button>}
          />
      );
  }

  // If authenticated via Auth0 but user data is not loaded or role is missing, show the modal
  if (auth0User && showRoleSelectionModal) {
    return (
      <Modal
        title={
          <Space>
            <UserOutlined />
            <span>Choose Your Role</span>
          </Space>
        }
        open={showRoleSelectionModal} // Use the state variable here
        onOk={handleSetRole} // Use the handler here
        okText="Continue"
        okButtonProps={{
          loading: updateRoleLoading, // Use mutation loading state
          disabled: !selectedRole || updateRoleLoading, // Disable if no role selected or loading
        }}
        closable={false}
        maskClosable={false}
        keyboard={false}
        width={500}
        centered
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Paragraph style={{ fontSize: 16, textAlign: "center", margin: 0 }}>
            Welcome! Please select your role to access the appropriate dashboard.
          </Paragraph>

          <Radio.Group value={selectedRole} onChange={handleRoleSelect} style={{ width: "100%" }}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Card
                style={{
                  cursor: "pointer",
                  border: selectedRole === "MANAGER" ? "2px solid #1890ff" : "1px solid #d9d9d9",
                }}
                onClick={() => setSelectedRole("MANAGER")} // Set state on card click
              >
                <Radio value="MANAGER" style={{ marginBottom: 8 }}>
                  <Space>
                    <CrownOutlined style={{ color: "#1890ff" }} />
                    <Text strong style={{ fontSize: 16 }}>
                      Manager
                    </Text>
                  </Space>
                </Radio>
                <Paragraph type="secondary" style={{ margin: 0, paddingLeft: 24 }}>
                  Access staff management, analytics, location settings, and shift logs
                </Paragraph>
              </Card>

              <Card
                style={{
                  cursor: "pointer",
                  border: selectedRole === "CARE_WORKER" ? "2px solid #1890ff" : "1px solid #d9d9d9",
                }}
                onClick={() => setSelectedRole("CARE_WORKER")} // Set state on card click
              >
                <Radio value="CARE_WORKER" style={{ marginBottom: 8 }}>
                  <Space>
                    <UserOutlined style={{ color: "#52c41a" }} />
                    <Text strong style={{ fontSize: 16 }}>
                      Care Worker
                    </Text>
                  </Space>
                </Radio>
                <Paragraph type="secondary" style={{ margin: 0, paddingLeft: 24 }}>
                  Clock in/out, track shifts, view your work history, and manage your schedule
                </Paragraph>
              </Card>
            </Space>
          </Radio.Group>

          <Alert
            message="Note: You can contact your administrator if you need to change your role later."
            type="info"
            showIcon
          />
        </Space>
      </Modal>
    );
  }

  // If authenticated and authorized based on user data from database
  if (auth0User && isAuthorized && currentUserData?.getCurrentUser) {
    const userRole = currentUserData.getCurrentUser.role;
    const userFromDB = currentUserData.getCurrentUser;
    console.log("User Passed All Checks")
    if (userRole === 'MANAGER') {
      return <>{managerDashboard(userFromDB)}</>;
    } else if (userRole === 'CARE_WORKER') {
      return <>{careWorkerDashboard(userFromDB)}</>;
    }
  }

  // Handle case where authenticated but not authorized based on database role
   if (auth0User && !isAuthorized && currentUserData?.getCurrentUser) {
     return (
        <Result
          status="403"
          title="Access Denied"
          subTitle="You do not have the necessary role to access this page."
          extra={<Button type="primary" onClick={() => router.push('/')}>Back Home</Button>} // Or logout
        />
     );
  }


  // Fallback
  return null;
};

export default AuthGuard;
