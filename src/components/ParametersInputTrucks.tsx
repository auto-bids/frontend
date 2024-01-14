import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LocationInputSearch from "./LocationInputSearch";
import trucksDataJson from "../testJsons/makeModelTrucks.json";

export default function ParametersInputMainTrucks({showAllFields, searchParameters}: {showAllFields: boolean, searchParameters: any}) {
    const [trucksData, setTrucksData] = useState(trucksDataJson);
    const [locationParams, setLocationParams] = useState<{ position: [number, number] | null; radius: number }>({ position: null, radius: 100000 });
    const [locationVisible, setLocationVisible] = useState(false);

    const handleLocationVisibleChange = () => {
        setLocationVisible(!locationVisible);
        setLocationParams({ position: null, radius: 100000 });
    };

    useEffect(() => {
        setTrucksData(trucksDataJson);
    }, []);

    const handleLocationChange = (params: { position: [number, number] | null; radius: number }) => {
        setLocationParams(params);
    }

    const [formValues, setFormValues] = useState({
        make: "",
        model: "",
        application: "",
        yearFrom: "",
        yearTo: "",
        mileageFrom: "",
        mileageTo: "",
        priceFrom: "",
        priceTo: "",
        condition: "",
        fuelType: "",
    });

    useEffect(() => {
        if (searchParameters) {
          const paramPairs = searchParameters.split("&");
          const decodedSearchParameters = paramPairs.reduce((acc: any, pair: string) => {
          const [key, value] = pair.split("=");
            acc[key] = decodeURIComponent(value);
            return acc;
          }, {});
          console.log(decodedSearchParameters);
          setFormValues((prevFormValues) => ({
            ...prevFormValues,
            ...decodedSearchParameters,
          }));
        }
      }, [searchParameters]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value, model: "" });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchPath = "/search/trucks";
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
    };

    return(
        <form className="parameters-input-main" onSubmit={handleSubmit}>
            <label>Make:</label>
            <select name="make" value={formValues.make} onChange={handleMakeChange}>
                <option value="">Make</option>
                {trucksData.map((truck) => (
                    <option key={truck.make} value={truck.make}>
                        {truck.make}
                    </option>
                ))}
            </select>
            <label>Model:</label>
            <select value={formValues.model} name="model" onChange={handleInputChange}>
                <option value="">Model</option>
                {trucksData
                    .find((truck) => truck.make === formValues.make)?.models.map((model) => (
                        <option key={model} value={model}>
                            {model}
                        </option>
                    ))}
            </select>
            <label>Application:</label>
            <select name="application" value={formValues.application} onChange={handleInputChange}>
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
            <input type="text" placeholder="Year from" name="yearFrom" value={formValues.yearFrom} onChange={handleInputChange} />
            <input type="text" placeholder="Year to" name="yearTo" value={formValues.yearTo} onChange={handleInputChange} />
            {showAllFields && (
            <>
            <label>Mileage:</label>
            <input type="text" placeholder="Mileage from" name="mileageFrom" value={formValues.mileageFrom} onChange={handleInputChange} />
            <input type="text" placeholder="Mileage to" name="mileageTo" value={formValues.mileageTo} onChange={handleInputChange} />
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
            <label>Fuel:</label>
            <select name="fuelType" value={formValues.fuelType} onChange={handleInputChange}>
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
                <button type="button" onClick={handleLocationVisibleChange}>Any location</button>
                ) : (
                <button type="button" onClick={handleLocationVisibleChange}>Choose location</button>
                )
            }
            {locationVisible && <LocationInputSearch onLocationChange={handleLocationChange} />}
            </>
            )}
            <button type="submit" className="search-button">Search</button>
        </form>
    )

}