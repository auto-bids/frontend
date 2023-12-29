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
    const [locationParams, setLocationParams] = useState<{ position: [number, number] | null;}>({ position: null });

    useEffect(() => {
        setMakeModelDeliveryVans(makeModelDeliveryVans);
    }, []);

    const handleLocationChange = (params: { position: [number, number] | null}) => {
        setLocationParams(params);
    };

    const [formValues, setFormValues] = useState({
        title: "",
        make: "",
        model: "",
        year: "",
        mileage: "",
        price: "",
        description: "",
        fuelType: "",
        transmission: "",
        drive: "",
        steering: "",
        engineCapacity: "",
        power: "",
        registrationNumber: "",
        firstRegistration: "",
        vinNumber: "",
        condition: "",
        doors: "",
        seats: "",
        pgw: "",
        maximumLoad: "",
        capacity: "",
        location: "",
        phoneNumber: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formValues);
    }

    const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value, model: "" });
    }

    return(
        <div className="new-listing-page">
            <form className="new-listing-form" name="new-listing-form" onSubmit={handleSubmit}>
                <label>Photos:</label>
                <input type='file' multiple accept="image/*" />
                <label>Title:</label>
                <input type='text' placeholder='Title' name="title" onChange={handleInputChange} value={formValues.title} />
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
                    .find((deliveryVan) => deliveryVan.make === formValues.make)?.models.map((model) => (
                        <option key={model} value={model}>
                            {model}
                        </option>
                    ))}
                </select>
                <label>Year:</label>
                <input type="text" placeholder="Year" name="year" onChange={handleInputChange} value={formValues.year} />
                <label>Mileage:</label>
                <input type="text" placeholder="Mileage" name="mileage" onChange={handleInputChange} value={formValues.mileage} />
                <label>Price:</label>
                <input type="text" placeholder="Price" name="price" onChange={handleInputChange} value={formValues.price} />
                <label>Description:</label>
                <textarea placeholder="Description" name="description" onChange={handleInputChange} value={formValues.description} />
                <label>Fuel type:</label>
                <select name="fuelType" onChange={handleInputChange} value={formValues.fuelType}>
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
                <select name="transmission" onChange={handleInputChange} value={formValues.transmission}>
                    <option value="">Transmission</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Semi-automatic">Semi-automatic</option>
                </select>
                <label>Drive</label>
                <select name="drive" onChange={handleInputChange} value={formValues.drive}>
                    <option value="">Drive</option>
                    <option value="Front">Front</option>
                    <option value="Rear">Rear</option>
                    <option value="All">All</option>
                </select>
                <label>Steering:</label>
                <select name="steering" onChange={handleInputChange} value={formValues.steering}>
                    <option value="">Steering</option>
                    <option value="Left">Left</option>
                    <option value="Right">Right</option>
                </select>
                <label>Engine capacity:</label>
                <input type="text" placeholder="Engine capacity" name="engineCapacity" onChange={handleInputChange} value={formValues.engineCapacity} />
                <label>Power:</label>
                <input type="text" placeholder="Power" name="power" onChange={handleInputChange} value={formValues.power} />
                <label>Registration number</label>
                <input type="text" placeholder="Registration number" name="registrationNumber" onChange={handleInputChange} value={formValues.registrationNumber} />
                <label>First registration:</label>
                <input type="text" placeholder="First registration" name="firstRegistration" onChange={handleInputChange} value={formValues.firstRegistration} />
                <label>VIN number:</label>
                <input type="text" placeholder="Vin number" name="vinNumber" onChange={handleInputChange} value={formValues.vinNumber} />
                <label>Condition:</label>
                <select name="condition" onChange={handleInputChange} value={formValues.condition}>
                    <option value="">Condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                    <option value="Damaged">Damaged</option>
                </select>
                <label>Doors:</label>
                <select name="doors" onChange={handleInputChange} value={formValues.doors}>
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
                <select name="seats" onChange={handleInputChange} value={formValues.seats}>
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
                <input type="text" placeholder="PGW from" name="pgw" onChange={handleInputChange} value={formValues.pgw} />
                <input type="text" placeholder="PGW to" name="pgw" onChange={handleInputChange} value={formValues.pgw} />
                <label>Maximum Load</label>
                <input type="text" placeholder="Maximum Load from" name="maximumLoad" onChange={handleInputChange} value={formValues.maximumLoad} />
                <input type="text" placeholder="Maximum Load to" name="maximumLoad" onChange={handleInputChange} value={formValues.maximumLoad} />
                <label>Capacity:</label>
                <input type="text" placeholder="Capacity from" name="capacity" onChange={handleInputChange} value={formValues.capacity} />
                <input type="text" placeholder="Capacity to" name="capacity" onChange={handleInputChange} value={formValues.capacity} />
                <label>Location:</label>
                <LocationInput onLocationChange={handleLocationChange} />
                <label>Phone number:</label>
                <input type='text' placeholder='Phone Number' name="phoneNumber" onChange={handleInputChange} value={formValues.phoneNumber} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}