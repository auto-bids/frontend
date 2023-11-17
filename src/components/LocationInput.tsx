import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function LocationInput() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [zoom, setZoom] = useState<number>(13);
  const mapRef = React.useRef<any>();

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
  };

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          setPosition([latitude, longitude]);
          setZoom(15);
          if (mapRef.current) {
            mapRef.current.flyTo([latitude, longitude], 15);
          }
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="location-input">
      <MapContainer ref={mapRef} center={[51.505, -0.09]} zoom={zoom} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        {position && (
          <Marker position={position}>
            <Popup>Your selected location</Popup>
          </Marker>
        )}
      </MapContainer>
      <p>{position}</p>
      <button onClick={getUserLocation}>Get My Location</button>
    </div>
  );
};
