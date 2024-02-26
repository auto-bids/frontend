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
            const response = await fetch(`${process.env.REACT_APP_CARS_OFFER_ID_ENDPOINT}/${id}`, {
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

    const renderDetail = (label: string, value: string | number) => {
        if (value) {
            return (
                <div className={`offer-page-main-details-${label.toLowerCase().replace(/\s+/g, '-')} border shadow-md bg-neutral-50`}>
                    <label className="offer-label font-bold">{label}:</label>
                    <p className="offer-value">{value?.toString()}</p>
                </div>
            );
        }
    };

    return(
        <div className="offer-page bg-gray-100">
            <div className="offer-page-top-bar flex justify-between items-center p-4 bg-gray-400">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">{offerData.car.title}</h1>
                    <p>{offerData.car.price}</p>
                </div>
                <button
                onClick={() => handleAddToFavorites()}
                className="bg-teal-500 text-white px-4 py-2 rounded"
                >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
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
            <div className="offer-page-main grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="offer-page-main-images">
                {offerData.car.photos.length === 1 && offerData.car.photos[0]==="" && <p>No photos available</p>}
                {offerData.car.photos.length === 1 && offerData.car.photos[0]!=="" && (
                    <img src={offerData
                    .car.photos[0]} alt="offer" />
                )}
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
            <div className="offer-page-main-details grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderDetail("Make", offerData.car.make)}
                {renderDetail("Model", offerData.car.model)}
                {renderDetail("Type", offerData.car.type)}
                {renderDetail("Year", offerData.car.year)}
                {renderDetail("Mileage", offerData.car.mileage)}
                {renderDetail("Engine Capacity", offerData.car.engine_capacity)}
                {renderDetail("Fuel", offerData.car.fuel)}
                {renderDetail("Power", offerData.car.power)}
                {renderDetail("Transmission", offerData.car.transmission)}
                {renderDetail("Drive", offerData.car.drive)}
                {renderDetail("Steering", offerData.car.steering)}
                {renderDetail("Doors", offerData.car.doors)}
                {renderDetail("Seats", offerData.car.seats)}
                {renderDetail("Registration Number", offerData.car.registration_number)}
                {renderDetail("First Registration", offerData.car.first_registration)}
                {renderDetail("Condition", offerData.car.condition)}
                {renderDetail("VIN Number", offerData.car.vin_number)}
            </div>
                <div className="offer-page-main-description border p-2 w-full mt-4 shadow-md bg-neutral-50">
                    <h2 className="offer-page-main-description-header font-bold">Description</h2>
                    {isEditing ? (
                        <textarea
                            className="offer-page-main-description-textarea border p-2 w-full"
                            value={offerData.car.description}
                            onChange={(event) =>
                                setOfferData((prevState: IOffer | null) => ({
                                    ...offerData,
                                    description: event.target.value,
                                }))
                            }
                        />
                    ) : (
                        <p className="offer-page-main-description-description">{offerData.car.description}</p>
                    )}
                </div>
                <div className="offer-page-main-seller bg-neutral-50 mt-4 shadow-md">
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