import React from "react";
import BidElement from "./BidElement";
import SellerElement from "./SellerElement";
import { useEffect, useState } from "react";

interface IOfferConstructionMachinery {
    photos: string[];
    title: string;
    make: string;
    model: string;
    application: string;
    year: number;
    operatingHours: number;
    price: number;
    condition: string;
    description: string;
    seller: {
        name: string;
        phone: string;
        email: string;
        x: number;
        y: number;
    };
};

export default function OfferPageConstructionMachinery(){
        const [offerData, setOfferData] = useState<IOfferConstructionMachinery | null>(null);
        const [isOwner, setIsOwner] = useState<boolean>(true);
        const [isEditing, setIsEditing] = useState<boolean>(false);
        const [isFavorite, setIsFavorite] = useState<boolean>(false);
    
        // useEffect(() => {
        //     fetch("https://essa.com/api/offer/123")
        //     .then((response) => response.json())
        //     .then((data) => setOfferData(data))
        //     .catch((error) => console.error("Error fetching data:", error));
        // }, []);
    
        //code below is for testing purposes only, it will be replaced with the code above
        useEffect(() => {
            import("../../testJsons/testOfferConstructionMachinery.json")
            .then((data) => setOfferData(data.default))
            .catch((error) => console.error("Error loading local data:", error));
        }, []);
    
        const handleSaveChanges = () => {
            setIsEditing(false);
        };

        const handleAddToFavorites = () => {
            setIsFavorite(!isFavorite);
        };
    
        const handleEdit = () => {
            setIsEditing(true);
        };
    
        if (!offerData) {
            return <p>Loading...</p>;
        }
        return(
            <div className="offer-page">
                <div className="offer-page-top-bar">
                    <h1>{offerData.title}</h1>
                    {!isOwner &&(
                        <button onClick={handleAddToFavorites}>
                            {isFavorite ? "Remove from favorites" : "Add to favorites"}
                        </button>
                    )}
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
                    <label>Application:</label>
                    <p>{offerData.application}</p>
                    <label>Year:</label>
                    <p>{offerData.year}</p>
                    <label>Operating hours:</label>
                    {isEditing ? (
                        <input
                        type="number"
                        value={offerData.operatingHours}
                        onChange={(event) =>
                            setOfferData({
                            ...offerData,
                            operatingHours: Number(event.target.value),
                            })
                        }
                        />
                    ) : (
                        <p>{offerData.operatingHours}</p>
                    )}
                    <label>Condition:</label>
                    <p>{offerData.condition}</p>
                </div>
                <div className="offer-page-main-seller">
                    <SellerElement phone={offerData.seller.phone} email={offerData.seller.email} x={offerData.seller.x} y={offerData.seller.y}/>
                </div>
                </div>
                <div className="offer-page-buttons">
                    {isOwner && !isEditing && (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    )}
                    {isOwner && isEditing && (
                    <button onClick={handleSaveChanges}>Save Changes</button>
                    )}
                </div>
            </div>
        );

}