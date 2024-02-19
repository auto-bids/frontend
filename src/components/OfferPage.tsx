import React from "react";
import BidElement from "./BidElement";
import SellerElement from "./SellerElement";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface IAuction{
    isActive: boolean;
    currentBid: number;
    numberOfBids: number;
    sellerReserve: number;
    endDate: string;
}

interface IOffer {
    id: string;
    user_email: string;
    car: {
        title: string;
        make: string;
        model: string;
        price: number;
        description: string;
        photos: string[];
        year: number;
        mileage: number;
        vin_number: string;
        engine_capacity: number;
        fuel: string;
        transmission: string;
        steering: string;
        type: string;
        power: number;
        drive: string;
        doors: number;
        seats: number;
        registration_number: string;
        first_registration: string;
        condition: string;
        telephone_number: string;
        location: {
            type: string;
            coordinates: [number, number];
        };
    };
};

export default function OfferPage(){
    // const { offerType, id } = useParams<{ offerType: string; id: string }>();
    const { id } = useParams<{ id: string }>();
    const [offerData, setOfferData] = useState<IOffer | null>(null);
    const [isOwner, setIsOwner] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const fetchOfferData = async () => {
        try{
            const response = await fetch(`http://localhost:4000/cars/offer/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
            });
            const data = await response.json();
            setOfferData(data.data.data);
        } catch (error){
            console.error("Error loading data:", error);
        }
    }

    useEffect(() => {
        fetchOfferData();
      }, [id]);

    //code below is for testing purposes only, it will be replaced with the code above
    // useEffect(() => {
    //     import("../testJsons/testBidOffer.json")
    //     // import("../testJsons/testOffer.json")
    //       .then((data) => setOfferData(data.default))
    //       .catch((error) => console.error("Error loading local data:", error));
    //   }, []);

    const handleSaveChanges = () => {
        setIsEditing(false);
    };

    const handleAddToFavorites = () => {
        setIsFavorite(!isFavorite);
    };

    if (!offerData) {
        return <p>Loading...</p>;
    }
    return(
        <div className="offer-page">
            {/* {offerType ==="bid" && (
                <h1>
                    ***bid***
                </h1>
            )}
            {offerType ==="offer" && (
                <h1>
                    ***buy now***
                    </h1>
                    )} */}
            <div className="offer-page-top-bar">
                {!isOwner && (
                    <button onClick={() => handleAddToFavorites()}>
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </button>
                )}
                <h1>{offerData.car.title}</h1>
                <p>{offerData.car.price}</p>
                {/* {!offerData.auction && (
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
                        offerData.car.price
                        )}
                    </p>
                )} */}
                {/* {offerData.auction &&(
                    <div className="offer-page-main-bid">
                        <BidElement
                            isActive={offerData.auction.isActive}
                            currentBid={offerData.auction.currentBid}
                            numberOfBids={offerData.auction.numberOfBids}
                            sellerReserve={offerData.auction.sellerReserve}
                            endDate={new Date(offerData.auction.endDate)}
                        />
                    </div>
                )} */}
            </div>
            <div className="offer-page-main">
            <div className="offer-page-main-images">
                {offerData.car.photos.length === 1 && <p>No photos available</p>}
                {offerData.car.photos.length === 2 && (
                    <img src={offerData
                    .car.photos[0]} alt="offer" />
                )}
                {offerData.car.photos.length > 2 && (
                    <Slider {...settings}>
                        {offerData.car.photos.map((photo, index) => (
                            <div key={index}>
                                <img src={photo} alt="offer" />
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
                <div className="offer-page-main-details">
                    <label>Make:</label>
                    <p>{offerData.car.make}</p>
                    <label>Model:</label>
                    <p>{offerData.car.model}</p>
                    <label>Type:</label>
                    <p>{offerData.car.type}</p>
                    <label>Year:</label>
                    <p>{offerData.car.year}</p>
                    <label>Mileage:</label>
                    {isEditing ? (
                        <input
                            type="number"
                            value={offerData.car.mileage}
                            onChange={(event) =>
                                setOfferData({
                                    ...offerData,
                                    mileage: Number(event.target.value),
                                } as IOffer)
                            }
                        />
                    ) : (
                        <p>{offerData.car.mileage}</p>
                    )}
                    <label>Engine Capacity:</label>
                    <p>{offerData.car.engine_capacity}</p>
                    <label>Fuel:</label>
                    <p>{offerData.car.fuel}</p>
                    <label>Power:</label>
                    <p>{offerData.car.power}</p>
                    <label>Transmission:</label>
                    <p>{offerData.car.transmission}</p>
                    <label>Drive:</label>
                    <p>{offerData.car.drive}</p>
                    <label>Steering:</label>
                    <p>{offerData.car.steering}</p>
                    <label>Doors:</label>
                    <p>{offerData.car.doors}</p>
                    <label>Seats:</label>
                    <p>{offerData.car.seats}</p>
                    <label>Registration Number:</label>
                    <p>{offerData.car.registration_number}</p>
                    <label>First Registration:</label>
                    <p>{offerData.car.first_registration}</p>
                    <label>Condition:</label>
                    <p>{offerData.car.condition}</p>
                    <label>VIN Number:</label>
                    <p>{offerData.car.vin_number}</p>
                </div>
                <div className="offer-page-main-description">
                    <h2>Description</h2>
                    {isEditing ? (
                        <textarea
                            value={offerData.car.description}
                            onChange={(event) =>
                                setOfferData((prevState: IOffer | null) => ({
                                    ...offerData,
                                    description: event.target.value,
                                }))
                            }
                        />
                    ) : (
                        <p>{offerData.car.description}</p>
                    )}
                </div>
                <div className="offer-page-main-seller">
                    <SellerElement phone={offerData.car.telephone_number} email={offerData.user_email} x={offerData.car.location.coordinates[0]} y= {offerData.car.location.coordinates[1]} />
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
        </div>
    );
}