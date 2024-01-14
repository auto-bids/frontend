import React from "react";
import { Link } from "react-router-dom";
import LocationInputSearch from "./LocationInputSearch";
import { useState, useEffect } from "react";
import constructionMachineryDataJson from "../testJsons/makeModelConstructionMachinery.json";

export default function ParametersInputMainTrucks({showAllFields, searchParameters}: {showAllFields: boolean, searchParameters: any}) {
    const [constructionMachineryMakes, setConstructionMachineryMakes] = useState<string[]>([]);
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
        setConstructionMachineryMakes(constructionMachineryDataJson);
    }, []);

    const [formValues, setFormValues] = useState({
        make: "",
        model: "",
        application: "",
        yearFrom: "",
        yearTo: "",
        operatingHoursFrom: "",
        operatingHoursTo: "",
        priceFrom: "",
        priceTo: "",
        condition: "",
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchPath = "/search/construction-machinery";
        const queryParams = new URLSearchParams();
        Object.entries(formValues).forEach(([key, value]) => {
            if (value !== "") {
              queryParams.append(key, value);
            }
        });
        if (locationParams.position) {
            queryParams.append("latitude", locationParams.position[0].toString());
            queryParams.append("longitude", locationParams.position[1].toString());
            queryParams.append("radius", locationParams.radius.toString());
        }
        window.location.href = `${searchPath}?${queryParams.toString()}`;
    }

    return(
        <form className="parameters-input-main" onSubmit={handleSubmit}>
            <label>Make:</label>
            <select name="make" value={formValues.make} onChange={handleInputChange}>
                <option value="">Make</option>
                {constructionMachineryMakes.map((constructionMachinery) => (
                    <option key={constructionMachinery} value={constructionMachinery}>
                        {constructionMachinery}
                    </option>
                ))}
            </select>
            <label>Model:</label>
            <input type="text" placeholder="Model" name="model" value={formValues.model} onChange={handleInputChange}/>
            <label>Application:</label>
            <select name="application" value={formValues.application} onChange={handleInputChange}>
                <option value="">Application</option>
                <option value="Articulated Dump Truck">Articulated Dump Truck</option>
                <option value="Backhoe Loader">Backhoe Loader</option>
                <option value="Crawler Dozer">Crawler Dozer</option>
                <option value="Excavator">Excavator</option>
                <option value="Motor Grader">Motor Grader</option>
                <option value="Skid Steer Loader">Skid Steer Loader</option>
                <option value="Wheel Loader">Wheel Loader</option>
            </select>
            {showAllFields && (
            <>
            <label>Year:</label>
            <input type="text" placeholder="Year from" name="yearFrom" value={formValues.yearFrom} onChange={handleInputChange} />
            <input type="text" placeholder="Year to" name="yearTo" value={formValues.yearTo} onChange={handleInputChange} />
            <label>Operating Hours:</label>
            <input type="text" placeholder="Operating Hours from" name="operatingHoursFrom" value={formValues.operatingHoursFrom} onChange={handleInputChange} />
            <input type="text" placeholder="Operating Hours to" name="operatingHoursTo" value={formValues.operatingHoursTo} onChange={handleInputChange} />
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