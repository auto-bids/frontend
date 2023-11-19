import React from "react";
import BidElement from "./BidElement";
import SellerElement from "./SellerElement";
import { useEffect, useState } from "react";

interface IOffer {
    photos: string[];
    title: string;
    price: number;
    make: string;
    model: string;
    type: string;
    year: number;
    mileage: number;
    engineCapacity: number;
    fuel: string;
    power: number;
    transmission: string;
    drive: string;
    steering: string;
    color: string;
    doors: number;
    seats: number;
    registrationNumber: string;
    firstRegistration: number;
    condition: string;
    vinNumber: string;
    description: string;
    features: string[];
    seller: {
        name: string;
        phone: string;
        email: string;
        x: number;
        y: number;
    };
};

export default function OfferPage(){

    const [offerData, setOfferData] = useState<IOffer | null>(null);

    // useEffect(() => {
    //     fetch("https://essa.com/api/offer/123")
    //     .then((response) => response.json())
    //     .then((data) => setOfferData(data))
    //     .catch((error) => console.error("Error fetching data:", error));
    // }, []);

    //code below is for testing purposes only, it will be replaced with the code above
    useEffect(() => {
        import("../testJsons/testOffer.json")
          .then((data) => setOfferData(data.default))
          .catch((error) => console.error("Error loading local data:", error));
      }, []);

    if (!offerData) {
        return <p>Loading...</p>;
    }
    return(
        <div className="offer-page">
            <div className="offer-page-top-bar">
                <h1>{offerData.title}</h1>
                <p>{offerData.price}</p>
                <button className="offer-page-top-bar-button">Add to favourites</button>
            </div>
            <div className="offer-page-main">
                <div className="offer-page-main-images">
                    <div className="offer-images-current-image">
                        <img src="/test.jpeg" alt="offer" />
                    </div>
                    <div className="offer-images-other-images">
                        {offerData.photos.map((photo) => (
                            <img src={photo} alt="offer" />
                        ))}
                    </div>
                </div>
                <div className="offer-page-main-details">
                    <label>Make:</label>
                    <p>{offerData.make}</p>
                    <label>Model:</label>
                    <p>{offerData.model}</p>
                    <label>Type:</label>
                    <p>{offerData.type}</p>
                    <label>Year:</label>
                    <p>{offerData.year}</p>
                    <label>Mileage:</label>
                    <p>{offerData.mileage}</p>
                    <label>Engine Capacity:</label>
                    <p>{offerData.engineCapacity}</p>
                    <label>Fuel:</label>
                    <p>{offerData.fuel}</p>
                    <label>Power:</label>
                    <p>{offerData.power}</p>
                    <label>Transmission:</label>
                    <p>{offerData.transmission}</p>
                    <label>Drive:</label>
                    <p>{offerData.drive}</p>
                    <label>Steering:</label>
                    <p>{offerData.steering}</p>
                    <label>Color:</label>
                    <p>{offerData.color}</p>
                    <label>Doors:</label>
                    <p>{offerData.doors}</p>
                    <label>Seats:</label>
                    <p>{offerData.seats}</p>
                    <label>Registration Number:</label>
                    <p>{offerData.registrationNumber}</p>
                    <label>First Registration:</label>
                    <p>{offerData.firstRegistration}</p>
                    <label>Condition:</label>
                    <p>{offerData.condition}</p>
                    <label>VIN Number:</label>
                    <p>{offerData.vinNumber}</p>
                </div>
                <div className="offer-page-main-bid">
                    <BidElement/>
                </div>
                <div className="offer-page-main-description">
                    <h2>Description</h2>
                    <p>{offerData.description}</p>
                </div>
                <div className="offer-page-main-features">
                    <h2>Features</h2>
                    {offerData.features.map((feature, index) => (
                    <p key={index}>{feature}</p>
                    ))}
                </div>
                <div className="offer-page-main-seller">
                    <SellerElement name={offerData.seller.name} phone={offerData.seller.phone} email={offerData.seller.email} x={offerData.seller.x} y={offerData.seller.y}/>
                </div>
            </div>
        </div>
    );
}