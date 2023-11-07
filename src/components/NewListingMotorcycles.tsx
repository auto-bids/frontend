import React from "react";

export default function NewListingMotorcycles() {
    //do poprawienia
    return(
        <div className='new-listing-page'>
            <h1>New Listing</h1>
            <div className='new-listing-form'>
                <input type='file' multiple accept="image/*" />
                <input type='text' placeholder='Title' />
                <input type='text' placeholder='Make' />
                <input type='text' placeholder='Model' />
                <select>
                    <option value=''>Type</option>
                    <option value='Sportbike'>Sportbike</option>
                    <option value='Cruiser'>Cruiser</option>
                    <option value='Dirt Bike'>Dirt Bike</option>
                </select>
                <input type='text' placeholder='Year' />
                <input type='text' placeholder='Mileage' />
                <input type='text' placeholder='Price' />
                <input type='text' placeholder='Description' />
                <input type='text' placeholder="Features" />
                <input type='text' placeholder='VIN number' />
                <input type='text' placeholder='Engine capacity' />
                <input type='text' placeholder='Fuel type' />
                <input type='text' placeholder='Engine power' />
                <input type='text' placeholder='Transmission' />
                <input type='text' placeholder='Color' />
                <select>
                    <option value=''>Drive type</option>
                    <option value='Chain'>Chain</option>
                    <option value='Belt'>Belt</option>
                    <option value='Shaft'>Shaft</option>
                </select>
                <input type='text' placeholder='Registration number' />
                <input type='text' placeholder='First registration' />
                <select>
                    <option value=''>Condition</option>
                    <option value='New'>New</option>
                    <option value='Used'>Used</option>
                    <option value='Damaged'>Damaged</option>
                </select>
                <input type='text' placeholder='Country'/>
                <input type='text' placeholder='City' />
                <input type='text' placeholder='Phone Number' />
                <button>Submit</button>
            </div>
        </div>
    )
}