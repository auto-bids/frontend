import React from 'react';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className='header'>
            <Link to='/'>
                <button className='home-button'>auto-bids</button>
            </Link>
            <div className='buy-now-or-bid'>
                <button className='buy-now-button'>Buy Now</button>
                <button className='bid-button'>Auctions</button>
            </div>
            <Link to='/account'>
                <button className='account'>Your account</button>
            </Link>
            <button className='new-listing'>New Listing</button>
        </div>
    )
}