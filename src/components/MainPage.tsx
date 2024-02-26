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
    image?: string;
    title?: string;
    price?: number;
    auction?: IAuction;
    year?: number;
    car?: {
        photos: string[];
        title: string;
        price?: number;
        auction?: IAuction;
        year: number;
    };
};

export default function MainPage() {
    const [selectedCategory, setSelectedCategory] = useState("cars");
    const [showAllFields, setShowAllFields] = useState(false);
    const [buyNowOrBid, setBuyNowOrBid] = useState("buyNow");
    //just for testing
    const [offerData, setOfferData] = useState<IOffer[] | null>(null);

    const fetchOffers = async (type: string) => {
        try {
            const response = await fetch(`http://localhost:4000/${type}/page/1`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
                body: JSON.stringify({}),
            });

            const data = await response.json();
            // console.log(data.data.data);
            setOfferData(data.data.data);
        } catch (error) {
            console.error(error);
        }
    }
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
                    fetchOffers("cars");
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

            if (data && selectedCategory !== "cars") {
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
        <div className="main-page">
            <div className="main-page-buy-now-or-bid flex mt-2 ml-4">
            <button onClick={() => setBuyNowOrBid("buyNow")} className={`buy-now-button p-2 rounded border mr-5 ${buyNowOrBid === 'buyNow' ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}>Buy Now</button>
            <button onClick={() => handleBidButtonClick()} className={`bid-button p-2 rounded border ${buyNowOrBid === 'bid' ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}>Bid</button>
            </div>


            {buyNowOrBid !== "bid" && (
            <div className="main-page-choose-category mt-2">
                <div className="main-page-choose-category-buttons flex flex-wrap justify-center ">
                {["cars","motorcycles","delivery-vans","trucks","construction-machinery","trailers","agricultural-machinery"].map((categoryName) => (
                    <button
                    key={categoryName}
                    onClick={() => handleCategoryChange(categoryName)}
                    className={`category-button ${
                        selectedCategory === categoryName
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-200 text-black'
                    } px-3 py-1 rounded m-2`}
                    >
                    {categoryName}
                    </button>
                ))}
                </div>
            </div>
            )}

            <div className="main-page-parameters-input mt-4">
            {selectedCategory === "cars" && <ParametersInput showAllFields={showAllFields} buyNowOrBid={buyNowOrBid} searchParameters={null} />}
            {selectedCategory === "motorcycles" && <ParametersInputMotorcycles showAllFields={showAllFields} searchParameters={null} />}
            {selectedCategory === "delivery-vans" && <ParametersInputDeliveryVans showAllFields={showAllFields} searchParameters={null} />}
            {selectedCategory === "trucks" && <ParametersInputTrucks showAllFields={showAllFields} searchParameters={null} />}
            {selectedCategory === "construction-machinery" && <ParametersInputConstructionMachinery showAllFields={showAllFields} searchParameters={null} />}
            {selectedCategory === "trailers" && <ParametersInputTrailers showAllFields={showAllFields} searchParameters={null} />}
            {selectedCategory === "agricultural-machinery" && <ParametersInputAgriculturalMachinery showAllFields={showAllFields} searchParameters={null} />}
            </div>

            <button className="show-all-fields mb-4 p-2 bg-gray-300 rounded" onClick={() => setShowAllFields(!showAllFields)}>
                {showAllFields ? "Hide additional fields" : "Show additional fields"}
            </button>
            <div className="promoted-offers mt-4">
                <h1 className="text-2xl font-bold mb-2">Promoted Offers</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {offerData && offerData[0].car && offerData.map((offer) => (
                            <Link key={offer.id} to={`/${selectedCategory}/offer/${offer.id}`} className="block p-4 transition duration-300 hover:shadow-md">
                                <OfferElement key={offer.id} image={offer.car?.photos[0] || ""} title={offer.car?.title || ""} price={offer.car?.price || 0} year={offer.car?.year || 0} auction={offer.car?.auction} />
                            </Link>
                        ))}
                        {/* {offerData && buyNowOrBid ==="buyNow" && selectedCategory==="cars" && offerData.map((offer) => (
                            <Link key={offer.id} to={`/${selectedCategory}/offer/${offer.id}`}>
                                <OfferElement key={offer.id} image={offer.image} title={offer.title} price={offer.price} year={offer.year} auction={offer.auction} />
                            </Link>
                        ))}
                        {offerData && buyNowOrBid ==="bid" && selectedCategory==="cars" && offerData.map((offer) => (
                            <Link key={offer.id} to={`/${selectedCategory}/bid/${offer.id}`}>
                                <OfferElement key={offer.id} image={offer.image} title={offer.title} price={offer.price} year={offer.year} />
                            </Link>
                        ))}
                        {offerData && selectedCategory !== "cars" && offerData.map((offer) => (
                            <Link key={offer.id} to={`/${selectedCategory}/${offer.id}`}>
                                <OfferElement key={offer.id} image={offer.image} title={offer.title} price={offer.price} year={offer.year} />
                            </Link>
                        ))} */}
                    </div>
            </div>
        </div>
    )
}