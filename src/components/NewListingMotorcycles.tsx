import React from "react";
import { useState, useEffect } from "react";
import LocationInput from "./LocationInput";
import makeModelMotorcycles from "../testJsons/makeModelMotorcycles.json";

interface MakeModelMotorcycles {
    make: string;
    models: string[];
}

export default function NewListingMotorcycles() {
    const [motorcycleData, setMakeModelMotorcycles] = useState<MakeModelMotorcycles[]>([]);
    const [locationParams, setLocationParams] = useState<{ position: [number, number] | null;}>({ position: null });

    useEffect(() => {
        setMakeModelMotorcycles(makeModelMotorcycles);
    }, []);

    const handleLocationChange = (params: { position: [number, number] | null}) => {
        setLocationParams(params);
    };

    const [formValues, setFormValues] = useState({
        title: "",
        make: "",
        model: "",
        type: "",
        year: "",
        mileage: "",
        price: "",
        description: "",
        vinNumber: "",
        engineCapacity: "",
        fuelType: "",
        power: "",
        transmission: "",
        drive: "",
        registrationNumber: "",
        firstRegistration: "",
        condition: "",
        location: "",
        phoneNumber: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formValues);
    };

    const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value, model: "" });
    };

    return(
        <div className='new-listing-page'>
            <h1>New Listing</h1>
            <form className='new-listing-form' name="new-listing-form" onSubmit={handleSubmit}>
                <label>Photos:</label>
                <input type='file' multiple accept="image/*" />
                <label>Title:</label>
                <input type='text' placeholder='Title' name="title" onChange={handleInputChange} value={formValues.title} />
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
                    .find((motorcycle) => motorcycle.make === formValues.make)?.models.map((model) => (
                        <option key={model} value={model}>
                        {model}
                        </option>
                    ))}
                </select>
                <label>Type:</label>
                <select name='type' onChange={handleInputChange} value={formValues.type}>
                    <option value=''>Type</option>
                    <option value='Sportbike'>Sportbike</option>
                    <option value='Cruiser'>Cruiser</option>
                    <option value='Dirt Bike'>Dirt Bike</option>
                </select>
                <label>Year:</label>
                <input type='text' placeholder='Year' name='year' onChange={handleInputChange} value={formValues.year} />
                <label>Mileage:</label>
                <input type='text' placeholder='Mileage' name='mileage' onChange={handleInputChange} value={formValues.mileage} />
                <label>Price:</label>
                <input type='text' placeholder='Price' name='price' onChange={handleInputChange} value={formValues.price} />
                <label>Description:</label>
                <textarea placeholder="Description" name="description" onChange={handleInputChange} value={formValues.description} />
                <label>VIN number:</label>
                <input type='text' placeholder='VIN number' name="vinNumber" onChange={handleInputChange} value={formValues.vinNumber} />
                <label>Engine capacity:</label>
                <input type='text' placeholder='Engine capacity' name="engineCapacity" onChange={handleInputChange} value={formValues.engineCapacity} />
                <label>Fuel type:</label>
                <select name='fuelType' onChange={handleInputChange} value={formValues.fuelType}>
                    <option value=''>Fuel type</option>
                    <option value='Petrol'>Petrol</option>
                    <option value='Diesel'>Diesel</option>
                    <option value='Electric'>Electric</option>
                </select>
                <label>Engine power:</label>
                <input type='text' placeholder='Engine power' />
                <label>Transmission:</label>
                <select name="transmission" onChange={handleInputChange} value={formValues.transmission}>
                    <option value=''>Transmission</option>
                    <option value='Manual'>Manual</option>
                    <option value='Automatic'>Automatic</option>
                </select>
                <label>Drive type:</label>
                <select name='drive' onChange={handleInputChange} value={formValues.drive}>
                    <option value=''>Drive type</option>
                    <option value='Chain'>Chain</option>
                    <option value='Belt'>Belt</option>
                    <option value='Shaft'>Shaft</option>
                </select>
                <label>Registration number:</label>
                <input type='text' placeholder='Registration number' name="registrationNumber" onChange={handleInputChange} value={formValues.registrationNumber} />
                <label>First registration:</label>
                <input type='text' placeholder='First registration' name="firstRegistration" onChange={handleInputChange} value={formValues.firstRegistration} />
                <select name="condition" onChange={handleInputChange} value={formValues.condition}>
                    <option value=''>Condition</option>
                    <option value='New'>New</option>
                    <option value='Used'>Used</option>
                    <option value='Damaged'>Damaged</option>
                </select>
                <label>Location:</label>
                <LocationInput onLocationChange={handleLocationChange} />
                <label>Phone number:</label>
                <input type='text' placeholder='Phone Number' name="phoneNumber" onChange={handleInputChange} value={formValues.phoneNumber} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}