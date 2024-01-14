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
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface IAuction {
  isActive: boolean;
  currentBid: number;
  numberOfBids: number;
  sellerReserve: number;
  endDate: string;
}

interface IOffer {
  id: string;
  image: string;
  title: string;
  price?: number;
  auction?: IAuction;
  year: number;
};

interface SearchParams {
  category: string | undefined;
  [key: string]: string | undefined;
}

export default function SearchPage() {
    const { category } = useParams<SearchParams>();
    const searchParams = new URLSearchParams(window.location.search).toString();
    // const fetchData = async () => {
    //   const queryParams = new URLSearchParams(window.location.search);
    //   try {
    //     const response = await fetch(`http://localhost:3000/api/search?${queryParams.toString()}`);
    //     const data = await response.json();
    //     console.log(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    //just for testing
    const [offerData, setOfferData] = useState<IOffer[] | null>(null);
    useEffect(() => {
      const fetchData = async () => {
        let data: any[] = [];
        data[1] = await import("../testJsons/testOffer.json");
        data[2] = await import("../testJsons/testOfferMotorcycles.json");
        data[3] = await import("../testJsons/testOfferDeliveryVans.json");
        data[4] = await import("../testJsons/testOfferTrucks.json");
        data[5] = await import("../testJsons/testOfferConstructionMachinery.json");
        data[6] = await import("../testJsons/testOfferTrailers.json");
        data[7] = await import("../testJsons/testOfferAgriculturalMachinery.json");
        data[8] = await import("../testJsons/testBidOffer.json")
        let offerData: IOffer[] = [];
        for (let i = 1; i < 8; i++) {
          const { id, photos, title, price, year } = data[i].default;
          offerData.push({ id, image: photos.length > 0 ? photos[0] : "", title, price, year });
        }
        const { id, photos, title, auction, year } = data[8].default;
        offerData.push({ id, image: photos.length > 0 ? photos[0] : "", title, auction, year });
        setOfferData(offerData);
      };
      fetchData();
      }, []);

    return (
      <div className="search-page">
        <div className="search-page-parameters">
          <div className="search-page-parameters-title">
            <h2>Search parameters</h2>
          </div>
          <div className="search-page-parameters-input">
            {category === "cars" && <ParametersInput showAllFields={true} buyNowOrBid="buyNow" searchParameters= {searchParams} />}
            {category === "cars-bids" && <ParametersInput showAllFields={true} buyNowOrBid="bid" searchParameters={searchParams} />}
            {category === "motorcycles" && <ParametersInputMotorcycles showAllFields={true} />}
            {category === "delivery-vans" && <ParametersInputDeliveryVans showAllFields={true} />}
            {category === "trucks" && <ParametersInputTrucks showAllFields={true} />}
            {category === "construction-machinery" && <ParametersInputConstructionMachinery showAllFields={true} />}
            {category === "trailers" && <ParametersInputTrailers showAllFields={true} />}
            {category === "agricultural-machinery" && <ParametersInputAgriculturalMachinery showAllFields={true} searchParameters={searchParams} />}
          </div>
        </div>
        <div className="search-page-offers">
          {category === "cars" && offerData && offerData[0] &&
            <Link to={`/offer-cars/offer/${offerData[0].id}`}>
              <OfferElement key={offerData[0].id} image={offerData[0].image} title={offerData[0].title} price={offerData[0].price} year={offerData[0].year} auction={offerData[0].auction} />
            </Link>
          }
          {category === "motorcycles" && offerData && offerData[1] &&
            <Link to={`/offer-motorcycles/${offerData[1].id}`}>
              <OfferElement key={offerData[1].id} image={offerData[1].image} title={offerData[1].title} price={offerData[1].price} year={offerData[1].year} />
            </Link>
          }
          {category === "delivery-vans" && offerData && offerData[2] &&
            <Link to={`/offer-delivery-vans/${offerData[2].id}`}>
              <OfferElement key={offerData[2].id} image={offerData[2].image} title={offerData[2].title} price={offerData[2].price} year={offerData[2].year} />
            </Link>
          }
          {category === "trucks" && offerData && offerData[3] &&
            <Link to={`/offer-trucks/${offerData[3].id}`}>
              <OfferElement key={offerData[3].id} image={offerData[3].image} title={offerData[3].title} price={offerData[3].price} year={offerData[3].year} />
            </Link>
          }
          {category === "construction-machinery" && offerData && offerData[4] &&
            <Link to={`/offer-construction-machinery/${offerData[4].id}`}>
              <OfferElement key={offerData[4].id} image={offerData[4].image} title={offerData[4].title} price={offerData[4].price} year={offerData[4].year} />
            </Link>
          }
          {category === "trailers" && offerData && offerData[5] &&
            <Link to={`/offer-trailers/${offerData[5].id}`}>
              <OfferElement key={offerData[5].id} image={offerData[5].image} title={offerData[5].title} price={offerData[5].price} year={offerData[5].year} />
            </Link>
          }
          {category === "agricultural-machinery" && offerData && offerData[6] &&
            <Link to={`/offer-agricultural-machinery/${offerData[6].id}`}>
              <OfferElement key={offerData[6].id} image={offerData[6].image} title={offerData[6].title} price={offerData[6].price} year={offerData[6].year} />
            </Link>
          }
          {category === "cars-bids" && offerData && offerData[7] &&
            <Link to={`/offer-cars/bid/${offerData[7].id}`}>
              <OfferElement key={offerData[7].id} image={offerData[7].image} title={offerData[7].title} price={offerData[7].price} year={offerData[7].year} auction={offerData[7].auction} />
            </Link>
          }
        </div>
      </div>
    );
}