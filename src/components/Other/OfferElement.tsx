import React, {useEffect} from "react";

interface IAuction {
    isActive: boolean;
    currentBid: number;
    numberOfBids: number;
    sellerReserve: number;
    endDate: string;
}

interface OfferElementProps {
    image: string;
    title: string;
    price?: number;
    auction?: IAuction;
    auctionEnd?: string
    year: number;
    offerId?: string;
    offers?: any[];
    main?: boolean;
}

export default function OfferElement(props: OfferElementProps) {
    const [price, setPrice] = React.useState<number>(0);
    const [bids, setBids] = React.useState<number>(0);
    const [lastBidder, setLastBidder] = React.useState<string>("");

    useEffect(() => {

        if (props.auctionEnd && props.main) {
            const fetchData = async (i: number) => {
                try {
                    fetch(`${process.env.REACT_APP_AUCTIONS_ENDPOINT}offers/${props.offerId}/${i}`).then(
                        response => response.json()
                    ).then(data => {
                        if (data.data.data !== null) {
                            const lastOffer = data.data.data[0]
                            if (i === 0) {
                                setPrice(lastOffer.offers.offer)
                                setLastBidder(lastOffer.offers.sender)
                            }
                            setBids((prevState) => prevState + data.data.data.length)
                            if (data.data.data.length === 10) {
                                fetchData(i + 1)
                            }
                        }

                    })
                } catch (e) {
                    console.error(e)
                }
            }

            fetchData(0)
        }
    }, [props.offerId])


    useEffect(() => {
        if (!props.main) {
            setPrice(props.offers && props.offers.length > 0 ? props.offers[props.offers.length - 1].offer : 0)
            setBids(props.offers ? props.offers.length : 0)
            setLastBidder(props.offers && props.offers.length > 0 ? props.offers[props.offers.length - 1].sender : "")
        }
    }, []);

    return (
        <div
            className={`offer-element bg-white ${window.innerWidth > 1000 ? 'grid' : 'flex'} ${window.innerWidth > 1000 ? 'grid-cols-3' : ''} border p-4 rounded-md mb-4 transition duration-300 hover:shadow-md `}>
            {window.innerWidth > 1000 ? (
                <>
                    <div className="offer-element-image col-span-1">
                        <img src={props.image} alt={props.title}
                             className="w-full h-auto object-cover sm:max-h-48 md:max-h-48 lg:max-h-64"/>
                    </div>
                    <div className="offer-element-details col-span-2 mt-4">
                        <h3 className="text-lg font-bold mb-2">{props.title}</h3>
                        <p className="text-gray-700">{props.year}</p>
                        {props.auctionEnd && (props.offers || props.main) ? (
                            <div className="offer-element-details-bid">
                                <p className="text-gray-700">End
                                    date: {new Date(parseInt(props.auctionEnd) * 1000).toLocaleString()} </p>
                                <p className="text-gray-700">Last Bid: <span
                                    className="font-bold">{bids > 0 ? price : "No bids yet"}</span> {bids > 0 &&
                                    ("by " + lastBidder.substring(0, 2) + "..." + lastBidder.split("@")[0].slice(-2))}
                                </p>
                                <p className="text-gray-700">Number of Bids: <span className="font-bold">{bids}</span>
                                </p>
                            </div>
                        ) : (
                            <p className="text-xl font-bold text-blue-500">{props.price}</p>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className="offer-element-image w-1/3 mr-4">
                        <img src={props.image} alt={props.title} className="w-full h-auto"/>
                    </div>
                    <div className="offer-element-details flex-grow">
                        <h3 className="text-lg font-bold mb-2">{props.title}</h3>
                        <p className="text-gray-700">{props.year}</p>
                        {props.auctionEnd && (props.offers || props.main) ? (
                            <div className="offer-element-details-bid">
                                <p className="text-gray-700">End
                                    date: {new Date(parseInt(props.auctionEnd) * 1000).toLocaleString()} </p>
                                <p className="text-gray-700">Last Bid: <span
                                    className="font-bold">{bids > 0 ? price : "No bids yet"}</span> {bids > 0 &&
                                    ("by " + lastBidder.substring(0, 2) + "..." + lastBidder.split("@")[0].slice(-2))}
                                </p>
                                <p className="text-gray-700">Number of Bids: <span className="font-bold">{bids}</span>
                                </p>
                            </div>
                        ) : (
                            <p className="text-xl font-bold text-blue-500">{props.price}</p>
                        )}

                    </div>
                </>
            )}
        </div>
    );


}
