import React from "react";
import ParametersInputMain from "./ParametersInputMain";
import OfferElement from "./OfferElement";

export default function MainPage() {
    return (
        <div className='main-page'>
            <ParametersInputMain />
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