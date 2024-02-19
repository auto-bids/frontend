import React, { useEffect } from "react";
import MapComponent from "./MapComponent";

interface SellerElementProps {
  phone: string;
  email: string;
  x: number;
  y: number;
}

export default function SellerElement({phone, email, x, y }: SellerElementProps) {
  return (
    <div className="seller-element">
      <h1>Seller info</h1>
      <div className="seller-element-info">
        <p>{phone}</p>
        <p>{email}</p>
      </div>
      {x && y ? 
        <>
          <div id="map" style={{ height: "400px", width: "100%" }}></div>
          <div className="seller-test-map">
            <MapComponent x={x} y={y} />
          </div>
        </>
        : null}
    </div>
  );
}
