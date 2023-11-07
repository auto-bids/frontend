import React, {useState} from "react";
import ParametersInput from "./ParametersInput";
import ParametersInputMotorcycles from "./ParametersInputMotorcycles";
import OfferElement from "./OfferElement";
import ParametersInputDeliveryVans from "./ParametersInputDeliveryVans";
import ParametersInputTrucks from "./ParametersInputTrucks";
import ParametersInputConstructionMachinery from "./ParametersInputConstructionMachinery";
import ParametersInputTrailers from "./ParametersInputTrailers";
import ParametersInputAgriculturalMachinery from "./ParametersInputAgriculturalMachinery";

export default function MainPage() {
    const [selectedCategory, setSelectedCategory] = useState("cars");
    const [showAllFields, setShowAllFields] = useState(false);

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
                {[...Array(6)].map((e, i) => <OfferElement key={i} />)}
            </div>
        </div>
    )
}