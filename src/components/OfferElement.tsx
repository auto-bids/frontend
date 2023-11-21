import React from "react";

interface OfferElementProps {
    image: string;
    title: string;
    price: number;
    year: number;
}

export default function OfferElement(props: OfferElementProps) {
    return (
        <div className="offer-element">
            <div className="offer-element-image">
                <img src={props.image} alt={props.title} />
            </div>
            <div className="offer-element-details">
                <h3>{props.title}</h3>
                <p>{props.price}€</p>
                <p>{props.year}</p>
            </div>
        </div>
    );
}
