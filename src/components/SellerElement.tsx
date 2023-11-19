import React, { useEffect } from "react";
import MapComponent from "./MapComponent";

interface SellerElementProps {
  name: string;
  phone: string;
  email: string;
  x: number;
  y: number;
}

export default function SellerElement({ name, phone, email, x, y }: SellerElementProps) {
  return (
    <div className="seller-element">
      <h1>Seller info</h1>
      <div className="seller-element-info">
        <p>{name}</p>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
      <div className="seller-test-map">
        <MapComponent x={x} y={y} />
      </div>
    </div>
  );
}
