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

interface IOffer {
  id: string;
  image: string;
  title: string;
  price: number;
  year: number;
};

interface SearchParams {
  category: string | undefined;
  [key: string]: string | undefined;
}

export default function SearchPage() {
    const { category } = useParams<SearchParams>();

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
        let offerData: IOffer[] = [];
        for (let i = 1; i < 8; i++) {
          const { id, photos, title, price, year } = data[i].default;
          offerData.push({ id, image: photos.length > 0 ? photos[0] : "", title, price, year });
        }
        setOfferData(offerData);
      };
      fetchData();
      }, []);

    return (
        <div className='search-page'>
            {/* <ParametersInput showAllFields={true}/> */}
            {category === "cars" && <ParametersInput showAllFields={true} />}
            {category === "motorcycles" && <ParametersInputMotorcycles showAllFields={true} />}
            {category === "delivery-vans" && <ParametersInputDeliveryVans showAllFields={true} />}
            {category === "trucks" && <ParametersInputTrucks showAllFields={true} />}
            {category === "construction-machinery" && <ParametersInputConstructionMachinery showAllFields={true} />}
            {category === "trailers" && <ParametersInputTrailers showAllFields={true} />}
            {category === "agricultural-machinery" && <ParametersInputAgriculturalMachinery showAllFields={true} />}

            <div className="search-page-offers">
                <h1>Search Results</h1>
                {/* {offerData && offerData.map((offer) => {
                    return (
                        <OfferElement key={offer.id} image={offer.image} title={offer.title} price={offer.price} year={offer.year} />
                    )
                }
                )} */}
                {category === "cars" && offerData && offerData[0] && <OfferElement key={offerData[0].id} image={offerData[0].image} title={offerData[0].title} price={offerData[0].price} year={offerData[0].year} />}
                {category === "motorcycles" && offerData && offerData[1] && <OfferElement key={offerData[1].id} image={offerData[1].image} title={offerData[1].title} price={offerData[1].price} year={offerData[1].year} />}
                {category === "delivery-vans" && offerData && offerData[2] && <OfferElement key={offerData[2].id} image={offerData[2].image} title={offerData[2].title} price={offerData[2].price} year={offerData[2].year} />}
                {category === "trucks" && offerData && offerData[3] && <OfferElement key={offerData[3].id} image={offerData[3].image} title={offerData[3].title} price={offerData[3].price} year={offerData[3].year} />}
                {category === "construction-machinery" && offerData && offerData[4] && <OfferElement key={offerData[4].id} image={offerData[4].image} title={offerData[4].title} price={offerData[4].price} year={offerData[4].year} />}
                {category === "trailers" && offerData && offerData[5] && <OfferElement key={offerData[5].id} image={offerData[5].image} title={offerData[5].title} price={offerData[5].price} year={offerData[5].year} />}
                {category === "agricultural-machinery" && offerData && offerData[6] && <OfferElement key={offerData[6].id} image={offerData[6].image} title={offerData[6].title} price={offerData[6].price} year={offerData[6].year} />}
            </div>
        </div>
    )
}