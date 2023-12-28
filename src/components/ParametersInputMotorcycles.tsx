import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LocationInputSearch from "./LocationInputSearch";
import motorcycleDataJson from "../testJsons/makeModelMotorcycles.json";

interface MotorcycleData {
  make: string;
  models: string[];
}

export default function MotorcycleParametersInput({showAllFields}: {showAllFields: boolean}) {
  const [motorcycleData, setMotorcycleData] = useState<MotorcycleData[]>([]);
  const [locationParams, setLocationParams] = useState<{ position: [number, number] | null; radius: number }>({ position: null, radius: 100000 });
  const [locationVisible, setLocationVisible] = useState(false);
    
  const handleLocationVisibleChange = () => {
      setLocationVisible(!locationVisible);
      setLocationParams({ position: null, radius: 100000 });
  };

  useEffect(() => {
    setMotorcycleData(motorcycleDataJson);
  }, []);

  const handleLocationChange = (params: { position: [number, number] | null; radius: number }) => {
    setLocationParams(params);
  }

  const [formValues, setFormValues] = useState({
    make: "",
    model: "",
    type: "",
    yearFrom: "",
    yearTo: "",
    mileageFrom: "",
    mileageTo: "",
    priceFrom: "",
    priceTo: "",
    fuelType: "",
    transmission: "",
    engineCapacityFrom: "",
    engineCapacityTo: "",
    powerFrom: "",
    powerTo: "",
    condition: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value, model: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchPath = "/search/motorcycles";
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

  return (
    <form className="parameters-input" onSubmit={handleSubmit}>
      <label>Make:</label>
      <select value={formValues.make} name="make" onChange={handleMakeChange}>
        <option value="">Make</option>
        {motorcycleData.map((motorcycle) => (
          <option key={motorcycle.make} value={motorcycle.make}>
            {motorcycle.make}
          </option>
        ))}
      </select>
      <label>Model:</label>
      <select value={formValues.model} name="model" onChange={handleInputChange}>
        <option value="">Model</option>
        {motorcycleData
          .filter((motorcycle) => motorcycle.make === formValues.make)
          .map((motorcycle) => motorcycle.models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          )))}
      </select>
      <label>Type:</label>
      <select name="type" value={formValues.type} onChange={handleInputChange} >
        <option value="">Type</option>
        <option value="Sportbike">Sportbike</option>
        <option value="Cruiser">Cruiser</option>
        <option value="Dirt Bike">Dirt Bike</option>
      </select>
      {showAllFields && (
      <>
      <label>Year:</label>
      <input type="text" placeholder="Year from" name="yearFrom" value={formValues.yearFrom} onChange={handleInputChange} />
      <input type="text" placeholder="Year to" name="yearTo" value={formValues.yearTo} onChange={handleInputChange} />
      <label>Engine capacity:</label>
      <input type="text" placeholder="Engine capacity from" name="engineCapacityFrom" value={formValues.engineCapacityFrom} onChange={handleInputChange} />
      <input type="text" placeholder="Engine capacity to" name="engineCapacityTo" value={formValues.engineCapacityTo} onChange={handleInputChange} />
      <label>Engine power:</label>
      <input type="text" placeholder="Engine power from" name="powerFrom" value={formValues.powerFrom} onChange={handleInputChange} />
      <input type="text" placeholder="Engine power to" name="powerTo" value={formValues.powerTo} onChange={handleInputChange} />
      <label>Transmission:</label>
      <select name="transmission" value={formValues.transmission} onChange={handleInputChange} >
        <option value="">Transmission</option>
        <option value="Manual">Manual</option>
        <option value="Automatic">Automatic</option>
      </select>
      <label>Mileage:</label>
      <input type="text" placeholder="Mileage from" name="mileageFrom" value={formValues.mileageFrom} onChange={handleInputChange} />
      <input type="text" placeholder="Mileage to" name="mileageTo" value={formValues.mileageTo} onChange={handleInputChange} />
      <label>Price:</label>
      <input type="text" placeholder="Price from" name="priceFrom" value={formValues.priceFrom} onChange={handleInputChange} />
      <input type="text" placeholder="Price to" name="priceTo" value={formValues.priceTo} onChange={handleInputChange} />
      <label>Fuel type:</label>
      <select name="fuelType" value={formValues.fuelType} onChange={handleInputChange} >
        <option value="">Fuel Type</option>
        <option value="Gasoline">Gasoline</option>
        <option value="Electric">Electric</option>
      </select>
      <label>Condition:</label>
      <select name="condition" value={formValues.condition} onChange={handleInputChange} >
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
