import React from "react";
import OfferElement from "./OfferElement";
import Chat from "./Chat";
import { useEffect, useState } from "react";

interface IOffer {
    agriculturalMachinery: {
        photos: string[];
        title: string;
        price: number;
        year: number;
    };
    generalOffer: {
        photos: string[];
        title: string;
        price: number;
        year: number;
    };
    constructionMachinery: {
        photos: string[];
        title: string;
        price: number;
        year: number;
    };
    deliveryVans: {
        photos: string[];
        title: string;
        price: number;
        year: number;
    };
    motorcycles: {
        photos: string[];
        title: string;
        price: number;
        year: number;
    };
    trailers: {
        photos: string[];
        title: string;
        price: number;
        year: number;
    };
    trucks: {
        photos: string[];
        title: string;
        price: number;
        year: number;
    };
};

export default function Account() {

    //just for testing
    const [offerData, setOfferData] = useState<IOffer | null>(null);
    useEffect(() => {
        Promise.all([
          import("../testJsons/testOfferAgriculturalMachinery.json"),
          import("../testJsons/testOffer.json"),
          import("../testJsons/testOfferConstructionMachinery.json"),
          import("../testJsons/testOfferDeliveryVans.json"),
          import("../testJsons/testOfferMotorcycles.json"),
          import("../testJsons/testOfferTrailers.json"),
          import("../testJsons/testOfferTrucks.json"),
        ])
          .then((data) => {
            const [
              agriculturalMachineryData,
              offerData,
              constructionMachineryData,
              deliveryVansData,
              motorcyclesData,
              trailersData,
              trucksData,
            ] = data;
      
            setOfferData({
              agriculturalMachinery: {
                photos: agriculturalMachineryData.default.photos,
                title: agriculturalMachineryData.default.title,
                price: agriculturalMachineryData.default.price,
                year: agriculturalMachineryData.default.year,
              },
              generalOffer: {
                photos: offerData.default.photos,
                title: offerData.default.title,
                price: offerData.default.price,
                year: offerData.default.year,
              },
              constructionMachinery: {
                photos: constructionMachineryData.default.photos,
                title: constructionMachineryData.default.title,
                price: constructionMachineryData.default.price,
                year: constructionMachineryData.default.year,
              },
              deliveryVans: {
                photos: deliveryVansData.default.photos,
                title: deliveryVansData.default.title,
                price: deliveryVansData.default.price,
                year: deliveryVansData.default.year,
              },
              motorcycles: {
                photos: motorcyclesData.default.photos,
                title: motorcyclesData.default.title,
                price: motorcyclesData.default.price,
                year: motorcyclesData.default.year,
              },
              trailers: {
                photos: trailersData.default.photos,
                title: trailersData.default.title,
                price: trailersData.default.price,
                year: trailersData.default.year,
              },
              trucks: {
                photos: trucksData.default.photos,
                title: trucksData.default.title,
                price: trucksData.default.price,
                year: trucksData.default.year,
              },
            });
          })
          .catch((error) => console.error("Error loading local data:", error));
      }, []);

    return(
        <div className="account">
            <div className="account-header">
                <h2>Your account</h2>
                <img src='https://rybnik.policja.gov.pl/dokumenty/zalaczniki/57/57-663570_g.jpg' alt='jacek' />
                <h2>Jacek</h2>
                <h2>Jaworek</h2>
                <h3>email: jacek@jaworek.pl</h3>
            </div>
            <div className="account-offers">
                <h2>Your offers</h2>
                <div className="account-offers-elements">
                    ?{offerData?.generalOffer.photos.map((photo) => (
                        <OfferElement
                            key={photo}
                            image={photo}
                            title={offerData?.generalOffer.title}
                            price={offerData?.generalOffer.price}
                            year={offerData?.generalOffer.year}
                        />
                    ))}
                </div>
            </div>
            <div className="account-saved-offers">
                <h2>Saved offers</h2>
                <div className="account-saved-offers-elements">
                    ?{offerData?.generalOffer.photos.map((photo) => (
                        <OfferElement
                            key={photo}
                            image={photo}
                            title={offerData?.generalOffer.title}
                            price={offerData?.generalOffer.price}
                            year={offerData?.generalOffer.year}
                        />
                    ))}
                </div>
            </div>
            <div className="account-chat">
                <Chat />
            </div>
        </div>
    );
}