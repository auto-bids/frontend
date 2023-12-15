import React from "react";

interface IAuction {
    isActive: boolean;
    currentBid: number;
    numberOfBids: number;
    sellerReserve: number;
    endDate: string;
}

interface OfferElementProps {
    image: string;
    title: string;
    price?: number;
    auction?: IAuction;
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
                {props.auction ? (
                    <div className="offer-element-details-bid">
                        <p>
                            {props.auction.isActive ? (
                                <span>Current bid: {props.auction.currentBid}</span>
                            ) : (
                                <span>Sold for: {props.auction.currentBid}</span>
                            )}
                        </p>
                        <p>Number of bids: {props.auction.numberOfBids}</p>
                        <p>Seller reserve: {props.auction.sellerReserve}</p>
                        <p>End date: {props.auction.endDate}</p>
                    </div>
                ) : (
                    <p>{props.price}</p>
                )}
                <p>{props.year}</p>
            </div>
        </div>
    );
}
