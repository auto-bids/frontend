import React, {useState} from "react";
import ParametersInput from "./ParametersInput";
import ParametersInputMotorcycles from "./ParametersInputMotorcycles";
import OfferElement from "./OfferElement";
import ParametersInputDeliveryVans from "./ParametersInputDeliveryVans";
import ParametersInputTrucks from "./ParametersInputTrucks";
import ParametersInputConstructionMachinery from "./ParametersInputConstructionMachinery";
import ParametersInputTrailers from "./ParametersInputTrailers";
import ParametersInputAgriculturalMachinery from "./ParametersInputAgriculturalMachinery";
import { useEffect } from "react";

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

export default function MainPage() {
    const [selectedCategory, setSelectedCategory] = useState("cars");
    const [showAllFields, setShowAllFields] = useState(false);

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

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setShowAllFields(false);
    }
    return (
        <div className='main-page'>
            <div className="main-page-choose-category">
                <h1>Choose category</h1>
                <div className="main-page-choose-category-buttons">
                    <button onClick={() => handleCategoryChange("cars")}>cars</button>
                    <button onClick={() => handleCategoryChange("motorcycles")}>motorcycles</button>
                    <button onClick={() => handleCategoryChange("delivery vans")}>delivery vans</button>
                    <button onClick={() => handleCategoryChange("trucks")}>trucks</button>
                    <button onClick={() => handleCategoryChange("construction machinery")}>construction machinery</button>
                    <button onClick={() => handleCategoryChange("trailers")}>trailers</button>
                    <button onClick={() => handleCategoryChange("agricultural machinery")}>agricultural machinery</button>
                </div>
            </div>
            <div className="main-page-parameters-input">
            {selectedCategory === "cars" && <ParametersInput showAllFields={showAllFields} />}
            {selectedCategory === "motorcycles" && <ParametersInputMotorcycles showAllFields={showAllFields}/>}
            {selectedCategory === "delivery vans" && <ParametersInputDeliveryVans showAllFields={showAllFields}/>}
            {selectedCategory === "trucks" && <ParametersInputTrucks showAllFields={showAllFields}/>}
            {selectedCategory === "construction machinery" && <ParametersInputConstructionMachinery showAllFields={showAllFields}/>}
            {selectedCategory === "trailers" && <ParametersInputTrailers showAllFields={showAllFields}/>}
            {selectedCategory === "agricultural machinery" && <ParametersInputAgriculturalMachinery showAllFields={showAllFields}/>}
            </div>
            <button className="show-all-fields" onClick={() => setShowAllFields(!showAllFields)}>{showAllFields ? "Hide additional fields" : "Show additional fields"}</button>
            <a className="ad" href='http://weed.pl/' target="_blank" rel="noreferrer">
                <img src='/ad.jpeg' alt='offer' />
            </a>
            <div className="promoted-offers">
                <h1>Promoted Offers</h1>
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
    )
}