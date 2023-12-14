import ParametersInput from "./ParametersInput";
import React from "react";
import OfferElement from "./OfferElement";
import { useEffect, useState } from "react";

interface IOffer {
  id: string;
  image: string;
  title: string;
  price: number;
  year: number;
};


export default function SearchPage() {

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
            <ParametersInput showAllFields={true}/>
            <div className="promoted-offers">
                <h1>Search Results</h1>
                {offerData && offerData.map((offer) => {
                    return (
                        <OfferElement key={offer.id} image={offer.image} title={offer.title} price={offer.price} year={offer.year} />
                    )
                }
                )}
            </div>
        </div>
    )
}