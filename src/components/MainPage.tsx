import React, {useState} from "react";
import ParametersInputMain from "./ParametersInputMain";
import ParametersInputMainMotorcycles from "./ParametersInputMainMotorcycles";
import OfferElement from "./OfferElement";
import ParametersInputDeliveryVans from "./ParametersInputMainDeliveryVans";
import ParametersInputMainTrucks from "./ParametersInputMainTrucks";
import ParametersInputMainConstructionMachinery from "./ParametersInputMainConstructionMachinery";
import ParametersInputMainTrailers from "./ParametersInputMainTrailers";

export default function MainPage() {
    const [selectedCategory, setSelectedCategory] = useState("cars");

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
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
                    <button>agricultural machinery</button>
                </div>
            </div>
            <div className="main-page-parameters-input">
            {selectedCategory === "cars" && <ParametersInputMain />}
            {selectedCategory === "motorcycles" && <ParametersInputMainMotorcycles />}
            {selectedCategory === "delivery vans" && <ParametersInputDeliveryVans />}
            {selectedCategory === "trucks" && <ParametersInputMainTrucks />}
            {selectedCategory === "construction machinery" && <ParametersInputMainConstructionMachinery />}
            {selectedCategory === "trailers" && <ParametersInputMainTrailers />}
            </div>
            <a className="ad" href='http://weed.pl/' target="_blank" rel="noreferrer">
                <img src='/ad.jpeg' alt='offer' />
            </a>
            <div className="promoted-offers">
                <h1>Promoted Offers</h1>
                {[...Array(6)].map((e, i) => <OfferElement key={i} />)}
            </div>
        </div>
    )
}