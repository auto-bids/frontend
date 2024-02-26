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
        <div className={`offer-element ${window.innerWidth > 1000 ? 'grid' : 'flex'} ${window.innerWidth > 1000 ? 'grid-cols-3' : ''} border p-4 rounded-md mb-4 shadow-md`}>
          {window.innerWidth > 1000 ? (
            <>
              <div className="offer-element-image col-span-1">
                <img src={props.image} alt={props.title} className="w-full h-auto" />
              </div>
              <div className="offer-element-details col-span-2 mt-4">
                <h3 className="text-lg font-bold mb-2">{props.title}</h3>
                {props.auction ? (
                  <div className="offer-element-details-bid">
                    <p>
                      {props.auction.isActive ? (
                        <span className="text-green-500">Current bid: {props.auction.currentBid}</span>
                      ) : (
                        <span className="text-red-500">Sold for: {props.auction.currentBid}</span>
                      )}
                    </p>
                    <p className="text-gray-700">Number of bids: {props.auction.numberOfBids}</p>
                    <p className="text-gray-700">Seller reserve: {props.auction.sellerReserve}</p>
                    <p className="text-gray-700">End date: {props.auction.endDate}</p>
                  </div>
                ) : (
                  <p className="text-xl font-bold text-blue-500">{props.price}</p>
                )}
                <p className="text-gray-700">{props.year}</p>
              </div>
            </>
          ) : (
            <>
              <div className="offer-element-image w-1/3 mr-4">
                <img src={props.image} alt={props.title} className="w-full h-auto" />
              </div>
              <div className="offer-element-details flex-grow">
                <h3 className="text-lg font-bold mb-2">{props.title}</h3>
                {props.auction ? (
                  <div className="offer-element-details-bid">
                    <p>
                      {props.auction.isActive ? (
                        <span className="text-green-500">Current bid: {props.auction.currentBid}</span>
                      ) : (
                        <span className="text-red-500">Sold for: {props.auction.currentBid}</span>
                      )}
                    </p>
                    <p className="text-gray-700">Number of bids: {props.auction.numberOfBids}</p>
                    <p className="text-gray-700">Seller reserve: {props.auction.sellerReserve}</p>
                    <p className="text-gray-700">End date: {props.auction.endDate}</p>
                  </div>
                ) : (
                  <p className="text-xl font-bold text-blue-500">{props.price}</p>
                )}
                <p className="text-gray-700">{props.year}</p>
              </div>
            </>
          )}
        </div>
      );
      
      
}
