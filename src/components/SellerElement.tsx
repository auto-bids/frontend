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
    <div className="seller-element bg-neutral-50">
      <h1 className="text-xl font-bold">Seller Info</h1>
      <div className="seller-element-info">
        <p className="text-gray-700">{phone}</p>
        <p className="text-gray-700">{email}</p>
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
