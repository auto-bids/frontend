import React, {useState, useEffect} from "react";
import LocationInput from "./LocationInput";
import makeModelCarsDataJson from "../testJsons/makeModelCars.json";

interface CarData {
    make: string;
    models: string[];
}

export default function NewListing() {
    const [carData, setCarData] = useState<CarData[]>([]);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    
    useEffect(() => {
        setCarData(makeModelCarsDataJson);
    }, []);

    const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMake(event.target.value);
        setSelectedModel("");
    };
    return(
        <div className='new-listing-page'>
            <h1>New Listing</h1>
            <div className='new-listing-form'>
                <label>Photos:</label>
                <input type='file' multiple accept="image/*" />
                <label>Title:</label>
                <input type='text' placeholder='Title' />
                <label>Make:</label>
                <select value={selectedMake} onChange={handleMakeChange}>
                    <option value="">Make</option>
                    {carData.map((car) => (
                    <option key={car.make} value={car.make}>
                        {car.make}
                    </option>
                    ))}
                </select>

                <label>Model:</label>
                <select value={selectedModel} onChange={(event) => setSelectedModel(event.target.value)}>
                    <option value="">Model</option>
                    {carData
                    .find((car) => car.make === selectedMake)?.models.map((model) => (
                        <option key={model} value={model}>
                        {model}
                        </option>
                    ))}
                </select>
                <label>Type:</label>
                <select>
                    <option value=''>Type</option>
                    <option value='Sedan'>Sedan</option>
                    <option value='Station Wagon'>Station Wagon</option>
                    <option value='Hatchback'>Hatchback</option>
                    <option value='SUV'>SUV</option>
                    <option value='Van'>Van</option>
                    <option value='Cabriolet'>Cabriolet</option>
                    <option value='Coupe'>Coupe</option>
                    <option value='Other'>Other</option>
                </select>
                <label>Year:</label>
                <input type='text' placeholder='Year' />
                <label>Mileage:</label>
                <input type='text' placeholder='Mileage' />
                <label>Price:</label>
                <input type='text' placeholder='Price' />
                <label>Description:</label>
                <textarea placeholder='Description' />
                <label>VIN number:</label>
                <input type='text' placeholder='VIN number' />
                <label>Engine capacity:</label>
                <input type='text' placeholder='Engine capacity' />
                <label>Fuel type:</label>
                <select>
                    <option value="">Fuel Type</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="LPG">LPG</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Other">Other</option>
                </select>
                <label>Engine power:</label>
                <input type='text' placeholder='Engine power' />
                <label>Transmission:</label>
                <select>
                    <option value=''>Transmission</option>
                    <option value='Manual'>Manual</option>
                    <option value='Automatic'>Automatic</option>
                    <option value="CVT">CVT</option>
                    <option value="Other">Other</option>
                </select>
                <label>Drive:</label>
                <select>
                    <option value=''>Drive</option>
                    <option value='Front'>Front</option>
                    <option value='Rear'>Rear</option>
                    <option value='All'>All</option>
                    <option value='Other'>Other</option>
                </select>
                <label>Steering:</label>
                <select>
                    <option value=''>Steering</option>
                    <option value='Left'>Left</option>
                    <option value='Right'>Right</option>
                </select>
                <label>Doors:</label>
                <select>
                    <option value=''>Doors</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='Other'>Other</option>
                </select>
                <label>Seats:</label>
                <select>
                    <option value=''>Seats</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='Other'>Other</option>
                </select>
                <label>Registration number:</label>
                <input type='text' placeholder='Registration number' />
                <label>First registration:</label>
                <input type='text' placeholder='First registration' />
                <label>Condition:</label>
                <select>
                    <option value=''>Condition</option>
                    <option value='New'>New</option>
                    <option value='Used'>Used</option>
                    <option value='Damaged'>Damaged</option>
                </select>
                <label>Location:</label>
                <LocationInput />
                <label>Phone number:</label>
                <input type='text' placeholder='Phone Number' />
                <button>Submit</button>
            </div>
        </div>
    )
}