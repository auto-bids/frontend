import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { on } from "events";

interface LocationInputSearchProps {
    onLocationChange: (params: { position: [number, number] | null; radius: number }) => void;
}

export default function LocationInputSearch({ onLocationChange }: LocationInputSearchProps) {
    const defaultPosition: [number, number] = [52.1141903, 16.9287151];
    const [position, setPosition] = useState<[number, number] | null>([52.1141903, 16.9287151]);;
    const [zoom, setZoom] = useState<number>(6);
    const [radius, setRadius] = useState<number>(100000);
    const mapRef = React.useRef<any>();

    const handleMapClick = (e: any) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onLocationChange({ position: [lat, lng], radius });
    };

    const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRadius = parseInt(e.target.value, 10);
        setRadius(newRadius);
        onLocationChange({ position, radius: newRadius });
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
            onLocationChange({ position: [latitude, longitude], radius });
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
        iconUrl: require('../../red.png'),
        iconSize: [32, 42],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });


    const circleCenter = position || defaultPosition;

    return (
        <div className="location-input">
        <MapContainer ref={mapRef} center={defaultPosition} zoom={zoom} style={{ height: "400px", width: "100%" }}>
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
            <Circle center={circleCenter} radius={radius} className="circle" fillColor="teal" fillOpacity={0.2} color="teal" />
        </MapContainer>
        <p>Latitude: {circleCenter[0]}, Longitude: {circleCenter[1]}</p>
        <label className="block w-full" htmlFor="radius">
            <input
            type="range"
            min={100}
            max={400000}
            value={radius}
            onChange={handleRadiusChange}
            className="accent-teal-500 w-full rounded p-2"
            />
            Radius: {radius / 1000} kilometers
        </label>
        <br />
        <button className="border rounded p-2 full" type="button" onClick={getUserLocation}>Get My Location</button>
        </div>
    );
}