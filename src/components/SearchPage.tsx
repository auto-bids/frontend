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

    const handleNextPage = async () => {
      window.location.href = `${process.env.REACT_APP_FRONT_SEARCH_ENDPOINT}/${category}?${searchParams}/${parseInt(page) + 1}`;
    }

    const handlePreviousPage = () => {
      if (parseInt(page) > 1) {
        window.location.href = `${process.env.REACT_APP_FRONT_SEARCH_ENDPOINT}/${category}?${searchParams}/${parseInt(page) - 1}`;
      }
    }


    const fetchData = async () => {
      const paramPairs = searchParams.split("&");
      const decodedSearchParameters = paramPairs.reduce((acc: any, pair: string) => {
        const [key, value] = pair.split("=");
        const thisKey = decodeURIComponent(key);
    
        if (
          ["price_min", "price_max", "year_min", "year_max", "mileage_min", "mileage_max", "engine_capacity_min", "engine_capacity_max", "power_min", "power_max", "doors", "seats"].includes(thisKey)
        ) {
          acc[thisKey] = parseInt(decodeURIComponent(value), 10);
        } else if (["lat", "lng", "radius"].includes(thisKey)) {
          acc[thisKey] = parseFloat(decodeURIComponent(value));
        } else {
          if (value) {
            acc[thisKey] = decodeURIComponent(value.replace(/\+/g, ' '));
          }
        }
    
        return acc;
      }, {});
    
      decodedSearchParameters["location"] = {
        type: "Point",
        coordinates: [decodedSearchParameters["lng"], decodedSearchParameters["lat"]],
      };
      delete decodedSearchParameters["lat"];
      delete decodedSearchParameters["lng"];
      decodedSearchParameters["distance"] = decodedSearchParameters["radius"];
      delete decodedSearchParameters["radius"];
    
      // console.log(decodedSearchParameters);
    
      try {
        const response = await fetch(`${process.env.REACT_APP_CARS_PAGE_ENDPOINT}/${page}`, {
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
    };
    
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
        <div className="search-page-parameters bg-gray-100 p-4">
          <div className="search-page-parameters-title">
            <h2 className="text-2xl font-bold mb-4">Search parameters</h2>
          </div>
          <div className="search-page-parameters-input">
            {category === "cars" && <ParametersInput showAllFields={true} buyNowOrBid="buyNow" searchParameters={searchParams} />}
            {category === "cars-bids" && <ParametersInput showAllFields={true} buyNowOrBid="bid" searchParameters={searchParams} />}
            {category === "motorcycles" && <ParametersInputMotorcycles showAllFields={true} searchParameters={searchParams} />}
            {category === "delivery-vans" && <ParametersInputDeliveryVans showAllFields={true} searchParameters={searchParams} />}
            {category === "trucks" && <ParametersInputTrucks showAllFields={true} searchParameters={searchParams} />}
            {category === "construction-machinery" && <ParametersInputConstructionMachinery showAllFields={true} searchParameters={searchParams} />}
            {category === "trailers" && <ParametersInputTrailers showAllFields={true} searchParameters={searchParams} />}
            {category === "agricultural-machinery" && <ParametersInputAgriculturalMachinery showAllFields={true} searchParameters={searchParams} />}
          </div>
        </div>
        <div className="search-page-offers bg-white p-4">
          <div className="search-page-offers-title">
            <h2 className="text-2xl font-bold mb-4">Offers</h2>
          </div>
          <div className="search-page-offers-list gap-4">
            {offerData && offerData.map((offer: any) => (
              <Link to={`/${category}/offer/${offer.id}`} key={offer.id} className="block border border-gray-300 rounded p-4 transition duration-300 hover:shadow-md">
                <OfferElement
                  image={offer.car.photos[0]}
                  title={offer.car.title}
                  price={offer.car.price}
                  auction={offer.car.auction}
                  year={offer.car.year}
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="search-page-pagination mt-4">
          <div className="search-page-pagination-buttons">
            <button
              onClick={handlePreviousPage}
              className="form-button border-2 rounded p-2 mr-2 hover:bg-gray-200 transition duration-300"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className="form-button border-2 rounded p-2 hover:bg-gray-200 transition duration-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
    
}