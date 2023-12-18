import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LocationInputSearch from "./LocationInputSearch";
import trucksDataJson from "../testJsons/makeModelTrucks.json";

export default function ParametersInputMainTrucks({showAllFields}: {showAllFields: boolean}) {
    const [trucksData, setTrucksData] = useState(trucksDataJson);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [locationParams, setLocationParams] = useState<{ position: [number, number] | null; radius: number }>({ position: null, radius: 100000 });
    const [locationVisible, setLocationVisible] = useState(false);

    const handleLocationVisibleChange = () => {
        setLocationVisible(!locationVisible);
        setLocationParams({ position: null, radius: 100000 });
    };

    useEffect(() => {
        setTrucksData(trucksDataJson);
    }, []);

    const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMake(event.target.value);
        setSelectedModel("");
    };

    const handleLocationChange = (params: { position: [number, number] | null; radius: number }) => {
        setLocationParams(params);
    }

    return(
        <div className="parameters-input-main">
            <label>Make:</label>
            <select value={selectedMake} onChange={handleMakeChange}>
                <option value="">Make</option>
                {trucksData.map((truck) => (
                    <option key={truck.make} value={truck.make}>
                        {truck.make}
                    </option>
                ))}
            </select>
            <label>Model:</label>
            <select value={selectedModel} onChange={(event) => setSelectedModel(event.target.value)}>
                <option value="">Model</option>
                {trucksData
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
            <input type="text" placeholder="Year from" />
            <input type="text" placeholder="Year to" />
            {showAllFields && (
            <>
            <label>Mileage:</label>
            <input type="text" placeholder="Mileage from" />
            <input type="text" placeholder="Mileage to" />
            <label>Price:</label>
            <input type="text" placeholder="Price from" />
            <input type="text" placeholder="Price to" />
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
            {
                locationVisible ? (
                <button onClick={handleLocationVisibleChange}>Any location</button>
                ) : (
                <button onClick={handleLocationVisibleChange}>Choose location</button>
                )
            }
            {locationVisible && <LocationInputSearch onLocationChange={handleLocationChange} />}
            </>
            )}
            <Link to="/search/trucks">
                <button>Search</button>
            </Link>
        </div>
    )

}