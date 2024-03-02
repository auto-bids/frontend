import React, { useEffect } from "react";
import MapComponent from "./MapComponent";
import { Link } from "react-router-dom";

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
      
        <Link to={`/seller/${email}`} >
          <button className="bg-teal-500 text-white p-2 mt-2 w-full hover:bg-teal-600 transition duration-300">
            View Seller Profile
          </button>
        </Link>
    </div>
  );
}
