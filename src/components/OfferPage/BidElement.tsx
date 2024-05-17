import React, {useState, useEffect} from "react";

interface BidElementProps {
    endDate: Date;
    offerId: string;
    startDate: Date;
}

export default function BidElement(props: BidElementProps) {
    const [bidValue, setBidValue] = useState("");
    const [timeLeft, setTimeLeft] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [bids, setBids] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [lastBidder, setLastBidder] = useState<string>("");
    const [user, setUser] = useState<any>();
    const [joined, setJoined] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PROFILE_LOGIN_ENDPOINT}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
            });
            if (response.ok) {
                const res = await response.json();
                setLoggedIn(true)
                return res.data?.data;
            }
        } catch (e) {
            setLoggedIn(false);
        }
    };

    useEffect(() => {
        fetchData().then((data) => {
                if (data) {
                    setUser(data.email);
                }
            }
        );

        if (props.offerId && !ws && user) {

            const webSocketUrl = `${process.env.REACT_APP_AUCTIONS_WS_ENDPOINT}/${user}`;
            const newWs = new WebSocket(webSocketUrl);


            newWs.onmessage = (event) => {
                if (event.data.includes("offer") && !event.data.includes("status")) {
                    const data = JSON.parse(event.data);
                    setPrice(data.offer);
                    setBids((prevState) => prevState + 1);
                    setLastBidder(data.sender)
                }

                if (event.data.includes("status")) {
                    const data = JSON.parse(event.data);
                    if (data.offer.sender == user) {
                        alert("You won the auction!")
                    }
                }
            }


            newWs.onclose = () => {
            };

            setWs(newWs);
        }

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [ws, user, props.offerId]);

    useEffect(() => {


        const fetchData = async (i: number) => {
            try {
                fetch(`${process.env.REACT_APP_AUCTIONS_ENDPOINT}/offers/${props.offerId}/${i}`).then(
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
    }, [props.offerId])


    const handleBidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBidValue(event.target.value);
    };

    const handlePlaceBid = () => {
        if (isNaN(parseInt(bidValue)) || parseInt(bidValue) <= 0 || parseInt(bidValue) < price) {
            setErrorMessage("Please enter a valid number");
            return;
        }

        if (!joined) {
            ws?.send(JSON.stringify({
                    options: "join",
                    destination: props.offerId,
                })
            );
        }

        ws?.send(JSON.stringify({
            options: "bid",
            destination: props.offerId,
            offer: {
                offer: parseInt(bidValue),
            },
        }));

        setBidValue("");
        setErrorMessage("");
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const date = props.startDate.getTime() * 1000;
            if (date > new Date().getTime()) {
                setTimeLeft("Auction not started yet (starts at " + new Date(date).toLocaleString() + ")");
                return;
            }

            const now = new Date().getTime();
            const distance = props.endDate.getTime() * 1000 - now;

            if (distance < 0) {
                setTimeLeft("Auction ended")

            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s `);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div className="bid-element border shadow-md bg-zinc-50">
            <div className="bid-element-info">
                <h2 className="font-bold">Bids</h2>
                <div className="bid-element-info-price mt-2 text-sm">
                    <h3 className="text-neutral-500">Current price:</h3>
                    <p className="text-3xl">{price} PLN</p>
                    <p className="text-xs text-neutral-500">
                        {lastBidder !== user ? (
                            <span>
                                Last Bid by: {`${lastBidder?.substring(0, 2)}...${lastBidder?.split("@")[0].slice(-2)}`}
                            </span>
                        ) : (
                            <span>Your Bid</span>
                        )}
                    </p>
                    <h3 className="text-neutral-500 mt-1">Amount of bids:</h3>
                    <p>{bids}</p>
                </div>
                {timeLeft !== "Auction ended" && timeLeft.split(" ")[0] !== "Auction" && loggedIn && (
                    <div className="bid-element-info-form mt-2">
                        <input
                            type="text"
                            placeholder="Your Bid"
                            value={bidValue}
                            onChange={handleBidChange}
                        />
                        <p className="text-red-500 text-sm">{errorMessage}</p>

                    </div>
                )}
                {!loggedIn && (
                    <div className="bid-element-info-form mt-2">
                        <p className="text-red-500 text-sm">Please log in to place a bid</p>
                    </div>
                )}
                <div className="bid-element-info-time mt-1">
                    <p>{timeLeft} {timeLeft.split(" ")[0] !== "Auction" && "left"}</p>
                </div>
                {timeLeft !== "Auction ended" && timeLeft.split(" ")[0] !== "Auction" && loggedIn && (
                    <button onClick={handlePlaceBid}
                            className="mt-2 p-1 bg-teal-500 text-white rounded-md hover:bg-teal-600 mb-1">
                        Place Bid
                    </button>
                )}

            </div>
        </div>
    );
}
