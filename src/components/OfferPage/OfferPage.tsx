import React, {useEffect} from "react";
import BidElement from "./BidElement";
import SellerElement from "./SellerElement";
import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from 'react-modal';


interface IAuction {
    isActive: boolean;
    currentBid: number;
    numberOfBids: number;
    sellerReserve: number;
    endDate: string;
}

interface IOffer {
    end: string;
    start: string;
    _id?: string;
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
    owner?: string
};

function MyPrevPageArrow(props: any) {
    const {className, style, onClick} = props;
    return (
        <div
            className={`${className} my-custom-prev-arrow`}
            style={{
                ...style,
                position: "absolute",
                left: "0",
                height: "100%",
                width: "5%",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0, 0, 0, 0.2)"
            }}
            onClick={onClick}
        />
    );
}

function MyNextPageArrow(props: any) {
    const {className, style, onClick} = props;
    return (
        <div
            className={`${className} my-custom-next-arrow`}
            style={{
                ...style,
                position: "absolute",
                right: "0",
                height: "100%",
                width: "5%",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0, 0, 0, 0.2)"
            }}
            onClick={onClick}
        />
    );
}


export default function OfferPage() {
    const offerType = window.location.href.split("/")[4];
    const {id} = useParams<{ id: string }>();
    const [offerData, setOfferData] = useState<IOffer | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

    const openModal = (index: number) => {
        setSelectedPhotoIndex(index);
        setIsModalOpen(true);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <MyNextPageArrow/>,
        prevArrow: <MyPrevPageArrow/>,
        adaptiveHeight: true,
    };

    const fetchOfferData = async () => {
        try {
            const response = await fetch(`${offerType !== "auction" ? process.env.REACT_APP_CARS_OFFER_ID_ENDPOINT : process.env.REACT_APP_AUCTIONS_ENDPOINT + "/get/"}/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
            });
            const data = await response.json();
            setOfferData(data.data.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }

    useEffect(() => {
        fetchOfferData();
        Modal.setAppElement('#root');
    }, [id]);


    if (!offerData) {
        return (
            <div className="offer-page bg-gray-100 flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold text-center p-4 bg-gray-400 shadow-md border width-100% rounded-md"
                >Loading...</h1>
            </div>
        )
    }

    const renderDetail = (label: string, value: string | number) => {
        if (value) {
            return (
                <div
                    className={`offer-page-main-details-${label.toLowerCase().replace(/\s+/g, '-')} border shadow-md bg-neutral-50`}>
                    <label className="offer-label font-bold">{label}:</label>
                    <p className="offer-value">{value?.toString()}</p>
                </div>
            );
        }
    };

    return (
        <div className="offer-page bg-gray-100">
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Photos"
                className="modal"
                overlayClassName="overlay"
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.7)',
                        zIndex: 1000,
                    },
                    content: {
                        position: 'fixed',
                        background: 'white',
                        width: 'auto',
                        height: 'auto',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: '20px',
                        maxWidth: '100%',
                        maxHeight: '90%',
                        overflow: 'auto',
                    },
                }}
            >
                <button
                    className="flex justify-center items-center bg-red-500 text-white px-4 py-2 rounded absolute top-0 right-0 m-1"
                    onClick={() => setIsModalOpen(false)}>x
                </button>
                <img
                    className="w-full h-auto"
                    src={offerData.car.photos[selectedPhotoIndex]} alt="offer"/>
            </Modal>
            <div
                className="offer-page-top-bar flex justify-between items-center p-4 bg-gray-400 shadow-md shadow-gray-300">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">{offerData.car.title}</h1>
                    <p className="offerPrice">{offerData.car.price}</p>
                </div>
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
                    {offerData.car.photos.length === 1 && offerData.car.photos[0] === "" && <p>No photos available</p>}
                    {offerData.car.photos.length === 1 && offerData.car.photos[0] !== "" && (
                        <img src={offerData
                            .car.photos[0]} alt="offer"
                             onClick={() => openModal(0)}
                             className="object-center h-auto w-full cursor-pointer w-full h-screen object-cover"
                        />
                    )}
                    {/* {offerData.car.photos.length === 2 && (
                    <img src={offerData
                    .car.photos[0]} alt="offer"
                    onClick={() => openModal(0)}
                    />
                )} */}
                    {offerData.car.photos.length >= 2 && (
                        <Slider {...settings}>
                            {offerData.car.photos.map((photo, index) => (
                                <img key={index} src={photo} alt="offer"
                                     className="object-center h-auto w-full cursor-pointer w-full h-screen object-cover"
                                     onClick={() => openModal(index)}/>
                            ))}
                        </Slider>
                    )}

                </div>

                <div className="offer-page-main-details grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderDetail("Make", offerData.car.make)}
                    {offerType === "auction" && (
                        <BidElement
                            endDate={new Date(offerData.end)}
                            startDate={new Date(offerData.start)}
                            offerId={offerData._id as string}
                        />
                    )}
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
                    <p className="offer-page-main-description-description">{offerData.car.description}</p>
                </div>
                {offerType !== "auction" ? (
                    <div className="offer-page-main-seller bg-neutral-50 mt-4 shadow-md">
                        <SellerElement phone={offerData.car.telephone_number} email={offerData.user_email}
                                       x={offerData.car.location.coordinates[0]}
                                       y={offerData.car.location.coordinates[1]}/>
                    </div>
                ) : (
                    <div className="offer-page-main-seller bg-neutral-50 mt-4 shadow-md">
                        <h2 className="offer-page-main-seller-header font-bold">Seller Info</h2>
                        <p className="offer-page-main-seller-email">{offerData.owner}</p>
                        <Link to={`/seller/${offerData.owner}`} >
                            <button className="bg-teal-500 text-white p-2 mt-2 w-full hover:bg-teal-600 transition duration-300">
                                View Seller Profile
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}