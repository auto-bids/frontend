import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Header(props: any) {

    useEffect(() => {
        // console.log("header reaload")
    },[props]);

    return (
        <div className='header'>
            <Link to='/'>
                <button className='home-button'>auto-bids</button>
            </Link>
            <Link to='/new-listing'>
                <button className='new-listing'>New Listing</button>
            </Link>
            {document.cookie==="isLoggedIn=true" ?
                <Link to='/account'>
                    <button className='account'>Your account</button>
                </Link>
                :
                <Link to='/register'>
                    <button className='register'>Register/Login</button>
                </Link>
            }
        </div>
    )
}