import React from 'react';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className='header'>
            <Link to='/'>
                <button className='home-button'>auto-bids</button>
            </Link>
            <Link to='/account'>
                <button className='account'>Your account</button>
            </Link>
            <Link to='/new-listing'>
                <button className='new-listing'>New Listing</button>
            </Link>
            <Link to='/register'>
                <button className='register'>Register</button>
            </Link>
        </div>
    )
}