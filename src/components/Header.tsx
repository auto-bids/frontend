import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header(props: any) {
  useEffect(() => {
    // console.log("header reaload")
  }, [props]);

  return (
    <div className='flex justify-between items-center p-4 bg-neutral-900'>
      <Link to='/'>
        <button className='bg-teal-500 px-4 py-2 text-white rounded'>auto-bids</button>
      </Link>
      <Link to='/new-listing'>
        <button className='bg-neutral-500 px-4 py-2 text-white rounded'>New Listing</button>
      </Link>
      {document.cookie === 'isLoggedIn=true' ? (
        <Link to='/account'>
          <button className='bg-teal-700 px-4 py-2 text-white rounded'>Your account</button>
        </Link>
      ) : (
        <Link to='/register'>
          <button className='bg-neutral-50 px-4 py-2 text-black rounded'>Register/Login</button>
        </Link>
      )}
    </div>
  );
}
