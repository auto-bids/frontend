import React from "react";
import SellerElement from "./SellerElement";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from 'react-modal';

interface IOffer {
    id: string;
    user_email: string;
    motorcycle: {
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
        type: string;
        power: number;
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

function MyPrevPageArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} my-custom-prev-arrow`}
            style={{ ...style, position: "absolute", left: "0", height: "100%", width: "5%", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0, 0, 0, 0.2)" }}
            onClick={onClick}
        />
    );
}

function MyNextPageArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} my-custom-next-arrow`}
            style={{ ...style, position: "absolute", right: "0", height: "100%", width: "5%", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0, 0, 0, 0.2)" }}
            onClick={onClick}
        />
    );
}



export default function OfferPage(){
    const { id } = useParams<{ id: string }>();
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
        nextArrow: <MyNextPageArrow />,
        prevArrow: <MyPrevPageArrow />,
        adaptiveHeight: true,
    };

    const fetchOfferData = async () => {
        try{
            const response = await fetch(`${process.env.REACT_APP_MOTORCYCLES_OFFER_ID_ENDPOINT}/${id}`, {
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
                <div className={`offer-page-main-details-${label.toLowerCase().replace(/\s+/g, '-')} border shadow-md bg-neutral-50`}>
                    <label className="offer-label font-bold">{label}:</label>
                    <p className="offer-value">{value?.toString()}</p>
                </div>
            );
        }
    };

    return(
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
                    onClick={() => setIsModalOpen(false)}>x</button>
                    <img 
                    className="w-full h-auto"
                    src={offerData.motorcycle.photos[selectedPhotoIndex]} alt="offer" />
            </Modal>
            <div className="offer-page-top-bar flex justify-between items-center p-4 bg-gray-400 shadow-md shadow-gray-300">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">{offerData.motorcycle.title}</h1>
                    <p>{offerData.motorcycle.price}</p>
                </div>
            </div>
            <div className="offer-page-main grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="offer-page-main-images">
                {offerData.motorcycle.photos.length === 1 && offerData.motorcycle.photos[0]==="" && <p>No photos available</p>}
                {offerData.motorcycle.photos.length === 1 && offerData.motorcycle.photos[0]!=="" && (
                    <img src={offerData
                    .motorcycle.photos[0]} alt="offer"
                    onClick={() => openModal(0)}
                    className="object-center h-auto w-full cursor-pointer w-full h-screen object-cover"
                    />
                )}
                {offerData.motorcycle.photos.length >= 2 && (
                    <Slider {...settings}>
                        {offerData.motorcycle.photos.map((photo, index) => (
                            <img key={index} src={photo} alt="offer" className="object-center h-auto w-full cursor-pointer w-full h-screen object-cover" onClick={() => openModal(index)}/>             
                        ))}
                    </Slider>
                )}
                
            </div>
            <div className="offer-page-main-details grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderDetail("Make", offerData.motorcycle.make)}
                {renderDetail("Model", offerData.motorcycle.model)}
                {renderDetail("Type", offerData.motorcycle.type)}
                {renderDetail("Year", offerData.motorcycle.year)}
                {renderDetail("Mileage", offerData.motorcycle.mileage)}
                {renderDetail("Engine Capacity", offerData.motorcycle.engine_capacity)}
                {renderDetail("Fuel", offerData.motorcycle.fuel)}
                {renderDetail("Power", offerData.motorcycle.power)}
                {renderDetail("Transmission", offerData.motorcycle.transmission)}
                {renderDetail("Registration Number", offerData.motorcycle.registration_number)}
                {renderDetail("First Registration", offerData.motorcycle.first_registration)}
                {renderDetail("Condition", offerData.motorcycle.condition)}
                {renderDetail("VIN Number", offerData.motorcycle.vin_number)}
            </div>
                <div className="offer-page-main-description border p-2 w-full mt-4 shadow-md bg-neutral-50">
                    <h2 className="offer-page-main-description-header font-bold">Description</h2>
                    <p className="offer-page-main-description-description">{offerData.motorcycle.description}</p>
                </div>
                <div className="offer-page-main-seller bg-neutral-50 mt-4 shadow-md">
                    <SellerElement phone={offerData.motorcycle.telephone_number} email={offerData.user_email} x={offerData.motorcycle.location.coordinates[0]} y= {offerData.motorcycle.location.coordinates[1]} />
                </div>
            </div>
        </div>
    );
}