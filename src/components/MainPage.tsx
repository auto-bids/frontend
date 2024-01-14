import React, {useState} from "react";
import ParametersInput from "./ParametersInput";
import ParametersInputMotorcycles from "./ParametersInputMotorcycles";
import OfferElement from "./OfferElement";
import ParametersInputDeliveryVans from "./ParametersInputDeliveryVans";
import ParametersInputTrucks from "./ParametersInputTrucks";
import ParametersInputConstructionMachinery from "./ParametersInputConstructionMachinery";
import ParametersInputTrailers from "./ParametersInputTrailers";
import ParametersInputAgriculturalMachinery from "./ParametersInputAgriculturalMachinery";
import { useEffect } from "react";
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
    year: number;
    auction?: IAuction;
};

export default function MainPage() {
    const [selectedCategory, setSelectedCategory] = useState("cars");
    const [showAllFields, setShowAllFields] = useState(false);
    const [buyNowOrBid, setBuyNowOrBid] = useState("buyNow");

    //just for testing
    const [offerData, setOfferData] = useState<IOffer[] | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            let data;
            if (buyNowOrBid === "bid") {
                data = await import("../testJsons/testBidOffer.json");
                if (data.default.auction) {
                    const { id, photos, title, year, auction } = data.default;
                    setOfferData([{ id, image: photos.length > 0 ? photos[0] : "", title, year, auction }]);
                }
                return;
            }
            switch (selectedCategory) {
                case "cars":
                    data = await import("../testJsons/testOffer.json");
                    break;
                case "motorcycles":
                    data = await import("../testJsons/testOfferMotorcycles.json");
                    break;
                case "delivery-vans":
                    data = await import("../testJsons/testOfferDeliveryVans.json");
                    break;
                case "trucks":
                    data = await import("../testJsons/testOfferTrucks.json");
                    break;
                case "construction-machinery":
                    data = await import("../testJsons/testOfferConstructionMachinery.json");
                    break;
                case "trailers":
                    data = await import("../testJsons/testOfferTrailers.json");
                    break;
                case "agricultural-machinery":
                    data = await import("../testJsons/testOfferAgriculturalMachinery.json");
                    break;
                default:
                    data = null;
            }

            if (data) {
                if (buyNowOrBid === "buyNow") {
                    const { id, photos, title, price, year } = data.default;
                    setOfferData([{ id, image: photos.length > 0 ? photos[0] : "", title, price, year }]);
                }
            }
        };

        fetchData();
    }, [selectedCategory, buyNowOrBid]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setShowAllFields(false);
    }

    const handleBidButtonClick = () => {
        setBuyNowOrBid("bid");
        setSelectedCategory("cars");
        setShowAllFields(false);
    };

    return (
        <div className='main-page'>
            <div className='main-page-buy-now-or-bid'>
                <button onClick={()=> setBuyNowOrBid("buyNow")} className="buy-now-button">Buy now</button>
                <button onClick={()=> handleBidButtonClick()} className="bid-button">Bid</button>
            </div>
            {buyNowOrBid !== "bid" && (
            <div className="main-page-choose-category">
                <h1>Choose category</h1>
                <div className="main-page-choose-category-buttons">
                    <button onClick={() => handleCategoryChange("cars")}>cars</button>
                    <button onClick={() => handleCategoryChange("motorcycles")}>motorcycles</button>
                    <button onClick={() => handleCategoryChange("delivery-vans")}>delivery vans</button>
                    <button onClick={() => handleCategoryChange("trucks")}>trucks</button>
                    <button onClick={() => handleCategoryChange("construction-machinery")}>construction machinery</button>
                    <button onClick={() => handleCategoryChange("trailers")}>trailers</button>
                    <button onClick={() => handleCategoryChange("agricultural-machinery")}>agricultural machinery</button>
                </div>
            </div>
            )}
            <div className="main-page-parameters-input">
            {selectedCategory === "cars" && <ParametersInput showAllFields={showAllFields} buyNowOrBid={buyNowOrBid} searchParameters={null}/>}
            {selectedCategory === "motorcycles" && <ParametersInputMotorcycles showAllFields={showAllFields}/>}
            {selectedCategory === "delivery-vans" && <ParametersInputDeliveryVans showAllFields={showAllFields}/>}
            {selectedCategory === "trucks" && <ParametersInputTrucks showAllFields={showAllFields}/>}
            {selectedCategory === "construction-machinery" && <ParametersInputConstructionMachinery showAllFields={showAllFields} searchParameters={null}/>}
            {selectedCategory === "trailers" && <ParametersInputTrailers showAllFields={showAllFields}/>}
            {selectedCategory === "agricultural-machinery" && <ParametersInputAgriculturalMachinery showAllFields={showAllFields} searchParameters={null}/>}
            </div>
            <button className="show-all-fields" onClick={() => setShowAllFields(!showAllFields)}>{showAllFields ? "Hide additional fields" : "Show additional fields"}</button>
            {/* <a className="ad" href='http://weed.pl/' target="_blank" rel="noreferrer">
                <img src='/ad.jpeg' alt='offer' />
            </a> */}
            <div className="promoted-offers">
                <h1>Promoted Offers</h1>
                {offerData && buyNowOrBid ==="buyNow" && selectedCategory=="cars" && offerData.map((offer) => (
                    <Link key={offer.id} to={`/offer-${selectedCategory}/offer/${offer.id}`}>
                        <OfferElement key={offer.id} image={offer.image} title={offer.title} price={offer.price} year={offer.year} auction={offer.auction} />
                    </Link>
                ))}
                {offerData && buyNowOrBid ==="bid" && selectedCategory=="cars" && offerData.map((offer) => (
                    <Link key={offer.id} to={`/offer-${selectedCategory}/bid/${offer.id}`}>
                        <OfferElement key={offer.id} image={offer.image} title={offer.title} price={offer.price} year={offer.year} />
                    </Link>
                ))}
                {offerData && selectedCategory !== "cars" && offerData.map((offer) => (
                    <Link key={offer.id} to={`/offer-${selectedCategory}/${offer.id}`}>
                        <OfferElement key={offer.id} image={offer.image} title={offer.title} price={offer.price} year={offer.year} />
                    </Link>
                ))}
            </div>
        </div>
    )
}