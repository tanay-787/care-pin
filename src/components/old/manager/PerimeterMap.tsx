// components/manager/PerimeterMap.tsx
"use client";
import React from "react";
import * as L from 'leaflet';
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

interface PerimeterMapProps {
  center: [number, number];
  radius: number;
  onChange: (center: [number, number], radius: number) => void;
}

const PerimeterMap: React.FC<PerimeterMapProps> = ({ center, radius, onChange }) => {
  return (
    <div
      tabIndex={0}
      aria-label="Interactive geofence map. Use drawing tools to set perimeter."
      role="application"
    >
      <MapContainer center={center} zoom={15} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup>
          <EditControl
            position="topright"
            draw={{
              rectangle: false,
              polygon: false,
              polyline: false,
              marker: false,
              circlemarker: false,
            }}
            edit={{ edit: false, remove: false }}
            onCreated={(e) => {
                const layer = e.layer;
                if (layer instanceof Circle) {
                  const circleLayer = layer as L.Circle; // Cast to Leaflet Circle type
                  const newCenter = circleLayer.getLatLng();
                  const newRadius = circleLayer.getRadius();
                  onChange([newCenter.lat, newCenter.lng], newRadius);
                }
              }}
              
          />
          <Circle center={center} radius={radius} pathOptions={{ color: "blue" }} />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default PerimeterMap;
