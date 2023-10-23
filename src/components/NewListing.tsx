import React from "react";

export default function NewListing() {
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
                    <option value='Sedan'>Sedan</option>
                    <option value='Station Wagon'>Station Wagon</option>
                    <option value='Hatchback'>Hatchback</option>
                    <option value='SUV'>SUV</option>
                    <option value='Van'>Van</option>
                    <option value='Cabriolet'>Cabriolet</option>
                    <option value='Coupe'>Coupe</option>
                    <option value='Other'>Other</option>
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
                <input type='text' placeholder='Drive' />
                <input type='text' placeholder='Color' />
                <input type='text' placeholder='Doors' />
                <input type='text' placeholder='Seats' />
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