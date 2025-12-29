"use client";

import { useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Circle, Marker, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import LeafletSetup from "@/components/LeafletSetup";

interface ClockMapProps {
  userLat: number;
  userLng: number;
  perimeterLat: number;
  perimeterLng: number;
  radius: number; // in km
}

function MapRecenter({ center }: { center: LatLngExpression }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
}

export default function ClockMap({
  userLat,
  userLng,
  perimeterLat,
  perimeterLng,
  radius,
}: ClockMapProps) {
  const userPos: LatLngExpression = useMemo(() => [userLat, userLng], [userLat, userLng]);
  const perimeterPos: LatLngExpression = useMemo(() => [perimeterLat, perimeterLng], [perimeterLat, perimeterLng]);

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
        center={perimeterPos}
        zoom={16}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        dragging={true}
        doubleClickZoom={true}
        zoomControl={true}
      >
        <MapRecenter center={perimeterPos} />
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
