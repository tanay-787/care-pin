"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Input, List, Spin } from "antd";
import { getAddressFromCoords } from "@/lib/get-address";
import { useMap } from "react-leaflet";


// Fix marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface LocationMapProps {
  centerLat: number;
  centerLng: number;
  radius: number; // in km
  editable?: boolean;
  onChange?: (
    newCenter: { lat: number; lng: number },
    newRadius: number,
    address: string
  ) => void;
}


function MapUpdater({ center }: { center: LatLngExpression }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom()); // keeps current zoom, just pans
    }
  }, [center, map]);

  return null;
}


export default function LocationMap({
  centerLat,
  centerLng,
  radius,
  editable = false,
  onChange,
}: LocationMapProps) {
  const [center, setCenter] = useState<LatLngExpression>([centerLat, centerLng]);
  const [circleRadius, setCircleRadius] = useState(radius * 1000); // meters
  const [address, setAddress] = useState("");
  const markerRef = useRef<L.Marker>(null);

  // search state
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    setCenter([centerLat, centerLng]);
    setCircleRadius(radius * 1000);
  }, [centerLat, centerLng, radius]);

  //Fetch address for given coords
  useEffect(() => {
    const fetchAddr = async () => {
      const [lat, lng] = center as [number, number];
      const addr = await getAddressFromCoords(lat, lng);
      setAddress(addr);
    };
    fetchAddr();
  }, [center]);


  const handleMarkerDragEnd = async () => {
    const marker = markerRef.current;
    if (marker) {
      const pos = marker.getLatLng();
      setCenter([pos.lat, pos.lng]);
      const addr = await getAddressFromCoords(pos.lat, pos.lng);
      setAddress(addr);
      if (onChange) {
        onChange({ lat: pos.lat, lng: pos.lng }, circleRadius / 1000, addr);
      }
    }
  };


  const handleRadiusChange = (newRadius: number) => {
    setCircleRadius(newRadius);
    if (onChange) {
      const [lat, lng] = center as [number, number];
      onChange({ lat, lng }, newRadius / 1000, address);
    }
  };

  // 🔍 Search nominatim API
  const handleSearch = async (value: string) => {
    setQuery(value);
    if (!value) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 📍 When user selects a search result
  const handleSelectResult = (place: any) => {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);
    setCenter([lat, lon]);
    setAddress(place.display_name);
    setResults([]);
    if (onChange) {
      onChange({ lat, lng: lon }, circleRadius / 1000, place.display_name);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "0.75rem",
        overflow: "hidden",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        position: "relative",
      }}
    >
      {/* 🔍 Search Bar */}
      {editable && (
        <div style={{ position: "absolute", top: 10, left: 50, right: 10, zIndex: 1000 }}>
          <Input.Search
            placeholder="Search location..."
            enterButton
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSearch={handleSearch}
          />
          {loading && <Spin style={{ marginTop: 8 }} />}
          {results.length > 0 && (
            <List
              bordered
              style={{
                maxHeight: 200,
                overflow: "auto",
                background: "#fff",
                marginTop: 4,
              }}
              dataSource={results}
              renderItem={(item) => (
                <List.Item onClick={() => handleSelectResult(item)} style={{ cursor: "pointer" }}>
                  {item.display_name}
                </List.Item>
              )}
            />
          )}
        </div>
      )}

      {/* 🗺️ Map */}
      <MapContainer
        center={center}
        zoom={18}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

<MapUpdater center={center} />

        <Marker
          position={center}
          draggable={editable}
          eventHandlers={{
            dragend: handleMarkerDragEnd,
          }}
          ref={markerRef}
        >
          <Popup>
            <b>Perimeter Center</b>
            <br />
            {address || "Fetching address..."}
          </Popup>
        </Marker>

        <Circle
          center={center}
          radius={circleRadius}
          pathOptions={{ color: "blue", fillColor: "lightblue", fillOpacity: 0.3 }}
        />
      </MapContainer>

      {/* radius slider */}
      {editable && (
        <div
          style={{
            padding: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <label style={{ fontSize: "0.875rem" }}>
            Radius: {(circleRadius / 1000).toFixed(2)} km
          </label>
          <input
            type="range"
            min={500}
            max={20000}
            step={500}
            value={circleRadius}
            onChange={(e) => handleRadiusChange(parseInt(e.target.value))}
            className="w-2/3"
          />
        </div>
      )}
    </div>
  );
}
