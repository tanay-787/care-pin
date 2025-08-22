"use client";

import { MapContainer, TileLayer, Circle, Marker } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface ClockMapProps {
  userLat: number;
  userLng: number;
  perimeterLat: number;
  perimeterLng: number;
  radius: number; // in km
}

export default function ClockMap({
  userLat,
  userLng,
  perimeterLat,
  perimeterLng,
  radius,
}: ClockMapProps) {
  const userPos: LatLngExpression = [userLat, userLng];
  const perimeterPos: LatLngExpression = [perimeterLat, perimeterLng];

  // Custom "blue dot" marker for user location
  const userIcon = L.divIcon({
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
  });

  return (
    <div
      style={{
        width: "100%",
        height: "60dvh",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={perimeterPos}
        zoom={16}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        dragging={true}
        doubleClickZoom={true}
        zoomControl={true}
      >
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
