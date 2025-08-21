"use client";

import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client'; // Assuming gql is available from @apollo/client
import { Button, Card, Space, Typography, message } from 'antd';
import { SUBSCRIBE_PUSH, GREET_USER } from '@/lib/graphql-queries'; // Adjust the import path as needed
import { Tag } from 'antd-mobile';

const { Title, Text, Paragraph } = Typography;

interface PushSubscriptionDetails {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

// Function to convert VAPID public key from base64url to Uint8Array
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const TestPushPage = () => {
  const [subscription, setSubscription] = useState<PushSubscriptionDetails | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  const [messageApi, contextHolder] = message.useMessage();

  const [subscribePushMutation] = useMutation(SUBSCRIBE_PUSH);
  const [greetUserMutation] = useMutation(GREET_USER);

  // Replace with your VAPID public key environment variable
  const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

  useEffect(() => {
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
    // Check for existing subscription
    navigator.serviceWorker.ready.then(registration => {
      registration.pushManager.getSubscription().then(sub => {
        if (sub) {
          setSubscription(sub.toJSON() as PushSubscriptionDetails);
        }
      });
    });
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
      if (permission === 'granted') {
        messageApi.success('Notification permission granted!');
      } else {
        messageApi.warning('Notification permission denied.');
      }
    } else {
      messageApi.error('Browser does not support notifications.');
    }
  };

  const subscribeUser = async () => {
    if (!('serviceWorker' in navigator)) {
      messageApi.error('Service Worker not supported.');
      return;
    }
    if (permissionStatus !== 'granted') {
      messageApi.warning('Please grant notification permission first.');
      return;
    }
    if (!VAPID_PUBLIC_KEY) {
      messageApi.error('VAPID Public Key is not configured.');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();

      if (existingSubscription) {
        setSubscription(existingSubscription.toJSON() as PushSubscriptionDetails);
        messageApi.info('Already subscribed.');
        return;
      }

      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      const subJSON = sub.toJSON() as PushSubscriptionDetails;
      setSubscription(subJSON);

      // Send subscription to your backend
      await subscribePushMutation({
        variables: {
          endpoint: subJSON.endpoint,
          p256dh: subJSON.keys.p256dh,
          auth: subJSON.keys.auth,
        },
      });

      messageApi.success('Successfully subscribed to push notifications!');

    } catch (error: any) {
      console.error('Failed to subscribe the user:', error);
      messageApi.error(`Failed to subscribe: ${error.message || 'Unknown error'}`);
    }
  };

  const triggerTestNotification = async () => {
    if (!subscription) {
      messageApi.warning('Please subscribe to push notifications first.');
      return;
    }

    try {
      // Call the GREET_USER mutation on your server
      await greetUserMutation();
      messageApi.success('Test notification triggered (server sent).');
    } catch (error: any) {
      console.error('Failed to trigger test notification:', error);
      messageApi.error(`Failed to trigger notification: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <>
      {contextHolder}
      <div style={{ padding: 20 }}>
        <Title level={3}>Test Push Notifications</Title>
        <Paragraph>
          Use the buttons below to test the push notification setup.
        </Paragraph>

        <Card title="Steps" style={{ marginBottom: 20 }}>
          <Space direction="vertical">
            <Button
              type="primary"
              onClick={requestPermission}
              disabled={permissionStatus === 'granted'}
            >
              {permissionStatus === 'granted' ? 'Permission Granted' : 'Request Permission'}
            </Button>
            <Button
              type="primary"
              onClick={subscribeUser}
              disabled={permissionStatus !== 'granted' || !!subscription}
            >
              {subscription ? 'Subscribed' : 'Subscribe to Push'}
            </Button>
            <Button
              type="primary"
              onClick={triggerTestNotification}
              disabled={!subscription}
            >
              Trigger Test Notification (Greet User)
            </Button>
          </Space>
        </Card>

        <Card title="Subscription Details">
          {subscription ? (
            <Space direction="vertical">
              <Text strong>Endpoint:</Text>
              <Paragraph copyable>{subscription.endpoint}</Paragraph>
              <Text strong>P256dh Key:</Text>
              <Paragraph copyable>{subscription.keys.p256dh}</Paragraph>
              <Text strong>Auth Key:</Text>
              <Paragraph copyable>{subscription.keys.auth}</Paragraph>
            </Space>
          ) : (
            <Text type="secondary">No active subscription found.</Text>
          )}
        </Card>

        <Card title="Current Permission Status" style={{ marginTop: 20 }}>
            <Text>Status: <Tag color={permissionStatus === 'granted' ? 'green' : permissionStatus === 'denied' ? 'red' : 'default'}>{permissionStatus.toUpperCase()}</Tag></Text>
        </Card>
      </div>
    </>
  );
};

export default TestPushPage;