import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationInput: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [zoom, setZoom] = useState<number>(13);

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

  return (
    <div className="location-input">
      <MapContainer center={[51.505, -0.09]} zoom={zoom} style={{ height: "400px", width: "100%" }}>
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
    </div>
  );
};

export default LocationInput;
