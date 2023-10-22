import React from "react";

export default function OfferElement() {

    return (
        <div className="offer-element">
            <img className="offer-element-img" src='/test.jpeg' alt='offer' />
            <div className="offer-element-info">
                <h2>Offer Title</h2>
                <h2>Price</h2>
                <p>Year</p>
                <p>Mileage</p>
                <p>Fuel</p>
                <p>Engine capacity</p>
                <p>Power</p>
            </div>
        </div>
    );
}
