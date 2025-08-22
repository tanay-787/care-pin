"use client";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
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
  const { data } = useQuery(GET_CURRENT_USER);
  const autoEnabled = data?.getCurrentUser?.autoGeoAlerts;

  const [location, setLocation] = useState<UserLocation | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

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

          triggerGeo({
            variables: { latitude: coords.latitude, longitude: coords.longitude },
          }).catch(console.error);
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
    updateAutoGeo({ variables: { enabled } }).catch(console.error);
  };

  return { autoEnabled, toggleAutoGeo, location, locationLoading };
}
