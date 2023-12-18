import React from "react";
import { Link } from "react-router-dom";
import LocationInputSearch from "./LocationInputSearch";
import { useState, useEffect } from "react";
import agriculturalMachineryDataJson from "../testJsons/makeModelAgriculturalMachinery.json";

export default function ParametersInputMainAgriculturalMachinery({showAllFields}: {showAllFields: boolean}) {
    const [agriculturalMachineryMakes, setAgriculturalMachineryMakes] = useState<string[]>([]);
    const [locationParams, setLocationParams] = useState<{ position: [number, number] | null; radius: number }>({ position: null, radius: 100000 });
    const [locationVisible, setLocationVisible] = useState(false);

    const handleLocationChange = (params: { position: [number, number] | null; radius: number }) => {
        setLocationParams(params);
    };

    const handleLocationVisibleChange = () => {
        setLocationVisible(!locationVisible);
        setLocationParams({ position: null, radius: 100000 });
    };

    useEffect(() => {
        setAgriculturalMachineryMakes(agriculturalMachineryDataJson);
    }, []);

    return(
        <div className="parameters-input-main">
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
            {showAllFields && (
            <>
            <label>Year:</label>
            <input type="text" placeholder="Year from" />
            <input type="text" placeholder="Year to" />
            <label>Operating Hours:</label>
            <input type="text" placeholder="Operating Hours from" />
            <input type="text" placeholder="Operating Hours to" />
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
            <Link to="/search/agricultural-machinery">
                <button>Search</button>
            </Link>
        </div>
    );
}
