import React, {useEffect, useState} from "react";
import ParametersInput from "./ParametersInput";
import ParametersInputMotorcycles from "./ParametersInputMotorcycles";
import OfferElement from "../Other/OfferElement";
import {Link} from "react-router-dom";
import ComponentUnderConstruction from "../Other/ComponentUnderConstruction";

interface IAuction {
    isActive: boolean;
    currentBid: number;
    numberOfBids: number;
    sellerReserve: number;
    endDate: string;
}

interface IOffer {
    id: string;
    _id?: string;
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
    motorcycle?: {
        photos: string[];
        title: string;
        price?: number;
        auction?: IAuction;
        year: number;
    };
    auctionEnd?: string
    end?: string
    offers?: any[]
}

export default function MainPage() {
    const [selectedCategory, setSelectedCategory] = useState("cars");
    const [showAllFields, setShowAllFields] = useState(false);
    const [buyNowOrBid, setBuyNowOrBid] = useState("buyNow");
    const [offerData, setOfferData] = useState<IOffer[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOffers = async (type: string) => {
        let initialPage = 1;
        if (type === "auction") {
            initialPage = 0;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${type}/search/${initialPage}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
            });

            const data = await response.json();

            if (data.data.data.length === 10) {
                setOfferData(data.data.data.slice(0, data.data.data.length - 1));
            } else {
                setOfferData(data.data.data);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            let data;
            if (buyNowOrBid === "bid") {
                data = await import("../../testJsons/testBidOffer.json");
                if (data.default.auction) {
                    await fetchOffers("auction")
                }
                return;
            }
            switch (selectedCategory) {
                case "cars":
                    await fetchOffers("cars");
                    break;
                case "motorcycles":
                    await fetchOffers("motorcycles");
                    break;
                case "delivery-vans":
                    data = await import("../../testJsons/testOfferDeliveryVans.json");
                    break;
                case "trucks":
                    data = await import("../../testJsons/testOfferTrucks.json");
                    break;
                case "construction-machinery":
                    data = await import("../../testJsons/testOfferConstructionMachinery.json");
                    break;
                case "trailers":
                    data = await import("../../testJsons/testOfferTrailers.json");
                    break;
                case "agricultural-machinery":
                    data = await import("../../testJsons/testOfferAgriculturalMachinery.json");
                    break;
                default:
                    data = null;
            }

            if (data && selectedCategory !== "cars" && selectedCategory !== "motorcycles") {
                if (buyNowOrBid === "buyNow") {
                    const {id, photos, title, price, year} = data.default;
                    setOfferData([{id, image: photos.length > 0 ? photos[0] : "", title, price, year}]);
                }
            }
        };

        fetchData().then();
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

    const handleBuyNowButtonClick = () => {
        setBuyNowOrBid("buyNow");
        setSelectedCategory("cars");
        setShowAllFields(false);
    }

    return (
        <div className="main-page bg-gray-100">
            <div className="main-page-buy-now-or-bid flex mt-2 pl-4 bg-white">
                <button onClick={() => handleBuyNowButtonClick()}
                        className={`buy-now-button p-2 rounded border mr-5  ${buyNowOrBid === 'buyNow' ? 'bg-teal-500 text-white hover:bg-teal-600 transition duration-300' : 'bg-gray-200 hover:bg-gray-300 transition duration-300'}`}>Buy
                    Now
                </button>
                <button onClick={() => handleBidButtonClick()}
                        className={`bid-button p-2 rounded border ${buyNowOrBid === 'bid' ? 'bg-teal-500 text-white hover:bg-teal-600 transition duration-300' : 'bg-gray-200 hover:bg-gray-300 transition duration-300'}`}>Bid
                </button>
            </div>


            {buyNowOrBid !== "bid" && (
                <div className="main-page-choose-category bg-white p-4">
                    <div className="main-page-choose-category-buttons flex flex-wrap justify-center ">
                        {["cars", "motorcycles", "delivery-vans", "trucks", "construction-machinery", "trailers", "agricultural-machinery"].map((categoryName) => (
                            <button
                                key={categoryName}
                                onClick={() => handleCategoryChange(categoryName)}
                                className={`category-button ${
                                    selectedCategory === categoryName
                                        ? 'bg-teal-500 text-white hover:bg-teal-600 transition duration-300'
                                        : 'bg-gray-200 text-black hover:bg-gray-300 transition duration-300'
                                } px-3 py-1 rounded m-2 ${
                                    categoryName === "delivery-vans" || 
                                    categoryName === "trucks" || 
                                    categoryName === "construction-machinery" || 
                                    categoryName === "trailers" || 
                                    categoryName === "agricultural-machinery" 
                                        ? 'disabled:bg-gray-400 disabled:text-gray-600 cursor-not-allowed'
                                        : ''
                                }`}
                                disabled={
                                    categoryName === "delivery-vans" || 
                                    categoryName === "trucks" || 
                                    categoryName === "construction-machinery" || 
                                    categoryName === "trailers" || 
                                    categoryName === "agricultural-machinery"
                                }
                                title={
                                    categoryName === "delivery-vans" || 
                                    categoryName === "trucks" || 
                                    categoryName === "construction-machinery" || 
                                    categoryName === "trailers" || 
                                    categoryName === "agricultural-machinery" 
                                        ? 'Under construction' 
                                        : ''
                                }
                            >
                                {categoryName}
                            </button>
                        
                        ))}
                    </div>
                </div>
            )}

            <div className="main-page-parameters-input">
                {selectedCategory === "cars" &&
                    <ParametersInput showAllFields={showAllFields} buyNowOrBid={buyNowOrBid} searchParameters={null}/>}
                {selectedCategory === "motorcycles" &&
                    <ParametersInputMotorcycles showAllFields={showAllFields} searchParameters={null}/>}
                {selectedCategory === "delivery-vans" &&
                    // <ParametersInputDeliveryVans showAllFields={showAllFields} searchParameters={null}/>}
                    <ComponentUnderConstruction />}
                {selectedCategory === "trucks" &&
                    // <ParametersInputTrucks showAllFields={showAllFields} searchParameters={null}/>}
                    <ComponentUnderConstruction />}
                {selectedCategory === "construction-machinery" &&
                    // <ParametersInputConstructionMachinery showAllFields={showAllFields} searchParameters={null}/>}
                    <ComponentUnderConstruction />}
                {selectedCategory === "trailers" &&
                    // <ParametersInputTrailers showAllFields={showAllFields} searchParameters={null}/>}
                    <ComponentUnderConstruction />}
                {selectedCategory === "agricultural-machinery" &&
                    // <ParametersInputAgriculturalMachinery showAllFields={showAllFields} searchParameters={null}/>}
                    <ComponentUnderConstruction />}
            </div>

            <button className="show-all-fields mb-4 p-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-300"
                    onClick={() => setShowAllFields(!showAllFields)}>
                {showAllFields ? "Hide additional fields" : "Show additional fields"}
            </button>
            {!isLoading ? (
                <div className="promoted-offers mt-4 pb-3">
                    <h1 className="text-2xl font-bold mb-2">Promoted Offers</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {offerData && offerData.map((offer) => {
                            offer.id = offer.id || offer._id as string;
                            return (
                            <Link key={offer.id} to={`/${buyNowOrBid==="bid" ? 'auction' : selectedCategory}/offer/${offer.id}`} className="block p-4">
                                {selectedCategory === "cars" && offer.car ? (
                                    <OfferElement
                                        image={offer.car.photos[0] || ""}
                                        title={offer.car.title || ""}
                                        price={offer.car.price || 0}
                                        auctionEnd={offer.end}
                                        offerId={offer.id}
                                        year={offer.car.year || 0}
                                        offers={offer.offers}
                                    />
                                ) : selectedCategory === "motorcycles" && offer.motorcycle ? (
                                    <OfferElement
                                        image={offer.motorcycle.photos[0] || ""}
                                        title={offer.motorcycle.title || ""}
                                        price={offer.motorcycle.price || 0}
                                        year={offer.motorcycle.year || 0}

                                    />
                                ) : (
                                    <div>No data available</div>
                                )}
                            </Link>
                        )})}
                    </div>
                </div>
            ) : (
                <div className="main-page flex justify-center items-center">
                    <h1 className="text-2xl font-bold text-center p-4 bg-gray-400 shadow-md border width-100% rounded-md">Loading...</h1>
                </div>
            )}
        </div>
    )
}