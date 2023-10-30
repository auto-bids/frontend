import React, { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

export default function SellerElement() {
  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 52.1138226, lng: 16.9311019 },
        zoom: 10,
      });

      new window.google.maps.Marker({
        position: { lat: 52.1138226, lng: 16.9311019 },
        map: map,
        title: "Seller Location",
      });
    }
  }, []);

  return (
    <div className="seller-element">
      <h1>Seller info</h1>
      <div className="seller-element-info">
        <h2>Username</h2>
        <p>Phone number</p>
        <p>Email</p>
        <p>City</p>
        <p>Street</p>
        <p>Post code</p>
      </div>
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
    </div>
  );
}
