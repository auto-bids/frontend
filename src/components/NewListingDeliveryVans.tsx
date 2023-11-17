import React from "react";
import { useState } from "react";
import LocationInput from "./LocationInput";

export default function NewListingDeliveryVans() {
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedColor, setSelectedColor] = useState("#000000");

    return(
        <div className="new-listing-page">
            <label>Photos:</label>
            <input type='file' multiple accept="image/*" />
            <label>Title:</label>
            <input type='text' placeholder='Title' />
            <label>Make:</label>
            <select value={selectedMake} onChange={(event) => setSelectedMake(event.target.value)}>
                <option value="">Make</option>
                <option value="Ford">Ford</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Volkswagen">Volkswagen</option>
            </select>
            <label>Model:</label>
            <select value={selectedModel} onChange={(event) => setSelectedModel(event.target.value)}>
                <option value="">Model</option>
                {selectedMake === "Ford" && (
                <>
                    <option value="Transit">Transit</option>
                    <option value="Connect">Connect</option>
                </>
                )}
                {selectedMake === "Mercedes-Benz" && (
                <>
                    <option value="Sprinter">Sprinter</option>
                    <option value="Vito">Vito</option>
                </>
                )}
                {selectedMake === "Volkswagen" && (
                <>
                    <option value="Transporter">Transporter</option>
                    <option value="Caddy">Caddy</option>
                </>
                )}
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
            <label>Color:</label>
            <input
                type="color"
                value={selectedColor}
                onChange={(event) => setSelectedColor(event.target.value)}
            />
            <label>Location:</label>
            <LocationInput />
            <label>Phone number:</label>
            <input type='text' placeholder='Phone Number' />
            <button>Submit</button>
        </div>
    );
}