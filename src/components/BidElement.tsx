import React from "react";

export default function BidElement() {
    return(
        <div className='bid-element'>
            <div className='bid-element-info'>
                <div className='Seller reserve'>
                    <h3>Seller reserve:</h3>
                    <p>1000 PLN</p>
                </div>
                <div className='bid-element-info-time'>
                    <h3>Time left:</h3>
                    <p>1 day 2 hours</p>
                </div>
                <div className='bid-element-info-bids'>
                    <h3>Bids:</h3>
                    <p>5</p>
                </div>
                <div className='bid-element-info-bid'>
                    <h3>Current bid:</h3>
                    <p>2000 PLN</p>
                </div>
                <div className='bid-element-info-form'>
                    <input type='text' placeholder='Bid' />
                    <button>Place bid</button>
                </div>
            </div>

        </div>
    );
}