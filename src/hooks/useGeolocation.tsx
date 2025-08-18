import { useEffect, useRef } from 'react';

export type Position = {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: number;
};

type ErrorCallback = (message: string) => void;
type SuccessCallback = (position: Position) => void;

const defaultOptions: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 0,
};

export function useGeolocation(
  onSuccess: SuccessCallback,
  onError: ErrorCallback,
  options: PositionOptions = defaultOptions
) {
  const watchId = useRef<number | null>(null);

  const start = () => {
    if (!("geolocation" in navigator)) {
      onError("Geolocation is not supported by your browser.");
      return;
    }

    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        onSuccess({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp
        });
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            onError("User denied the request for Geolocation.");
            break;
          case err.POSITION_UNAVAILABLE:
            onError("Location information is unavailable.");
            break;
          case err.TIMEOUT:
            onError("The request to get user location timed out.");
            break;
          default:
            onError(`Geolocation error (${err.code}): ${err.message}`);
        }
      },
      options
    );
  };

  const stop = () => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  };

  useEffect(
    () => () => {
      stop();
    },
    []
  );

  return { start, stop };
}
