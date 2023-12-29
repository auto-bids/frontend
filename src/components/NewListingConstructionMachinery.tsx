import React, {useState, useEffect} from "react";
import LocationInput from "./LocationInput";
import makeModelConstructionMachinery from "../testJsons/makeModelConstructionMachinery.json";

export default function NewListingConstructionMachinery() {
    const [constructionMachineryMakes, setConstructionMachineryMakes] = useState<string[]>([]);
    const [locationParams, setLocationParams] = useState<{ position: [number, number] | null;}>({ position: null });
    
    useEffect(() => {
        setConstructionMachineryMakes(makeModelConstructionMachinery);
    }, []);

    const handleLocationChange = (params: { position: [number, number] | null}) => {
        setLocationParams(params);
    };


    return(
        <div className='new-listing-page'>
            <label>Photos:</label>
            <input type='file' multiple accept="image/*" />
            <label>Title:</label>
            <input type='text' placeholder='Title' />
            <label>Make:</label>
            <select>
                <option value="">Make</option>
                {constructionMachineryMakes.map((constructionMachinery) => (
                    <option key={constructionMachinery} value={constructionMachinery}>
                        {constructionMachinery}
                    </option>
                ))}
            </select>
            <label>Model:</label>
            <input type="text" placeholder="Model" />
            <label>Application:</label>
            <select>
                <option value="">Application</option>
                <option value="Articulated Dump Truck">Articulated Dump Truck</option>
                <option value="Backhoe Loader">Backhoe Loader</option>
                <option value="Crawler Dozer">Crawler Dozer</option>
                <option value="Excavator">Excavator</option>
                <option value="Motor Grader">Motor Grader</option>
                <option value="Skid Steer Loader">Skid Steer Loader</option>
                <option value="Wheel Loader">Wheel Loader</option>
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
            <LocationInput onLocationChange={handleLocationChange} />
            <label>Phone number:</label>
            <input type="text" placeholder="Phone number" />
            <button>Submit</button>
        </div>
    );
}