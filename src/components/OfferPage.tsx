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
    doors: number;
    seats: number;
    registrationNumber: string;
    firstRegistration: number;
    condition: string;
    vinNumber: string;
    description: string;
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
    const [isOwner, setIsOwner] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);

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

    const handleSaveChanges = () => {
        setIsEditing(false);
    };

    if (!offerData) {
        return <p>Loading...</p>;
    }
    return(
        <div className="offer-page">
            <div className="offer-page-top-bar">
                {isOwner===true && isEditing===false ? (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                ) : (
                    ""
                )}
                {isOwner===true && isEditing===true ? (
                    <button onClick={handleSaveChanges}>Save</button>
                ) : (
                    ""
                )}
                {isOwner===true && isEditing===true ? (
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                ) : (
                    ""
                )}
                <h1>{offerData.title}</h1>
                <p>
                {isEditing ? (
                    <input
                    type="number"
                    value={offerData.price}
                    onChange={(event) =>
                        setOfferData({
                        ...offerData,
                        price: Number(event.target.value),
                        })
                    }
                    />
                ) : (
                    offerData.price
                )}
                </p>
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
                    {isOwner && isEditing ? (
                        <div className="offer-images-add-image">
                            <input type="file" accept="image/*" />
                        </div>
                    ) : (
                        ""
                    )}
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
                    {isEditing ? (
                        <input
                        type="number"
                        value={offerData.mileage}
                        onChange={(event) =>
                            setOfferData({
                            ...offerData,
                            mileage: Number(event.target.value),
                            })
                        }
                        />
                    ) : (
                        <p>{offerData.mileage}</p>
                    )}
                    <label>Engine Capacity:</label>
                    <p>{offerData.engineCapacity}</p>
                    <label>Fuel:</label>
                    <p>{offerData.fuel}</p>
                    <label>Power:</label>
                    <p>{offerData.power}</p>
                    <label>Transmission:</label>
                    <p>{offerData.drive}</p>
                    <label>Drive:</label>
                    <p>{offerData.drive}</p>
                    <label>Steering:</label>
                    <p>{offerData.steering}</p>
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
                    {isEditing ? (
                        <textarea
                        value={offerData.description}
                        onChange={(event) =>
                            setOfferData({
                            ...offerData,
                            description: event.target.value,
                            })
                        }
                        />
                    ) : (
                        <p>{offerData.description}</p>
                    )}
                </div>
                <div className="offer-page-main-seller">
                    <SellerElement name={offerData.seller.name} phone={offerData.seller.phone} email={offerData.seller.email} x={offerData.seller.x} y={offerData.seller.y}/>
                </div>
            </div>
        </div>
    );
}