import React from "react";
import { useState, useEffect } from "react";
import LocationInput from "./LocationInput";
import makeModelTrucks from "../testJsons/makeModelTrucks.json";

interface MakeModelTrucks {
    make: string;
    models: string[];
}

export default function NewListingTrucks() {
    const [truckData, setMakeModelTrucks] = useState<MakeModelTrucks[]>([]);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMake(event.target.value);
        setSelectedModel("");
    };

    useEffect(() => {
        setMakeModelTrucks(makeModelTrucks);
    }, []);

    return(
        <div className="new-listing-page">
            <label>Photos:</label>
            <input type='file' multiple accept="image/*" />
            <label>Title:</label>
            <input type='text' placeholder='Title' />
            <label>Make:</label>
            <select value={selectedMake} onChange={handleMakeChange}>
                <option value="">Make</option>
                {truckData.map((truck) => (
                <option key={truck.make} value={truck.make}>
                    {truck.make}
                </option>
                ))}
            </select>
            <label>Model:</label>
            <select value={selectedModel} onChange={(event) => setSelectedModel(event.target.value)}>
                <option value="">Model</option>
                {truckData
                .find((truck) => truck.make === selectedMake)?.models.map((model) => (
                    <option key={model} value={model}>
                    {model}
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
                <option value="Tipper">Tipper</option>
                <option value="Bus">Bus</option>
                <option value="Other">Other</option>
            </select>
            <label>Year:</label>
            <input type="text" placeholder="Year"/>
            <label>Mileage:</label>
            <input type="text" placeholder="Mileage"/>
            <label>Price:</label>
            <input type="text" placeholder="Price"/>
            <label>Description:</label>
            <textarea placeholder="Description" />
            <label>Condition:</label>
            <select>
                <option value="">Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Damaged">Damaged</option>
            </select>
            <label>Fuel:</label>
            <select>
                <option value="">Fuel</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="LPG">LPG</option>
                <option value="CNG">CNG</option>
                <option value="LNG">LNG</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Other">Other</option>
            </select>
            <label>Location:</label>
            <LocationInput />
            <label>Phone number:</label>
            <input type='text' placeholder='Phone Number' />
            <button>Submit</button>
        </div>
    );
}
