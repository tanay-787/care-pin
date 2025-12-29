"use client";

import { useMemo, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Circle, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import LeafletSetup from "@/components/LeafletSetup";

interface ClockMapProps {
  userLat: number;
  userLng: number;
  perimeterLat: number;
  perimeterLng: number;
  radius: number; // in km
}

/**
 * Safely calculates bounds for a circle plus an optional extra point
 */
function calculateBounds(center: [number, number], radiusKm: number, extraPoint?: [number, number]) {
  const [lat, lng] = center;
  if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng) || isNaN(radiusKm)) {
    return null;
  }

  // 1 degree latitude is approximately 111.32 km
  const latDelta = radiusKm / 111.32;
  // 1 degree longitude is approximately 111.32 * cos(latitude) km
  const lngDelta = radiusKm / (111.32 * Math.cos((lat * Math.PI) / 180));

  const bounds = L.latLngBounds(
    [lat - latDelta, lng - lngDelta],
    [lat + latDelta, lng + lngDelta]
  );

  if (extraPoint) {
    const [eLat, eLng] = extraPoint;
    if (typeof eLat === 'number' && typeof eLng === 'number' && !isNaN(eLat) && !isNaN(eLng)) {
      bounds.extend(extraPoint);
    }
  }

  return bounds.isValid() ? bounds : null;
}

function MapAdjuster({
  userPos,
  perimeterPos,
  radius
}: {
  userPos: [number, number];
  perimeterPos: [number, number];
  radius: number;
}) {
  const map = useMap();
  const hasInitialFit = useRef(false);

  useEffect(() => {
    if (!map) return;

    const fit = () => {
      try {
        map.invalidateSize();
        const bounds = calculateBounds(perimeterPos, radius, userPos);

        if (bounds) {
          map.fitBounds(bounds, {
            padding: [50, 50],
            animate: hasInitialFit.current,
          });
          hasInitialFit.current = true;
        }
      } catch (e) {
        console.error("Error fitting map bounds:", e);
      }
    };

    const timeoutId = setTimeout(fit, 150);
    return () => clearTimeout(timeoutId);
  }, [map, userPos, perimeterPos, radius]);

  return null;
}

export default function ClockMap({
  userLat,
  userLng,
  perimeterLat,
  perimeterLng,
  radius,
}: ClockMapProps) {
  const userPos: [number, number] = useMemo(() => [userLat, userLng], [userLat, userLng]);
  const perimeterPos: [number, number] = useMemo(() => [perimeterLat, perimeterLng], [perimeterLat, perimeterLng]);

  // Initial bounds calculation for the very first render
  const initialBounds = useMemo(() => {
    return calculateBounds(perimeterPos, radius, userPos) || undefined;
  }, [perimeterPos, userPos, radius]);

  // Custom "blue dot" marker for user location
  const userIcon = useMemo(() => L.divIcon({
    html: `<div style="
      width: 14px;
      height: 14px;
      background: #007bff;
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 0 4px rgba(0,0,0,0.3);
    "></div>`,
    className: "",
    iconSize: [14, 14],
  }), []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "0",
        overflow: "hidden",
      }}
    >
      <LeafletSetup />
      <MapContainer
        bounds={initialBounds}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        dragging={true}
        doubleClickZoom={true}
        zoomControl={true}
      >
        <MapAdjuster userPos={userPos} perimeterPos={perimeterPos} radius={radius} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Perimeter Circle */}
        <Circle
          center={perimeterPos}
          radius={radius * 1000}
          pathOptions={{
            color: "rgba(0,123,255,0.8)",
            fillColor: "rgba(0,123,255,0.3)",
            fillOpacity: 0.4,
          }}
        />

        {/* User Location */}
        <Marker position={userPos} icon={userIcon} />
      </MapContainer>
    </div>
  );
}
