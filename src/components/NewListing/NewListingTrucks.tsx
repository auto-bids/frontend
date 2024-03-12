import React from "react";
import { useState, useEffect } from "react";
import LocationInput from "../Map/LocationInput";
import makeModelTrucks from "../../testJsons/makeModelTrucks.json";

interface MakeModelTrucks {
    make: string;
    models: string[];
}

export default function NewListingTrucks() {
    const [truckData, setMakeModelTrucks] = useState<MakeModelTrucks[]>([]);
    const [locationParams, setLocationParams] = useState<{ position: [number, number] | null }>({ position: null });

    useEffect(() => {
        setMakeModelTrucks(makeModelTrucks);
    }, []);

    const handleLocationChange = (params: { position: [number, number] | null }) => {
        setLocationParams(params);
    };

    const [formValues, setFormValues] = useState({
        title: "",
        make: "",
        model: "",
        application: "",
        year: "",
        mileage: "",
        price: "",
        description: "",
        condition: "",
        fuelType: "",
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
        <div className="new-listing-page">
            <form className="new-listing-form" name="new-listing-form" onSubmit={handleSubmit}>
                <label>Photos:</label>
                <input type='file' multiple accept="image/*" />
                <label>Title:</label>
                <input type='text' placeholder='Title' name="title" onChange={handleInputChange} value={formValues.title} />
                <label>Make:</label>
                <select value={formValues.make} name="make" onChange={handleMakeChange}>
                    <option value="">Make</option>
                    {truckData.map((truck) => (
                        <option key={truck.make} value={truck.make}>
                            {truck.make}
                        </option>
                    ))}
                </select>
                <label>Model:</label>
                <select value={formValues.model} name="model" onChange={handleInputChange}>
                    <option value="">Model</option>
                    {truckData
                        .filter((truck) => truck.make === formValues.make)
                        .map((truck) => truck.models.map((model) => <option key={model}>{model}</option>
                    ))}
                </select>
                <label>Application:</label>
                <select name="application" onChange={handleInputChange} value={formValues.application}>
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
                <input type="text" placeholder="Year" name="year" onChange={handleInputChange} value={formValues.year} />
                <label>Mileage:</label>
                <input type="text" placeholder="Mileage" name="mileage" onChange={handleInputChange} value={formValues.mileage} />
                <label>Price:</label>
                <input type="text" placeholder="Price" name="price" onChange={handleInputChange} value={formValues.price} />
                <label>Description:</label>
                <textarea placeholder="Description" name="description" onChange={handleInputChange} value={formValues.description} />
                <label>Condition:</label>
                <select name="condition" onChange={handleInputChange} value={formValues.condition}>
                    <option value="">Condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                    <option value="Damaged">Damaged</option>
                </select>
                <label>Fuel:</label>
                <select name="fuelType" onChange={handleInputChange} value={formValues.fuelType}>
                    <option value="">Fuel</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="LPG">LPG</option>
                    <option value="CNG">CNG</option>
                    <option value="LNG">LNG</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Other">Other</option>
                </select>
                <label>Location:</label>
                <LocationInput onLocationChange={handleLocationChange} />
                <label>Phone number:</label>
                <input type='text' placeholder='Phone Number' name="phoneNumber" onChange={handleInputChange} value={formValues.phoneNumber} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
