import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header(props: any) {
  useEffect(() => {
    // console.log("header reaload")
  }, [props]);

  return (
    <div className='flex justify-between items-center p-4 bg-gray-800'>
      <Link to='/'>
        <button className='bg-blue-500 px-4 py-2 text-white rounded'>auto-bids</button>
      </Link>
      <Link to='/new-listing'>
        <button className='bg-green-500 px-4 py-2 text-white rounded'>New Listing</button>
      </Link>
      {document.cookie === 'isLoggedIn=true' ? (
        <Link to='/account'>
          <button className='bg-red-500 px-4 py-2 text-white rounded'>Your account</button>
        </Link>
      ) : (
        <Link to='/register'>
          <button className='bg-purple-500 px-4 py-2 text-white rounded'>Register/Login</button>
        </Link>
      )}
    </div>
  );
}
