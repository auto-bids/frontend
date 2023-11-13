import React, {useEffect} from "react";
import ParametersInput from "./ParametersInput";
import ParametersInputMotorcycles from "./ParametersInputMotorcycles";
import OfferElement from "./OfferElement";
import ParametersInputDeliveryVans from "./ParametersInputDeliveryVans";
import ParametersInputTrucks from "./ParametersInputTrucks";
import ParametersInputConstructionMachinery from "./ParametersInputConstructionMachinery";
import ParametersInputTrailers from "./ParametersInputTrailers";
import ParametersInputAgriculturalMachinery from "./ParametersInputAgriculturalMachinery";
import { useState } from "react";

declare global {
    interface Window {
      google: any;
    }
  }

export default function SellerPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showAllFields, setShowAllFields] = useState(false);
    const [showContactOrOffer, setShowContactOrOffer] = useState("offer");

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

    return(
        <div className="seller-page">
            <div className="seller-page-header">
                <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fkomistysiak.otomoto.pl%2Finventory&psig=AOvVaw1A94HXl-39484qJOVhXmjS&ust=1699967179105000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCPiaj7GFwYIDFQAAAAAdAAAAABAD" alt="avatar" />
                <h1>Komis tysiak bemowo</h1>
                <h2>Warszawa Bemowo</h2>
            </div>
            <div className="seller-page-buttons">
                <button onClick={() => setShowContactOrOffer("offer")}>Offers</button>
                <button onClick={() => setShowContactOrOffer("contact")}>Contact</button>
            </div>
            {showContactOrOffer === "offer" && 
            <div className="seller-page-offers">
                <div className="seller-page-offers-search">
                    <select onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="all">all</option>
                        <option value="cars">cars</option>
                        <option value="motorcycles">motorcycles</option>
                        <option value="delivery vans">delivery vans</option>
                        <option value="trucks">trucks</option>
                        <option value="construction machinery">construction machinery</option>
                        <option value="trailers">trailers</option>
                        <option value="agricultural machinery">agricultural machinery</option>
                    </select>
                    {selectedCategory === "cars" && <ParametersInput showAllFields={showAllFields} />}
                    {selectedCategory === "motorcycles" && <ParametersInputMotorcycles showAllFields={showAllFields}/>}
                    {selectedCategory === "delivery vans" && <ParametersInputDeliveryVans showAllFields={showAllFields}/>}
                    {selectedCategory === "trucks" && <ParametersInputTrucks showAllFields={showAllFields}/>}
                    {selectedCategory === "construction machinery" && <ParametersInputConstructionMachinery showAllFields={showAllFields}/>}
                    {selectedCategory === "trailers" && <ParametersInputTrailers showAllFields={showAllFields}/>}
                    {selectedCategory === "agricultural machinery" && <ParametersInputAgriculturalMachinery showAllFields={showAllFields}/>}
                    {selectedCategory === "all" &&
                        <>
                            <input type="text" placeholder="Search" />
                            <button>Search</button>
                        </>
                    }
                    <button className="show-all-fields" onClick={() => setShowAllFields(!showAllFields)}>{showAllFields ? "Hide additional fields" : "Show additional fields"}</button>
                </div>
                <h1>Offers</h1>
                <div className="seller-page-offers-offers">
                    {[...Array(6)].map((e, i) => <OfferElement key={i} />)}
                </div>
            </div>}
            {showContactOrOffer === "contact" &&
            <div className="seller-page-contact">
                <h3>Komis tysiak bemowo</h3>
                <div className="seller-page-contact-info">
                    <p>Phone number</p>
                    <p>Email</p>
                    <p>City</p>
                    <p>Street</p>
                    <p>Post code</p>
                </div>
                <div id="map" style={{ height: "400px", width: "100%" }}></div>
            </div>}
        </div>
    )

}