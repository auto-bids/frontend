import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function LocationInput() {
  const [position, setPosition] = useState<[number, number] | null>([52.1141903, 16.9287151]);
  const [zoom, setZoom] = useState<number>(6);
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

  const customIcon = new L.Icon({
    iconUrl: require('./../profile-picture.jpg'),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="location-input">
      <MapContainer ref={mapRef} center={[52.1141903, 16.9287151]} zoom={zoom} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        {position && (
          <Marker position={position} icon={customIcon}>
            <Popup>Your selected location</Popup>
          </Marker>
        )}
      </MapContainer>
      <p>{position}</p>
      <button onClick={getUserLocation}>Get My Location</button>
    </div>
  );
}