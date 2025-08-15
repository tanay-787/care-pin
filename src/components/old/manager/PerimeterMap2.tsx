// components/manager/PerimeterMap.tsx
"use client";

import React, { FC } from "react";
import { MapContainer, TileLayer, Circle, useMapEvents } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Slider, InputNumber, Row, Col, Typography } from "antd";

const { Text } = Typography;

interface PerimeterMapProps {
  center: LatLngExpression;
  radius: number; // in meters
  onChange: (center: LatLngExpression, radius: number) => void;
}

const LocationSelector: FC<{ onClick: (latlng: LatLngExpression) => void }> = ({ onClick }) => {
  useMapEvents({
    click: (e) => onClick([e.latlng.lat, e.latlng.lng]),
  });
  return null;
};

const PerimeterMap: FC<PerimeterMapProps> = ({ center, radius, onChange }) => {
  return (
    <>
      <MapContainer
        center={center}
        zoom={15}
        style={{ height: "300px", width: "100%" }}
        aria-label="Perimeter map"
      >
        <TileLayer
          attribution="Map data © OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationSelector onClick={(latlng) => onChange(latlng, radius)} />
        <Circle center={center} radius={radius} pathOptions={{ color: "#0284C7" }} />
      </MapContainer>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={18}>
          <Slider
            min={100}
            max={5000}
            value={radius}
            onChange={(val) => onChange(center, val as number)}
            aria-label="Set perimeter radius (meters)"
          />
        </Col>
        <Col span={6}>
          <InputNumber
            min={100}
            max={5000}
            value={radius}
            onChange={(val) => onChange(center, val ?? radius)}
            addonAfter="m"
            style={{ width: "100%" }}
            aria-label="Perimeter radius numeric input"
          />
        </Col>
      </Row>
      <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
        Click map to set center. Use slider or input to adjust radius.
      </Text>
    </>
  );
};

export default PerimeterMap;
