import React from "react";
import LocationInput from "./LocationInput";
import {useState, useEffect} from "react";
import makeModelTrailers from "../testJsons/makeModelTrailers.json";

export default function NewListingTrailers(){
    const [trailerMakes, setTrailerMakes] = useState<string[]>([]);
    const [locationParams, setLocationParams] = useState<{ position: [number, number] | null;}>({ position: null });

    useEffect(() => {
        setTrailerMakes(makeModelTrailers);
    }, []);

    const handleLocationChange = (params: { position: [number, number] | null}) => {
        setLocationParams(params);
    }

    const [formValues, setFormValues] = useState({
        title: "",
        make: "",
        model: "",
        application: "",
        year: "",
        price: "",
        condition: "",
        description: "",
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

    return(
        <div className='new-listing-page'>
            <form className='new-listing-form' name="new-listing-form" onSubmit={handleSubmit}>
                <label>Photos:</label>
                <input type='file' multiple accept="image/*" />
                <label>Title:</label>
                <input type='text' placeholder='Title' name="title" onChange={handleInputChange} value={formValues.title} />
                <label>Make:</label>
                <select name="make" onChange={handleInputChange} value={formValues.make}>
                    <option value="">Make</option>
                    {trailerMakes.map((trailer) => (
                        <option key={trailer} value={trailer}>
                            {trailer}
                        </option>
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
                </select>
                <label>Model:</label>
                <input type="text" placeholder="Model" name="model" onChange={handleInputChange} value={formValues.model} />
                <label>Year:</label>
                <input type="text" placeholder="Year" name="year" onChange={handleInputChange} value={formValues.year} />
                <label>Price:</label>
                <input type="text" placeholder="Price" name="price" onChange={handleInputChange} value={formValues.price} />
                <label>Condition:</label>
                <select name="condition" onChange={handleInputChange} value={formValues.condition}>
                    <option value="">Condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                    <option value="Damaged">Damaged</option>
                </select>
                <label>Description:</label>
                <textarea placeholder="Description" name="description" onChange={handleInputChange} value={formValues.description} />
                <label>Location:</label>
                <LocationInput onLocationChange={handleLocationChange} />
                <label>Phone number:</label>
                <input type="text" placeholder="Phone number" name="phoneNumber" onChange={handleInputChange} value={formValues.phoneNumber} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}