import React from "react";
import LocationInput from "./LocationInput";
import {useState, useEffect} from "react";
import makeModelTrailers from "../testJsons/makeModelTrailers.json";

export default function NewListingTrailers(){
    const [trailerMakes, setTrailerMakes] = useState<string[]>([]);

    useEffect(() => {
        setTrailerMakes(makeModelTrailers);
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
                {trailerMakes.map((trailer) => (
                    <option key={trailer} value={trailer}>
                        {trailer}
                    </option>
                ))}
            </select>
            <label>Application:</label>
            <select>
                <option value="">Application</option>
                <option value="Box">Box</option>
                <option value="Curtain Side">Curtain Side</option>
                <option value="Flatbed">Flatbed</option>
                <option value="Refrigerated">Refrigerated</option>
                <option value="Tanker">Tanker</option>
            </select>
            <label>Model:</label>
            <input type="text" placeholder="Model" />
            <label>Year:</label>
            <input type="text" placeholder="Year" />
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