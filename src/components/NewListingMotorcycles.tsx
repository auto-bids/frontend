import React from "react";
import { useState } from "react";
import LocationInput from "./LocationInput";

export default function NewListingMotorcycles() {
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedColor, setSelectedColor] = useState("#000000");

    return(
        <div className='new-listing-page'>
            <h1>New Listing</h1>
            <div className='new-listing-form'>
                <label>Photos:</label>
                <input type='file' multiple accept="image/*" />
                <label>Title:</label>
                <input type='text' placeholder='Title' />
                <label>Make:</label>
                <select value={selectedMake} onChange={(event) => setSelectedMake(event.target.value)}>
                    <option value=''>Make</option>
                    <option value='Honda'>Honda</option>
                    <option value='Yamaha'>Yamaha</option>
                    <option value='Kawasaki'>Kawasaki</option>
                </select>
                <label>Model:</label>
                <select value={selectedModel} onChange={(event) => setSelectedModel(event.target.value)}>
                    <option value=''>Model</option>
                    {selectedMake === 'Honda' && (
                        <>
                            <option value='CBR'>CBR</option>
                            <option value='CRF'>CRF</option>
                        </>
                    )}
                    {selectedMake === 'Yamaha' && (
                        <>
                            <option value='YZF'>YZF</option>
                            <option value='MT'>MT</option>
                        </>
                    )}
                    {selectedMake === 'Kawasaki' && (
                        <>
                            <option value='Ninja'>Ninja</option>
                            <option value='Z'>Z</option>
                        </>
                    )}
                </select>
                <label>Type:</label>
                <select>
                    <option value=''>Type</option>
                    <option value='Sportbike'>Sportbike</option>
                    <option value='Cruiser'>Cruiser</option>
                    <option value='Dirt Bike'>Dirt Bike</option>
                </select>
                <label>Year:</label>
                <input type='text' placeholder='Year' />
                <label>Mileage:</label>
                <input type='text' placeholder='Mileage' />
                <label>Price:</label>
                <input type='text' placeholder='Price' />
                <label>Description:</label>
                <textarea placeholder="Description" />
                <label>Features:</label>
                <input type='text' placeholder="Features" />
                <label>VIN number:</label>
                <input type='text' placeholder='VIN number' />
                <label>Engine capacity:</label>
                <input type='text' placeholder='Engine capacity' />
                <label>Fuel type:</label>
                <select>
                    <option value=''>Fuel type</option>
                    <option value='Petrol'>Petrol</option>
                    <option value='Diesel'>Diesel</option>
                    <option value='Electric'>Electric</option>
                </select>
                <label>Engine power:</label>
                <input type='text' placeholder='Engine power' />
                <label>Transmission:</label>
                <select>
                    <option value=''>Transmission</option>
                    <option value='Manual'>Manual</option>
                    <option value='Automatic'>Automatic</option>
                </select>
                <label>Color:</label>
                <input
                    type="color"
                    value={selectedColor}
                    onChange={(event) => setSelectedColor(event.target.value)}
                />
                <label>Drive type:</label>
                <select>
                    <option value=''>Drive type</option>
                    <option value='Chain'>Chain</option>
                    <option value='Belt'>Belt</option>
                    <option value='Shaft'>Shaft</option>
                </select>
                <label>Registration number:</label>
                <input type='text' placeholder='Registration number' />
                <label>First registration:</label>
                <input type='text' placeholder='First registration' />
                <select>
                    <option value=''>Condition</option>
                    <option value='New'>New</option>
                    <option value='Used'>Used</option>
                    <option value='Damaged'>Damaged</option>
                </select>
                <label>Location:</label>
                <LocationInput />
                <label>Phone number:</label>
                <input type='text' placeholder='Phone Number' />
                <button>Submit</button>
            </div>
        </div>
    )
}