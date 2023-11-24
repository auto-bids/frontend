import React from "react";
import LocationInput from "./LocationInput";
import {useState, useEffect} from "react";
import makeModelAgriculturalMachinery from "../testJsons/makeModelAgriculturalMachinery.json";


export default function NewListingAgriculturalMachinery(){
    const [agriculturalMachineryMakes, setAgriculturalMachineryMakes] = useState<string[]>([]);

    useEffect(() => {
        setAgriculturalMachineryMakes(makeModelAgriculturalMachinery);
    }, []);

    
    return(
        <div className='new-listing-page'>
            <label>Photos:</label>
            <input type='file' multiple accept="image/*" />
            <label>Title:</label>
            <input type='text' placeholder='Title' />
            <label>Make:</label>
            <select>
                <option value="">Make</option>
                {agriculturalMachineryMakes.map((agriculturalMachinery) => (
                    <option key={agriculturalMachinery} value={agriculturalMachinery}>
                        {agriculturalMachinery}
                    </option>
                ))}
            </select>
            <label>Model:</label>
            <input type="text" placeholder="Model" />
            <label>Application:</label>
            <select>
                <option value="">Application</option>
                <option value="Tractor">Tractor</option>
                <option value="Combine Harvester">Combine Harvester</option>
                <option value="Forage Harvester">Forage Harvester</option>
                <option value="Sprayer">Sprayer</option>
                <option value="Seeder">Seeder</option>
                <option value="Other">Other</option>
            </select>
            <label>Year:</label>
            <input type="text" placeholder="Year" />
            <label>Operating Hours:</label>
            <input type="text" placeholder="Operating Hours" />
            <label>Price:</label>
            <input type="text" placeholder="Price" />
            <label>Condition:</label>
            <select>
                <option value="">Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Damaged">Damaged</option>
            </select>
            <label>Description:</label>
            <textarea placeholder="Description" />
            <label>Location:</label>
            <LocationInput />
            <label>Phone number:</label>
            <input type="text" placeholder="Phone number" />
            <button>Submit</button>
        </div>
    );
}