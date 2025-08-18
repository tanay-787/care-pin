'use client';
import { useState } from 'react';
import { useGeolocation, type Position } from '@/hooks/useGeolocation';

export default function LocationTracker() {
  const [pos, setPos] = useState<Position | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { start, stop } = useGeolocation(
    (location) => {
      setError(null);
      setPos(location);
    },
    (err) => {
      setError(err);
      setPos(null);
    }
  );

  return (
    <div>
      <button onClick={start}>Start Tracking</button>
      <button onClick={stop}>Stop Tracking</button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {pos && (
        <p>
          Lat: {pos.latitude}, Lon: {pos.longitude}, Accuracy: {pos.accuracy?.toFixed(1)}m, Time: {new Date(pos.timestamp).toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}
