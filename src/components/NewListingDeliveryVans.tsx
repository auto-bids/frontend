import React from "react";
import { useState, useEffect } from "react";
import LocationInput from "./LocationInput";
import makeModelDeliveryVans from "../testJsons/makeModelDeliveryVans.json";

interface MakeModelDeliveryVans {
    make: string;
    models: string[];
}

export default function NewListingDeliveryVans() {
    const [deliveryVanData, setMakeModelDeliveryVans] = useState<MakeModelDeliveryVans[]>([]);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMake(event.target.value);
        setSelectedModel("");
      };

    useEffect(() => {
        setMakeModelDeliveryVans(makeModelDeliveryVans);
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
                {deliveryVanData.map((deliveryVan) => (
                <option key={deliveryVan.make} value={deliveryVan.make}>
                    {deliveryVan.make}
                </option>
                ))}
            </select>
            <label>Model:</label>
            <select value={selectedModel} onChange={(event) => setSelectedModel(event.target.value)}>
                <option value="">Model</option>
                {deliveryVanData
                .find((deliveryVan) => deliveryVan.make === selectedMake)?.models.map((model) => (
                    <option key={model} value={model}>
                    {model}
                    </option>
                ))}
            </select>
            <label>Year:</label>
            <input type="text" placeholder="Year" />
            <label>Mileage:</label>
            <input type="text" placeholder="Mileage" />
            <label>Price:</label>
            <input type="text" placeholder="Price" />
            <label>Description:</label>
            <textarea placeholder="Description" />
            <label>Fuel type:</label>
            <select>
                <option value="">Fuel Type</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="LPG">LPG</option>
                <option value="CNG">CNG</option>
                <option value="Hydrogen">Hydrogen</option>
                <option value="Ethanol">Ethanol</option>
            </select>
            <label>Transmission:</label>
            <select>
                <option value="">Transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                <option value="Semi-automatic">Semi-automatic</option>
            </select>
            <label>Drive</label>
            <select>
                <option value="">Drive</option>
                <option value="Front">Front</option>
                <option value="Rear">Rear</option>
                <option value="All">All</option>
            </select>
            <label>Steering:</label>
            <select>
                <option value="">Steering</option>
                <option value="Left">Left</option>
                <option value="Right">Right</option>
            </select>
            <label>Engine capacity:</label>
            <input type="text" placeholder="Engine capacity" />
            <label>Power:</label>
            <input type="text" placeholder="Power" />
            <label>Registration number</label>
            <input type="text" placeholder="Registration number" />
            <label>First registration:</label>
            <input type="text" placeholder="First registration" />
            <label>VIN number:</label>
            <input type="text" placeholder="Vin number" />
            <label>Condition:</label>
            <select>
                <option value="">Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Damaged">Damaged</option>
            </select>
            <label>Doors:</label>
            <select>
                <option value="">Doors</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="8+">8+</option>
            </select>
            <label>Seats:</label>
            <select>
                <option value="">Seats</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value='9+'>9+</option>
            </select>
            <label>Permissible Gross Weight</label>
            <input type="text" placeholder="PGW from" />
            <input type="text" placeholder="PGW to" />
            <label>Maximum Load</label>
            <input type="text" placeholder="Maximum Load from" />
            <input type="text" placeholder="Maximum Load to" />
            <label>Capacity:</label>
            <input type="text" placeholder="Capacity from" />
            <input type="text" placeholder="Capacity to" />
            <label>Location:</label>
            <LocationInput />
            <label>Phone number:</label>
            <input type='text' placeholder='Phone Number' />
            <button>Submit</button>
        </div>
    );
}