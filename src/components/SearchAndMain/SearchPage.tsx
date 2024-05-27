import ParametersInput from "./ParametersInput";
import ParametersInputMotorcycles from "./ParametersInputMotorcycles";
import ParametersInputDeliveryVans from "./ParametersInputDeliveryVans";
import ParametersInputTrucks from "./ParametersInputTrucks";
import ParametersInputConstructionMachinery from "./ParametersInputConstructionMachinery";
import ParametersInputTrailers from "./ParametersInputTrailers";
import ParametersInputAgriculturalMachinery from "./ParametersInputAgriculturalMachinery";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import OfferElement from "../Other/OfferElement";
import PaginationButton from "../Other/PaginationButton";

interface IOffer {
    car?: {
        photos: string[];
        title: string;
        price?: number;
        year: number;
    },
    motorcycle?: {
        photos: string[];
        title: string;
        price?: number;
        year: number;
    },
    id: string;
    user_email: string;
    _id?: string;
    end?: string;
}

export default function SearchPage() {
    const [offerData, setOfferData] = useState<IOffer[] | null>(null);
    const [numberOfPages, setNumberOfPages] = useState<number>(0);
    const [pageArray, setPageArray] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [nextPage, setNextPage] = useState<boolean>(false);

    const url = window.location.href;
    const category = url.split("/")[4].split("?")[0];
    const searchParams = url.split("?")[1]?.split("/")[0] || "";
    const currentPage = parseInt(url.split("?")[1]?.split("/")[1] || "1", 10);

    const maxVisiblePages = 10;

    const generatePageArray = (numberOfPages: number, currentPage: number) => {
        const pageArray = [];
        if (numberOfPages <= maxVisiblePages) {
            for (let i = 1; i <= numberOfPages; i++) {
                pageArray.push(i);
            }
        } else {
            if (currentPage <= maxVisiblePages / 2) {
                for (let i = 1; i <= maxVisiblePages; i++) {
                    pageArray.push(i);
                }
            } else if (currentPage >= numberOfPages - maxVisiblePages / 2) {
                for (let i = numberOfPages - maxVisiblePages + 1; i <= numberOfPages; i++) {
                    pageArray.push(i);
                }
            } else {
                for (let i = currentPage - Math.floor(maxVisiblePages / 2); i <= currentPage + Math.floor(maxVisiblePages / 2); i++) {
                    pageArray.push(i);
                }
            }
        }
        return pageArray;
    };

    const fetchData = async (pageNum: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${category}/search/${category === "auction" ? pageNum - 1 : pageNum}?${searchParams}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
            });
            const data = await response.json();

            if (data.data.number_of_pages === 0) {
                setOfferData([]);
                setNumberOfPages(0);
                setPageArray([]);
            } else if (data.data.data.length > 0) {
                setOfferData(data.data.data);
                setNumberOfPages(data.data.number_of_pages);
                setPageArray(generatePageArray(data.data.number_of_pages, currentPage));


                if (category === "auction") {
                    if (data.data.data.length === 10) {
                        setNextPage(true);
                    } else {
                        setNextPage(false);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [url]);

    if (isLoading) {
        return (
            <div className="offer-page bg-gray-100 flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold text-center p-4 bg-gray-400 shadow-md border width-100% rounded-md">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="search-page">
            <div className="search-page-parameters bg-gray-100 p-4">
                <div className="search-page-parameters-title">
                    <h2 className="text-2xl font-bold mb-4">Search parameters</h2>
                </div>
                <div className="search-page-parameters-input">
                    {category === "cars" &&
                        <ParametersInput showAllFields={true} buyNowOrBid="buyNow" searchParameters={searchParams}
                                         reloadOffers={fetchData}/>}
                    {category === "auction" &&
                        <ParametersInput showAllFields={true} buyNowOrBid="bid" searchParameters={searchParams}
                                         reloadOffers={fetchData}/>}
                    {category === "motorcycles" &&
                        <ParametersInputMotorcycles showAllFields={true} searchParameters={searchParams}
                                                    reloadOffers={fetchData}/>}
                    {category === "delivery-vans" &&
                        <ParametersInputDeliveryVans showAllFields={true} searchParameters={searchParams}/>}
                    {category === "trucks" &&
                        <ParametersInputTrucks showAllFields={true} searchParameters={searchParams}/>}
                    {category === "construction-machinery" &&
                        <ParametersInputConstructionMachinery showAllFields={true} searchParameters={searchParams}/>}
                    {category === "trailers" &&
                        <ParametersInputTrailers showAllFields={true} searchParameters={searchParams}/>}
                    {category === "agricultural-machinery" &&
                        <ParametersInputAgriculturalMachinery showAllFields={true} searchParameters={searchParams}/>}
                </div>
            </div>
            <div className="search-page-offers bg-gray-100 p-4">
                <div className="search-page-offers-title">
                    <h2 className="text-2xl font-bold mb-4">Offers</h2>
                </div>
                <div className="search-page-offers-list gap-4">
                    {offerData && offerData.map((offer: IOffer) => (
                        <Link to={`/${category}/offer/${offer.id ? offer.id : offer._id}`}
                              key={offer.id ? offer.id : offer._id} className="">
                            {offer.car ? (
                                <OfferElement
                                    image={offer.car.photos[0] || ""}
                                    title={offer.car.title || ""}
                                    price={offer.car.price || 0}
                                    year={offer.car.year || 0}
                                    auctionEnd={offer.end || ""}
                                    offerId={offer.id ? offer.id : offer._id}
                                />
                            ) : offer.motorcycle ? (
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
                    ))}
                    {offerData && offerData.length === 0 && (
                        <h1 className="text-2xl font-bold text-center p-4 bg-gray-400 shadow-md border width-100% rounded-md">No
                            offers found</h1>
                    )}
                </div>
            </div>
            <div className="search-page-pagination pt-3 pb-3 shadow-md">
                {(offerData && offerData.length !== 0 && numberOfPages > 1 && category !== "auction") ? (
                    <div className="search-page-pagination-buttons">
                        {currentPage > 1 && (
                            <Link
                                to={`/search/${category}?${searchParams}/${currentPage - 1}`}
                                className="form-button border-2 rounded p-2 mr-2 hover:bg-gray-200 transition duration-300"
                                onClick={() => {
                                    fetchData(currentPage - 1);
                                    window.scrollTo(0, 0);
                                }}
                            >
                                Previous
                            </Link>
                        )}
                        {pageArray.map((page) => (
                            <PaginationButton
                                key={page}
                                page={page}
                                isActive={page === currentPage}
                                link={`/search/${category}?${searchParams}/${page}`}
                                fetchOffers={fetchData}
                            />
                        ))
                        }
                        {(currentPage < numberOfPages) && (
                            <Link
                                to={`/search/${category}?${searchParams}/${currentPage + 1}`}
                                className="form-button border-2 rounded p-2 hover:bg-gray-200 transition duration-300"
                                onClick={() => {
                                    fetchData(currentPage + 1);
                                    window.scrollTo(0, 0);
                                }}
                            >
                                Next
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="search-page-pagination-buttons">
                        {category === "auction" && nextPage && (
                            <Link
                                to={`/search/${category}?${searchParams}/${currentPage + 1}`}
                                className="form-button border-2 rounded p-2 hover:bg-gray-200 transition duration-300"
                                onClick={() => {
                                    fetchData(currentPage + 1);
                                    window.scrollTo(0, 0);
                                }}
                            >
                                Next
                            </Link>

                        )}
                        {category === "auction" && !nextPage && currentPage >= 1 && (
                            <Link
                                to={`/search/${category}?${searchParams}/${currentPage - 1}`}
                                className="form-button border-2 rounded p-2 hover:bg-gray-200 transition duration-300"
                                onClick={() => {
                                    fetchData(currentPage - 1);
                                    window.scrollTo(0, 0);
                                }}
                            >
                                Previous
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
