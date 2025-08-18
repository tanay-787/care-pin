"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { getUserLocation } from "@/lib/get-location";
import { getAddressFromCoords } from "@/lib/get-address";

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

export default function LocationMap({
  centerLat,
  centerLng,
  radius,
  editable = false,
  onChange,
}: LocationMapProps) {
  const [center, setCenter] = useState<LatLngExpression>([centerLat, centerLng]);
  const [circleRadius, setCircleRadius] = useState(radius * 1000); // Leaflet uses meters
  const [address, setAddress] = useState("");
  const markerRef = useRef<L.Marker>(null);

  // 🔄 Update center when props change
  useEffect(() => {
    setCenter([centerLat, centerLng]);
    setCircleRadius(radius * 1000);
  }, [centerLat, centerLng, radius]);

  // 📍 Fetch address for given coords
  useEffect(() => {
    const fetchAddr = async () => {
      const [lat, lng] = center as [number, number];
      const addr = await getAddressFromCoords(lat, lng);
      setAddress(addr);
    };
    fetchAddr();
  }, [center]);

  // 🟢 Handle marker drag end
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

  // 🟣 Handle circle resize (via map zoom buttons for now)
  // You could extend this with a radius slider in UI
  const handleRadiusChange = (newRadius: number) => {
    setCircleRadius(newRadius);
    if (onChange) {
      const [lat, lng] = center as [number, number];
      onChange({ lat, lng }, newRadius / 1000, address);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "0.75rem", // rounded-xl
        overflow: "hidden",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)", // shadow
      }}
    >
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

      {editable && (
        <div
          style={{
            padding: "0.5rem", // p-2
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e5e7eb", // border-t
          }}
        >
          <label
            style={{
              fontSize: "0.875rem", // text-sm
            }}
          >Radius: {(circleRadius / 1000).toFixed(2)} km</label>
          <input
            type="range"
            min={500}
            max={20000} // Or a more reasonable maximum
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