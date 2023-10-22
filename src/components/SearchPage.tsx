import ParametersInputSearch from "./ParametersInputSearch";
import React from "react";
import OfferElement from "./OfferElement";

export default function SearchPage() {
    return (
        <div className='search-page'>
            <ParametersInputSearch />
            <div className="promoted-offers">
                <h1>Search Results</h1>
                {[...Array(35)].map((e, i) => <OfferElement key={i} />)}
            </div>
        </div>
    )
}