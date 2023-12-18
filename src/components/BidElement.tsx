import React, { useState, useEffect } from "react";

interface BidElementProps {
  isActive: boolean;
  currentBid: number;
  numberOfBids: number;
  sellerReserve: number;
  endDate: Date;
}

export default function BidElement(props: BidElementProps) {
  const [bidValue, setBidValue] = useState("");
  const [timeLeft, setTimeLeft] = useState<string>("");

  const handleBidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBidValue(event.target.value);
  };

  const handlePlaceBid = () => {
    console.log(`Placing bid: ${bidValue} PLN`);
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const endDate = props.endDate.getTime();
      const timeDifference = endDate - now;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );

        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft("Auction has ended");
      }
    };

    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 60000);

    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [props.endDate]);

  return (
    <div className="bid-element">
      <div className="bid-element-info">
        <div className="Seller reserve">
          <h3>Seller reserve:</h3>
          <p>{props.sellerReserve}</p>
        </div>
        <div className="bid-element-info-time">
          <h3>Time left:</h3>
          <p>{timeLeft}</p>
        </div>
        <div className="bid-element-info-bids">
          <h3>Bids:</h3>
          <p>{props.numberOfBids}</p>
        </div>
        <div className="bid-element-info-bid">
          <h3>Current bid:</h3>
          <p>{props.currentBid}</p>
        </div>
        <div className="bid-element-info-form">
          <input
            type="text"
            placeholder="Bid"
            value={bidValue}
            onChange={handleBidChange}
          />
          <button onClick={handlePlaceBid}>Place bid</button>
        </div>
      </div>
    </div>
  );
}
