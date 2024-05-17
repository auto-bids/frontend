import React, {useEffect, useState} from "react";
import OfferElement from "../Other/OfferElement";
import {Link} from "react-router-dom";
import EditOffer from "./EditOffer";

interface MyBidsProps {
    email: string;
}


export default function MyBids(props: MyBidsProps) {
    const [filteredAuctions, setFilteredAuctions] = useState<string[]>([]);
    const [allAuctions, setAllAuctions] = useState<string[]>([]);
    const [category, setCategory] = useState<string>("active");

    useEffect(() => {
        const fetchBids = async (i: number) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_AUCTIONS_ENDPOINT}joined/${props.email}/${i}`, {
                    credentials: "include",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                    },
                });
                if (response.ok) {
                    const res = await response.json();
                    if (res.data.data.length > 0) {
                        setAllAuctions((prevState) => [...prevState, ...res.data.data]);
                        if (res.data.data.length === 10) {
                            await fetchBids(i + 1)
                        }
                    }
                }
            } catch (error) {
                console.error("Error loading profile data:", error);
            }
        }

        fetchBids(0).then()
    }, []);

    useEffect(() => {

        if (category === "all") {
            setFilteredAuctions(allAuctions)
        } else {
            setFilteredAuctions(allAuctions.filter((auction: any) => {
                if (category === "active") {
                    return new Date(auction.end*1000) > new Date()
                } else {
                    return new Date(auction.end*1000) < new Date()
                }
            }))
        }

    }, [category, allAuctions])

    useEffect(() => {
        console.log(allAuctions)
    }, [allAuctions]);


    return (
        <>
            <select
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none text-center"
            >
                <option value="active">Active</option>
                <option value="ended">Ended</option>
                <option value="all">All</option>
            </select>
            <div className="account-offers-elements mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAuctions.map((offer: any, index) => {
                    return (
                        <div key={offer._id}
                             className={`border p-4 rounded bg-white ${index === filteredAuctions.length - 1 && filteredAuctions.length % 3 === 1 ? 'col-span-1 md:col-start-2 lg:col-start-2' : ''}`}>
                            <Link to={`/auction/offer/${offer._id}`} className="block rounded p-4">
                                <OfferElement
                                    image={offer.car.photos[0]}
                                    title={offer.car.title}
                                    price={offer.car.price}
                                    year={offer.car.year}
                                    auctionEnd={offer.car.auctionEnd}
                                    offerId={offer.id}
                                />
                            </Link>
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}
