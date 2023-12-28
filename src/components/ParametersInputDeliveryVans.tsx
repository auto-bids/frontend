import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LocationInputSearch from "./LocationInputSearch";
import deliveryVanDataJson from "../testJsons/makeModelDeliveryVans.json";

export default function ParametersInputDeliveryVans({showAllFields}: {showAllFields: boolean}) {
  const [deliveryVanData, setDeliveryVanData] = useState(deliveryVanDataJson);
  // const [selectedMake, setSelectedMake] = useState("");
  // const [selectedModel, setSelectedModel] = useState("");
  const [locationParams, setLocationParams] = useState<{ position: [number, number] | null; radius: number }>({ position: null, radius: 100000 });
  const [locationVisible, setLocationVisible] = useState(false);
    
  const handleLocationVisibleChange = () => {
    setLocationVisible(!locationVisible);
    setLocationParams({ position: null, radius: 100000 });
  };

  useEffect(() => {
    setDeliveryVanData(deliveryVanDataJson);
  }, []);

  const handleLocationChange = (params: { position: [number, number] | null; radius: number }) => {
    setLocationParams(params);
  };

  const [formValues, setFormValues] = useState({
    make: "",
    model: "",
    yearFrom: "",
    yearTo: "",
    mileageFrom: "",
    mileageTo: "",
    priceFrom: "",
    priceTo: "",
    fuelType: "",
    transmission: "",
    drive: "",
    steering: "",
    engineCapacityFrom: "",
    engineCapacityTo: "",
    powerFrom: "",
    powerTo: "",
    condition: "",
    doors: "",
    seats: "",
    pgwFrom: "",
    pgwTo: "",
    maximumLoadFrom: "",
    maximumLoadTo: "",
    capacityFrom: "",
    capacityTo: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value, model: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchPath = "/search/delivery-vans";
    const queryParams = new URLSearchParams();
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
    <form className="parameters-input-main" onSubmit={handleSubmit}>
      <label>Make:</label>
      <select value={formValues.make} name="make" onChange={handleMakeChange}>
        <option value="">Make</option>
        {deliveryVanData.map((deliveryVan) => (
          <option key={deliveryVan.make} value={deliveryVan.make}>
            {deliveryVan.make}
          </option>
        ))}
      </select>
      <label>Model:</label>
      <select value={formValues.model} name="model" onChange={handleInputChange}>
        <option value="">Model</option>
        {deliveryVanData
          .find((deliveryVan) => deliveryVan.make === formValues.make)
          ?.models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
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
      <label>Fuel Type:</label>
      <select name="fuelType" value={formValues.fuelType} onChange={handleInputChange}>
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
      <select name="transmission" value={formValues.transmission} onChange={handleInputChange}>
        <option value="">Transmission</option>
        <option value="Manual">Manual</option>
        <option value="Automatic">Automatic</option>
        <option value="Semi-automatic">Semi-automatic</option>
      </select>
      <label>Drive:</label>
      <select name="drive" value={formValues.drive} onChange={handleInputChange}>
        <option value="">Drive</option>
        <option value="Front">Front</option>
        <option value="Rear">Rear</option>
        <option value="All">All</option>
      </select>
      <label>Steering:</label>
      <select name="steering" value={formValues.steering} onChange={handleInputChange}>
        <option value="">Steering</option>
        <option value="Left">Left</option>
        <option value="Right">Right</option>
      </select>
      <label>Engine capacity:</label>
      <input type="text" placeholder="Engine capacity from" name="engineCapacityFrom" value={formValues.engineCapacityFrom} onChange={handleInputChange} />
      <input type="text" placeholder="Engine capacity to" name="engineCapacityTo" value={formValues.engineCapacityTo} onChange={handleInputChange} />
      <label>Power:</label>
      <input type="text" placeholder="Power from" name="powerFrom" value={formValues.powerFrom} onChange={handleInputChange} />
      <input type="text" placeholder="Power to" name="powerTo" value={formValues.powerTo} onChange={handleInputChange} />
      <label>Condition:</label>
      <select name="condition" value={formValues.condition} onChange={handleInputChange}>
        <option value="">Condition</option>
        <option value="New">New</option>
        <option value="Used">Used</option>
        <option value="Damaged">Damaged</option>
      </select>
      <label>Doors:</label>
      <select name="doors" value={formValues.doors} onChange={handleInputChange}>
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
      <select name="seats" value={formValues.seats} onChange={handleInputChange}>
        <option value="">Seats</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value='9+'>9+</option>
      </select>
      <label>Permissible Gross Weight</label>
      <input type="text" placeholder="PGW from" name="pgwFrom" value={formValues.pgwFrom} onChange={handleInputChange} />
      <input type="text" placeholder="PGW to" name="pgwTo" value={formValues.pgwTo} onChange={handleInputChange} />
      <label>Maximum Load</label>
      <input type="text" placeholder="Maximum Load from" name="maximumLoadFrom" value={formValues.maximumLoadFrom} onChange={handleInputChange} />
      <input type="text" placeholder="Maximum Load to" name="maximumLoadTo" value={formValues.maximumLoadTo} onChange={handleInputChange} />
      <label>Capacity:</label>
      <input type="text" placeholder="Capacity from" name="capacityFrom" value={formValues.capacityFrom} onChange={handleInputChange} />
      <input type="text" placeholder="Capacity to" name="capacityTo" value={formValues.capacityTo} onChange={handleInputChange} />
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
      <button type="submit">Search</button>
    </form>
  );
}
