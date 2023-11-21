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
export default function SellerPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showAllFields, setShowAllFields] = useState(false);
    const [showContactOrOffer, setShowContactOrOffer] = useState("offer");

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
            </div>}
        </div>
    )

}