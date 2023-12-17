import React from "react";
import { Link } from "react-router-dom";
import LocationInputSearch from "./LocationInputSearch";
import { useState, useEffect } from "react";
import trailersDataJson from "../testJsons/makeModelTrailers.json";

export default function ParametersInputMainTrailers({showAllFields}: {showAllFields: boolean}) {
    const [trailerMakes, setTrailerMakes] = useState<string[]>([]);
    const [locationParams, setLocationParams] = useState<{ position: [number, number] | null; radius: number }>({ position: null, radius: 100000 });
    const handleLocationChange = (params: { position: [number, number] | null; radius: number }) => {
        setLocationParams(params);
    }

    useEffect(() => {
        setTrailerMakes(trailersDataJson);
    }, []);

    return(
        <div className="parameters-input-main">
            <label>Make:</label>
            <select>
                <option value="">Make</option>
                {trailerMakes.map((trailer) => (
                    <option key={trailer} value={trailer}>
                        {trailer}
                    </option>
                ))}
            </select>
            <label>Model:</label>
            <input type="text" placeholder="Model" />
            <label>Application:</label>
            <select>
                <option value="">Application</option>
                <option value="Box">Box</option>
                <option value="Curtain Side">Curtain Side</option>
                <option value="Flatbed">Flatbed</option>
                <option value="Refrigerated">Refrigerated</option>
                <option value="Tanker">Tanker</option>
            </select>
            <label>Year:</label>
            <input type="text" placeholder="Year from" />
            <input type="text" placeholder="Year to" />
            {showAllFields && (
            <>
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
            <label>Location:</label>
            <LocationInputSearch onLocationChange={handleLocationChange} />
            </>
            )}
            <Link to="/search/trailers">
                <button>Search</button>
            </Link>
        </div>
    );
}