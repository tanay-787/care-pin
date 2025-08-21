'use client';
import { useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { TRIGGER_GEO } from "@/lib/graphql-queries";

export default function GeoWatcher() {
  const watchId = useRef<number | null>(null);
  const [triggerGeo] = useMutation(TRIGGER_GEO);

  useEffect(() => {
    if (!("geolocation" in navigator)) return;
    watchId.current = navigator.geolocation.watchPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      try {
        await triggerGeo({ variables: { latitude: lat, longitude: lon }});
      } catch (err) {
        console.error("triggerGeo error", err);
      }
    }, (err) => console.error(err), { enableHighAccuracy: true, maximumAge: 5000 });

    return () => {
      if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current);
    };
  }, [triggerGeo]);

  return null;
}
