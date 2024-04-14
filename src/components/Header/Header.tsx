import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChatListener from "../Other/ChatListener";

export default function Header(props: any) {
  useEffect(() => {
    // console.log("header reload")
  }, [props]);

  return (
    <div className='flex justify-between items-center p-4 bg-neutral-900'>
      <Link to='/'>
        <button className='bg-teal-500 px-4 py-2 text-white rounded hover:bg-teal-600 transition duration-300'>auto-bids</button>
      </Link>
        <div className='flex items-center'>
            <div className="mr-6"><ChatListener/></div>
            <Link to='/new-listing'>
                <button
                    className='bg-neutral-500 px-4 py-2 text-white rounded hover:bg-neutral-600 transition duration-300'>New
                    Listing
                </button>
            </Link>
            {document.cookie === 'isLoggedIn=true' ? (
                <Link to='/account'>
                    <button
                        className='bg-teal-700 px-4 py-2 text-white rounded ml-2 hover:bg-teal-800 transition duration-300'>Your
                        account
                    </button>
                </Link>
            ) : (
                <Link to='/register'>
                    <button
                        className='bg-neutral-50 px-4 py-2 text-black rounded ml-2 hover:bg-neutral-300 transition duration-300'>Register/Login
                    </button>
                </Link>
            )}
        </div>
    </div>
  );
}
