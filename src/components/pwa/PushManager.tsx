'use client';
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { SUBSCRIBE_PUSH, UNSUBSCRIBE_PUSH } from "@/lib/graphql-queries";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

export default function PushManager() {
  const [subscribePush] = useMutation(SUBSCRIBE_PUSH);
  const [unsubscribePush] = useMutation(UNSUBSCRIBE_PUSH);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(reg => {
        reg.pushManager.getSubscription().then(s => setSubscribed(!!s));
      });
    }
  }, []);

  const subscribe = async () => {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!)
    });

    // extract keys
    const rawKey = sub.getKey ? sub.getKey('p256dh') : null;
    const rawAuth = sub.getKey ? sub.getKey('auth') : null;
    const p256dh = rawKey ? btoa(String.fromCharCode(...new Uint8Array(rawKey))) : "";
    const auth = rawAuth ? btoa(String.fromCharCode(...new Uint8Array(rawAuth))) : "";

    // send to server via GraphQL
    await subscribePush({ variables: { endpoint: sub.endpoint, p256dh, auth } });
    setSubscribed(true);
  };

  const unsubscribe = async () => {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) {
      const endpoint = sub.endpoint;
      await sub.unsubscribe();
      await unsubscribePush({ variables: { endpoint }});
      setSubscribed(false);
    }
  };

  return (
    <div>
      {subscribed ? <button onClick={unsubscribe}>Unsubscribe</button>
                  : <button onClick={subscribe}>Enable push</button>}
    </div>
  );
}
