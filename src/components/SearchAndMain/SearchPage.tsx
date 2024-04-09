import ParametersInput from "./ParametersInput";
import ParametersInputMotorcycles from "./ParametersInputMotorcycles";
import ParametersInputDeliveryVans from "./ParametersInputDeliveryVans";
import ParametersInputTrucks from "./ParametersInputTrucks";
import ParametersInputConstructionMachinery from "./ParametersInputConstructionMachinery";
import ParametersInputTrailers from "./ParametersInputTrailers";
import ParametersInputAgriculturalMachinery from "./ParametersInputAgriculturalMachinery";
import React from "react";
import OfferElement from "../Other/OfferElement";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PaginationButton from "../Other/PaginationButton";

interface IAuction {
  isActive: boolean;
  currentBid: number;
  numberOfBids: number;
  sellerReserve: number;
  endDate: string;
}


interface IOffer {
  data:[
    {
      car?: {
        photos: string[];
        title: string;
        price?: number;
        // auction?: IAuction;
        year: number;
      
      },
      motorcycle?:{
        photos: string[];
        title: string;
        price?: number;
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
    const currentPage = url.split("?")[1].split("/")[1];

    const [offerData, setOfferData] = useState<IOffer[] | null>(null);
    const [numberOfPages, setNumberOfPages] = useState<number>(0);
    const [pageArray, setPageArray] = useState<number[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    

    const handleNextPage = async () => {
      window.location.href = `${process.env.REACT_APP_FRONT_SEARCH_ENDPOINT}/${category}?${searchParams}/${parseInt(currentPage) + 1}`;
    }

    const handlePreviousPage = () => {
      if (parseInt(currentPage) > 1) {
        window.location.href = `${process.env.REACT_APP_FRONT_SEARCH_ENDPOINT}/${category}?${searchParams}/${parseInt(currentPage) - 1}`;
      }
    }

    const handlePageChange = (page: number) => {
      window.location.href = `${process.env.REACT_APP_FRONT_SEARCH_ENDPOINT}/${category}?${searchParams}/${page}`;
    }

    const maxVisiblePages = 10;

    const generatePageArray = (numberOfPages: number) => {
      const pageArray = [];
      if (numberOfPages <= maxVisiblePages) {
        for (let i = 1; i <= numberOfPages; i++) {
          pageArray.push(i);
        }
      } else {
        if (parseInt(currentPage) <= maxVisiblePages / 2) {
          for (let i = 1; i <= maxVisiblePages; i++) {
            pageArray.push(i);
          }
        } else if (parseInt(currentPage) >= numberOfPages - maxVisiblePages / 2) {
          for (let i = numberOfPages - maxVisiblePages + 1; i <= numberOfPages; i++) {
            pageArray.push(i);
          }
        } else {
          for (let i = parseInt(currentPage) - maxVisiblePages / 2; i <= parseInt(currentPage) + maxVisiblePages / 2; i++) {
            pageArray.push(i);
          }
        }
      }
      return pageArray;
    };

    const fetchData = async () => {
      // const paramPairs = searchParams.split("&");
      // const decodedSearchParameters = paramPairs.reduce((acc: any, pair: string) => {
      //   const [key, value] = pair.split("=");
      //   const thisKey = decodeURIComponent(key);
    
      //   if (
      //     ["price_min", "price_max", "year_min", "year_max", "mileage_min", "mileage_max", "engine_capacity_min", "engine_capacity_max", "power_min", "power_max", "doors", "seats"].includes(thisKey)
      //   ) {
      //     acc[thisKey] = parseInt(decodeURIComponent(value), 10);
      //   } else if (["lat", "lng", "radius"].includes(thisKey)) {
      //     acc[thisKey] = parseFloat(decodeURIComponent(value));
      //   } else {
      //     if (value) {
      //       acc[thisKey] = decodeURIComponent(value.replace(/\+/g, ' '));
      //     }
      //   }
    
      //   return acc;
      // }, {});
    
      // decodedSearchParameters["location"] = {
      //   type: "Point",
      //   coordinates: [decodedSearchParameters["lng"], decodedSearchParameters["lat"]],
      // };
      // delete decodedSearchParameters["lat"];
      // delete decodedSearchParameters["lng"];
      // decodedSearchParameters["distance"] = decodedSearchParameters["radius"];
      // delete decodedSearchParameters["radius"];

      // console.log(decodedSearchParameters["location"]);
      // if (decodedSearchParameters["location"].coordinates[0] === undefined && decodedSearchParameters["location"].coordinates[1] === undefined) {
      //   delete decodedSearchParameters["location"];
      //   delete decodedSearchParameters["distance"];
      // }
    
      try {
        // const filters = Object.keys(decodedSearchParameters)
        // .map((key) => `${key}=${encodeURIComponent(decodedSearchParameters[key])}`)
        // .join("&");
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${category}/search/${currentPage}?${searchParams}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });
        const data = await response.json();

        if (data.data.number_of_pages === 0) {
          setIsLoading(false);
          setOfferData([]);
          setNumberOfPages(0);
          setPageArray([]);
          setIsLoading(false);
        }
        else if (data.data.data.length > 0) {
          setIsLoading(false);
          setOfferData(data.data.data);
          setNumberOfPages(data.data.number_of_pages);
          setPageArray(generatePageArray(data.data.number_of_pages));
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    useEffect(() => {
      fetchData();
    }
    , []);

    if (isLoading){
      return(
        <div className="offer-page bg-gray-100 flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold text-center p-4 bg-gray-400 shadow-md border width-100% rounded-md"
                >Loading...</h1>
        </div>
      )
    }

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
          <div className="search-page-offers bg-gray-100 p-4">
            <div className="search-page-offers-title">
              <h2 className="text-2xl font-bold mb-4">Offers</h2>
            </div>
            <div className="search-page-offers-list gap-4">
              {offerData && offerData.map((offer: any) => (
                <Link to={`/${category}/offer/${offer.id}`} key={offer.id} className="">
                  <OfferElement
                    image={offer.car.photos[0]}
                    title={offer.car.title}
                    price={offer.car.price}
                    auction={offer.car.auction}
                    year={offer.car.year}
                  />
                </Link>
              ))}
              {offerData && offerData.length === 0 && (
                <h1 className="text-2xl font-bold text-center p-4 bg-gray-400 shadow-md border width-100% rounded-md"
                >No offers found</h1>
              )}
            </div>
          </div>
          <div className="search-page-pagination pt-3 pb-3 shadow-md">
          {offerData && offerData.length!==0 && numberOfPages>1 && <div className="search-page-pagination-buttons">
            {currentPage !== "1" && (
              <button
                onClick={handlePreviousPage}
                className="form-button border-2 rounded p-2 hover:bg-gray-200 transition duration-300 mr-2"
              >
                Previous
              </button>
            )}
            {pageArray.map((page) => (
              <PaginationButton
                key={page}
                page={page}
                isActive={page.toString() === currentPage}
                handleClick={() => handlePageChange(page)}
              />
            ))}
            {currentPage !== numberOfPages.toString() && (
              <button
                onClick={handleNextPage}
                className="form-button border-2 rounded p-2 hover:bg-gray-200 transition duration-300"
              >
                Next
              </button>
            )}
          </div>
      }</div>
      </div>
    );
    
}