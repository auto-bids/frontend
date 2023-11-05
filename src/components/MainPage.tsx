import React, {useState} from "react";
import ParametersInputMain from "./ParametersInputMain";
import ParametersInputMainMotorcycles from "./ParametersInputMainMotorcycles";
import OfferElement from "./OfferElement";

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
                    <button>delivery vans</button>
                    <button>trucks</button>
                    <button>construction machinery</button>
                    <button>trailers</button>
                    <button>agricultural machinery</button>
                </div>
            </div>
            <div className="main-page-parameters-input">
            {selectedCategory === "cars" && <ParametersInputMain />}
            {selectedCategory === "motorcycles" && <ParametersInputMainMotorcycles />}
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