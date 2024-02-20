import React, {useState, useEffect} from "react";
import LocationInput from "./LocationInput";
import makeModelCarsDataJson from "../testJsons/makeModelCars.json";

interface CarData {
    make: string;
    models: string[];
}

export default function NewListing() {
    const [buyNowOrBid, setBuyNowOrBid] = useState("buyNow");
    const [carData, setCarData] = useState<CarData[]>([]);
    const [locationParams, setLocationParams] = useState<{ position: [number, number]}>({ position: [0,0]});
    const [photoLinks, setPhotoLinks] = useState<string[]>([""]);

    useEffect(() => {
        setCarData(makeModelCarsDataJson);
    }, []);

    const handleLocationChange = (params: { position: [number, number]}) => {
        setLocationParams(params);
        setFormValues({ ...formValues, location: { type: "Point", coordinates: params.position ? params.position : [params.position[0], params.position[1]] } });
    };

    const[formValues, setFormValues] = useState({
        title: "",
        make: "",
        model: "",
        photos: [""],
        type: "",
        year: 0,
        mileage: 0,
        price: 0,
        // startingPrice: "",
        // reservePrice: "",
        // endDate: "",
        // endTime: "",
        description: "",
        vin_number: "",
        engine_capacity: 0,
        fuel: "",
        power: 0,
        transmission: "",
        drive: "",
        steering: "",
        doors: 0,
        seats: 0,
        registration_number: "",
        first_registration: "",
        condition: "",
        location:{
            type: "Point",
            coordinates: [0,0],
        },
        telephone_number: "",
    });

    const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value, model: "" });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (e.target.name === "photos") {
            const photos = e.target.value.split(",");
            setFormValues({ ...formValues, [e.target.name]: photos });
            return;
        }
        if(e.target.name === "engine_capacity" || e.target.name === "power" || e.target.name === "doors" || e.target.name === "seats" || e.target.name === "year" || e.target.name === "mileage" || e.target.name === "price"){
            setFormValues({ ...formValues, [e.target.name]: parseInt(e.target.value) });
            return;
        }
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // setFormValues({ ...formValues, photos: photoLinks })
        // console.log(formValues);

        const fetchData = async () => {
            try{
                const response = await fetch(`http://localhost:4000/cars/add/me`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                    },
                    body: JSON.stringify(formValues),

                });
                const data = await response.json();
                console.log(data);
            }
            catch(error){
                console.log(error);
            }
        };
        fetchData();
    };

    const handlePhotoInputChange = (index: number, value: string) => {
        const newPhotoLinks = [...photoLinks];
        newPhotoLinks[index] = value;
        setPhotoLinks(newPhotoLinks);
        setFormValues({ ...formValues, photos: newPhotoLinks });
    };

    const handleAddInput = () => {
        setPhotoLinks([...photoLinks, ""]);
    };

    const handleRemoveInput = (index: number) => {
        const newPhotoLinks = [...photoLinks];
        newPhotoLinks.splice(index, 1);
        setPhotoLinks(newPhotoLinks);
        setFormValues({ ...formValues, photos: newPhotoLinks });
    };


    return(
        <div className='new-listing-page'>
            <h1>New Listing</h1>
            {/* <form className='new-listing-form' name="newListingForm" onSubmit={handleSubmit} encType="multipart/form-data"> */}
            <form className='new-listing-form' name="newListingForm" onSubmit={handleSubmit}>
            <label>Photos:</label>
                {photoLinks.map((link, index) => (
                    <div key={index} className="photo-input">
                        <input
                            type="text"
                            placeholder="Enter photo link"
                            value={link}
                            onChange={(e) => handlePhotoInputChange(index, e.target.value)}
                        />
                        {index > 0 && (
                            <button type="button" onClick={() => handleRemoveInput(index)}>
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={handleAddInput}>
                    Add Photo
                </button>
                <label>Title:</label>
                <input type='text' placeholder='Title' name="title" value={formValues.title} onChange={handleInputChange} />
                <label>Make:</label>
                <select value={formValues.make} name="make" onChange={handleMakeChange}>
                    <option value="">Make</option>
                    {carData.map((car) => (
                    <option key={car.make} value={car.make}>
                        {car.make}
                    </option>
                    ))}
                </select>

                <label>Model:</label>
                <select value={formValues.model} name="model" onChange={handleInputChange}>
                    <option value="">Model</option>
                    {carData
                    .find((car) => car.make === formValues.make)?.models.map((model) => (
                        <option key={model} value={model}>
                            {model}
                        </option>
                    ))}
                </select>
                <label>Type:</label>
                <select name="type" value={formValues.type} onChange={handleInputChange}>
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
                <input type='number' placeholder='Year' name="year" value={formValues.year} onChange={handleInputChange} />
                <label>Mileage:</label>
                <input type='number' placeholder='Mileage' name="mileage" value={formValues.mileage} onChange={handleInputChange} />
                <label>Buy now or bid:</label>
                <select value={buyNowOrBid} onChange={(event) => setBuyNowOrBid(event.target.value)}>
                    <option value='buyNow'>Buy now</option>
                    <option value='bid'>Bid</option>
                </select>
                {buyNowOrBid === "buyNow" ? (
                    <>
                    <label>Price:</label>
                    <input type='number' placeholder='Price' value={formValues.price} name="price" onChange={handleInputChange} />
                    </>
                    ) : (
                        <>
                        {/* <label>Starting price:</label>
                        <input type='text' placeholder='Starting price' name="startingPrice" value={formValues.startingPrice} onChange={handleInputChange} />
                        <label>Reserve price:</label>
                        <input type='text' placeholder='Reserve price' name="reservePrice" value={formValues.reservePrice} onChange={handleInputChange} />
                        <label>End date:</label>
                        <input type='date' placeholder='End date' name="endDate" value={formValues.endDate} onChange={handleInputChange} />
                        <label>End time:</label>
                        <input type='time' placeholder='End time' name="endTime" value={formValues.endTime} onChange={handleInputChange} /> */}
                        </>
                )}

                <label>Description:</label>
                <textarea placeholder='Description' name="description" value={formValues.description} onChange={handleInputChange} />
                <label>VIN number:</label>
                <input type='text' placeholder='VIN number' name="vin_number" value={formValues.vin_number} onChange={handleInputChange} />
                <label>Engine capacity:</label>
                <input type='number' placeholder='Engine capacity' name="engine_capacity" value={formValues.engine_capacity} onChange={handleInputChange} />
                <label>Fuel type:</label>
                <select name="fuel" value={formValues.fuel} onChange={handleInputChange}>
                    <option value="">Fuel Type</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="LPG">LPG</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Other">Other</option>
                </select>
                <label>Engine power:</label>
                <input type='number' placeholder='Engine power' name="power" value={formValues.power} onChange={handleInputChange} />
                <label>Transmission:</label>
                <select name="transmission" value={formValues.transmission} onChange={handleInputChange}>
                    <option value=''>Transmission</option>
                    <option value='Manual'>Manual</option>
                    <option value='Automatic'>Automatic</option>
                    <option value="CVT">CVT</option>
                    <option value="Other">Other</option>
                </select>
                <label>Drive:</label>
                <select name="drive" value={formValues.drive} onChange={handleInputChange}>
                    <option value=''>Drive</option>
                    <option value='Front'>Front</option>
                    <option value='Rear'>Rear</option>
                    <option value='All'>All</option>
                    <option value='Other'>Other</option>
                </select>
                <label>Steering:</label>
                <select name="steering" value={formValues.steering} onChange={handleInputChange}>
                    <option value=''>Steering</option>
                    <option value='Left'>Left</option>
                    <option value='Right'>Right</option>
                </select>
                <label>Doors:</label>
                <select name="doors" value={formValues.doors} onChange={handleInputChange}>
                    <option value=''>Doors</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='Other'>Other</option>
                </select>
                <label>Seats:</label>
                <select name="seats" value={formValues.seats} onChange={handleInputChange}>
                    <option value=''>Seats</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='Other'>Other</option>
                </select>
                <label>Registration number:</label>
                <input type='text' placeholder='Registration number' name="registration_number" value={formValues.registration_number} onChange={handleInputChange} />
                <label>First registration:</label>
                <input type='text' placeholder='First registration' name="first_registration" value={formValues.first_registration} onChange={handleInputChange} />
                <label>Condition:</label>
                <select name="condition" value={formValues.condition} onChange={handleInputChange}>
                    <option value=''>Condition</option>
                    <option value='New'>New</option>
                    <option value='Used'>Used</option>
                    <option value='Damaged'>Damaged</option>
                </select>
                <label>Location:</label>
                <LocationInput onLocationChange={handleLocationChange} />
                <label>Phone number:</label>
                <input type='text' placeholder='Phone Number' name="telephone_number" value={formValues.telephone_number} onChange={handleInputChange} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}