import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='bg-neutral-900 text-white p-4'>
            <p className='text-center'>© 2023 - All Rights Reserved</p>
            <div className='flex justify-center space-x-4 mt-4'>
                <Link to='/privacy-policy'><button className='footer-button'>Privacy Policy</button></Link>
                <Link to='/terms-of-service'><button className='footer-button'>Terms of Service</button></Link>
                <Link to='/help'><button className='footer-button'>Help</button></Link>
                <Link to='/about-us'><button className='footer-button'>About Us</button></Link>
                <Link to='/contact-us'><button className='footer-button'>Contact Us</button></Link>
            </div>
        </div>
    )
}
