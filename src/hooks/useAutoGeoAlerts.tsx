"use client";
import { useEffect, useState, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { message } from "antd";
import {
  GET_CURRENT_USER,
  TRIGGER_GEO,
  UPDATE_AUTO_GEO,
} from "@/lib/graphql-queries";

interface UserLocation {
  latitude: number;
  longitude: number;
}

export function useAutoGeoAlerts() {
  const [messageApi, contextHolder] = message.useMessage();
  const { data } = useQuery(GET_CURRENT_USER);
  const autoEnabled = data?.getCurrentUser?.autoGeoAlerts ?? false;

  const [location, setLocation] = useState<UserLocation | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const lastTriggerTimeRef = useRef(0);
  const [triggerGeo] = useMutation(TRIGGER_GEO);
  const [updateAutoGeo] = useMutation(UPDATE_AUTO_GEO, {
    update(cache, { data: { updateAutoGeo } }) {
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: { getCurrentUser: updateAutoGeo },
      });
    },
  });

  useEffect(() => {
    let watchId: number | null = null;

    if (autoEnabled && "geolocation" in navigator) {
      setLocationLoading(true);

      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const coords = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          setLocation(coords);
          setLocationLoading(false);

          const currentTime = Date.now();
          const fiveMinutes = 5 * 60 * 1000;

          if (currentTime - lastTriggerTimeRef.current > fiveMinutes) {
            triggerGeo({
              variables: { latitude: coords.latitude, longitude: coords.longitude },
            }).catch(console.error);
            lastTriggerTimeRef.current = currentTime;
          }
        },
        (err) => {
          console.error(err);
          setLocationLoading(false);
        },
        { enableHighAccuracy: true, maximumAge: 5000 }
      );
    }

    return () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, [autoEnabled, triggerGeo]);

  const toggleAutoGeo = (enabled: boolean) => {
    updateAutoGeo({
      variables: { enabled },
      onCompleted: () => {
        messageApi.success(`Location alerts ${enabled ? "enabled" : "disabled"}`);
      },
    }).catch((err) => {
      console.error(err);
      messageApi.error("Failed to update alert settings");
    });
  };

  return { autoEnabled, toggleAutoGeo, location, locationLoading, contextHolder };
}
