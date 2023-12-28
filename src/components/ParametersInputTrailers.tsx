import React from "react";
import { Link } from "react-router-dom";
import LocationInputSearch from "./LocationInputSearch";
import { useState, useEffect } from "react";
import trailersDataJson from "../testJsons/makeModelTrailers.json";

export default function ParametersInputMainTrailers({showAllFields}: {showAllFields: boolean}) {
    const [trailerMakes, setTrailerMakes] = useState<string[]>([]);
    const [locationParams, setLocationParams] = useState<{ position: [number, number] | null; radius: number }>({ position: null, radius: 100000 });
    const [locationVisible, setLocationVisible] = useState(false);
    
    const handleLocationVisibleChange = () => {
      setLocationVisible(!locationVisible);
      setLocationParams({ position: null, radius: 100000 });
    };

    const handleLocationChange = (params: { position: [number, number] | null; radius: number }) => {
        setLocationParams(params);
    };

    useEffect(() => {
        setTrailerMakes(trailersDataJson);
    }, []);

    const [formValues, setFormValues] = useState({
        make: "",
        model: "",
        application: "",
        yearFrom: "",
        yearTo: "",
        priceFrom: "",
        priceTo: "",
        condition: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchPath = "/search/trailers";
        const queryParams =  new URLSearchParams();
        Object.entries(formValues).forEach(([key, value]) => {
        if (value !== "") {
            queryParams.append(key, value);
        }
        });
        if (locationParams.position) {
            queryParams.append("lat", locationParams.position[0].toString());
            queryParams.append("lng", locationParams.position[1].toString());
            queryParams.append("radius", locationParams.radius.toString());
        }

        window.location.href = `${searchPath}?${queryParams.toString()}`;
    }

    return(
        <form className="parameters-input-main" onSubmit={handleSubmit}>
            <label>Make:</label>
            <select name="make" value={formValues.make} onChange={handleInputChange}>
                <option value="">Make</option>
                {trailerMakes.map((trailer) => (
                    <option key={trailer} value={trailer}>
                        {trailer}
                    </option>
                ))}
            </select>
            <label>Model:</label>
            <input type="text" placeholder="Model" name="model" value={formValues.model} onChange={handleInputChange} />
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
            <input type="text" placeholder="Year from" name="yearFrom" value={formValues.yearFrom} onChange={handleInputChange} />
            <input type="text" placeholder="Year to" name="yearTo" value={formValues.yearTo} onChange={handleInputChange} />
            {showAllFields && (
            <>
            <label>Price:</label>
            <input type="text" placeholder="Price from" name="priceFrom" value={formValues.priceFrom} onChange={handleInputChange} />
            <input type="text" placeholder="Price to" name="priceTo" value={formValues.priceTo} onChange={handleInputChange} />
            <label>Condition:</label>
            <select name="condition" value={formValues.condition} onChange={handleInputChange}>
                <option value="">Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Damaged">Damaged</option>
            </select>
            {
                locationVisible ? (
                <button type="button" onClick={handleLocationVisibleChange}>Any location</button>
                ) : (
                <button type="button" onClick={handleLocationVisibleChange}>Choose location</button>
                )
            }
            {locationVisible && <LocationInputSearch onLocationChange={handleLocationChange} />}
            </>
            )}
            <button type="submit">Search</button>
        </form>
    );
}