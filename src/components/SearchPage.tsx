import ParametersInput from "./ParametersInput";
import ParametersInputMotorcycles from "./ParametersInputMotorcycles";
import ParametersInputDeliveryVans from "./ParametersInputDeliveryVans";
import ParametersInputTrucks from "./ParametersInputTrucks";
import ParametersInputConstructionMachinery from "./ParametersInputConstructionMachinery";
import ParametersInputTrailers from "./ParametersInputTrailers";
import ParametersInputAgriculturalMachinery from "./ParametersInputAgriculturalMachinery";
import React from "react";
import OfferElement from "./OfferElement";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { decode } from "punycode";

interface IAuction {
  isActive: boolean;
  currentBid: number;
  numberOfBids: number;
  sellerReserve: number;
  endDate: string;
}

// interface IOffer {
//   id: string;
//   image: string;
//   title: string;
//   price?: number;
//   auction?: IAuction;
//   year: number;
// };

interface IOffer {
  data:[
    {
      car:{
        photos: string[];
        title: string;
        price?: number;
        // auction?: IAuction;
        year: number;
      
      },
      id: string;
      user_email: string;
    }
  ]
};


export default function SearchPage() {
    const url = window.location.href;
    const category = url.split("/")[4].split("?")[0];
    const searchParams = url.split("?")[1].split("/")[0];
    const page = url.split("?")[1].split("/")[1];

    const [offerData, setOfferData] = useState<IOffer[] | null>(null);

    const handleNextPage = () => {
      window.location.href = `http://localhost:3000/search/${category}?${searchParams}/${parseInt(page) + 1}`;
    }

    const handlePreviousPage = () => {
      if (parseInt(page) > 1) {
        window.location.href = `http://localhost:3000/search/${category}?${searchParams}/${parseInt(page) - 1}`;
      }
    }


    const fetchData = async () => {
      const paramPairs = searchParams.split("&");
      const decodedSearchParameters = paramPairs.reduce((acc: any, pair: string) => {
      const [key, value] = pair.split("=");
        const thisKey = decodeURIComponent(key);
        if (thisKey === "price_min" || thisKey === "price_max" || thisKey === "year_min" || thisKey === "year_max" || thisKey === "mileage_min" || thisKey === "mileage_max" || thisKey === "engine_capacity_min" || thisKey === "engine_capacity_max" || thisKey === "power_min" || thisKey === "power_max" || thisKey === "doors" || thisKey=== "seats"){
          acc[key] = parseInt(decodeURIComponent(value));
        }
        else{
          acc[key] = decodeURIComponent(value);
        }
        return acc;
      }, {});

      console.log(decodedSearchParameters);
      try {
        const response = await fetch(`http://localhost:4000/cars/page/${page}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
            },
            body: JSON.stringify(decodedSearchParameters),
          });
        const data = await response.json();
        if (data.data.data.length > 0) {
          setOfferData(data.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // useEffect(() => {
    //   if (offerData === null){
    //     fetchData();
    //   }
    // }, [offerData]);

    useEffect(() => {
      fetchData();
    }
    , []);

    return (
      <div className="search-page">
        <div className="search-page-parameters">
          <div className="search-page-parameters-title">
            <h2>Search parameters</h2>
          </div>
          <div className="search-page-parameters-input">
            {category === "cars" && <ParametersInput showAllFields={true} buyNowOrBid="buyNow" searchParameters= {searchParams} />}
            {category === "cars-bids" && <ParametersInput showAllFields={true} buyNowOrBid="bid" searchParameters={searchParams} />}
            {category === "motorcycles" && <ParametersInputMotorcycles showAllFields={true} searchParameters={searchParams} />}
            {category === "delivery-vans" && <ParametersInputDeliveryVans showAllFields={true} searchParameters={searchParams} />}
            {category === "trucks" && <ParametersInputTrucks showAllFields={true} searchParameters={searchParams} />}
            {category === "construction-machinery" && <ParametersInputConstructionMachinery showAllFields={true} searchParameters={searchParams} />}
            {category === "trailers" && <ParametersInputTrailers showAllFields={true} searchParameters={searchParams} />}
            {category === "agricultural-machinery" && <ParametersInputAgriculturalMachinery showAllFields={true} searchParameters={searchParams} />}
          </div>
        </div>
        <div className="search-page-offers">
          <div className="search-page-offers-title">
            <h2>Offers</h2>
          </div>
          <div className="search-page-offers-list">
            {offerData && offerData.map((offer: any) => {
              return (
                <Link to={`/offer/${offer.id}`} key={offer.id}>
                  <OfferElement
                    image={offer.car.photos[0]}
                    title={offer.car.title}
                    price={offer.car.price}
                    auction={offer.car.auction}
                    year={offer.car.year}
                  />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="search-page-pagination">
          <div className="search-page-pagination-buttons">
            <button onClick={handlePreviousPage}>Previous</button>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </div>
      </div>
    );
}