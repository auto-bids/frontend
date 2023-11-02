import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='footer'>
            <p>© 2023 - All Rights Reserved</p>
            <Link to='/privacy-policy'><button className='footer-button'>Privacy Policy</button></Link>
            <Link to='/terms-of-service'><button className='footer-button'>Terms of Service</button></Link>
            <Link to='/help'><button className='footer-button'>Help</button></Link>
            <Link to='/about-us'><button className='footer-button'>About Us</button></Link>
            <Link to='/contact-us'><button className='footer-button'>Contact Us</button></Link>
        </div>
    )
}