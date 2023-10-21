import React from 'react';

export default function Header() {
    return (
        <div className='header'>
            <button className='home-button'>auto-bids</button>
            <div className='buy-now-or-bid'>
                <button className='buy-now-button'>Buy Now</button>
                <button className='bid-button'>Auctions</button>
            </div>
            <button className='account'>Your account</button>
            <button className='new-listing'>New Listing</button>
        </div>
    )
}