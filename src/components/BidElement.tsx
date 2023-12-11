import React, { useState } from "react";

interface BidElementProps {
  sellerReserve: string;
  timeLeft: string;
  numberOfBids: number;
  currentBid: string;
}

export default function BidElement(props: BidElementProps) {
  const [bidValue, setBidValue] = useState("");

  const handleBidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBidValue(event.target.value);
  };

  const handlePlaceBid = () => {
    console.log(`Placing bid: ${bidValue} PLN`);
  };

  return (
    <div className='bid-element'>
      <div className='bid-element-info'>
        <div className='Seller reserve'>
          <h3>Seller reserve:</h3>
          <p>{props.sellerReserve}</p>
        </div>
        <div className='bid-element-info-time'>
          <h3>Time left:</h3>
          <p>{props.timeLeft}</p>
        </div>
        <div className='bid-element-info-bids'>
          <h3>Bids:</h3>
          <p>{props.numberOfBids}</p>
        </div>
        <div className='bid-element-info-bid'>
          <h3>Current bid:</h3>
          <p>{props.currentBid}</p>
        </div>
        <div className='bid-element-info-form'>
          <input
            type='text'
            placeholder='Bid'
            value={bidValue}
            onChange={handleBidChange}
          />
          <button onClick={handlePlaceBid}>Place bid</button>
        </div>
      </div>
    </div>
  );
}
