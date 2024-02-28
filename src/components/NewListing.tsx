import React from "react";
import { useFormik, Formik, Form, Field, FormikHelpers } from "formik";
import LocationInput from "./LocationInput";
import makeModelCarsDataJson from "../testJsons/makeModelCars.json";
import * as Yup from "yup";

interface FormValues {
    title: string;
    make: string;
    model: string;
    price: number;
    description: string;
    photos: string[];
    year: number;
    mileage: number;
    vin_number: string;
    engine_capacity: number;
    fuel: string;
    transmission: string;
    steering: string;
    type: string;
    power: number;
    drive: string;
    doors: number;
    seats: number;
    registration_number: string;
    first_registration: string;
    condition: string;
    telephone_number: string;
    location: {
        type: string;
        coordinates: [number, number];
    };
}


const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required").max(100, "Title must be less than 100 characters"),
    make: Yup.string().required("Required"),
    model: Yup.string().required("Required"),
    price: Yup.number().required("Required").min(0, "Price must be greater than 0").max(100000000, "Price must be less than 100000000"),
    description: Yup.string().required("Required").max(3000, "Description must be less than 3000 characters"),
    photos: Yup.array().of(Yup.string().required("Required")).max(10, "Maximum 10 photos"),
    year: Yup.number().required("Required").min(1900, "Year must be greater than 1900").max(new Date().getFullYear(), "Year must be less than current year"),
    mileage: Yup.number().min(0, "Mileage must be greater than 0").max(1000000, "Mileage must be less than 1000000"),
    vin_number: Yup.string().max(17, "VIN number must be 17 characters"),
    engine_capacity: Yup.number().min(0, "Engine capacity must be greater than 0").max(10000, "Engine capacity must be less than 10000"),
    fuel: Yup.string(),
    transmission: Yup.string(),
    steering: Yup.string(),
    type: Yup.string(),
    power: Yup.number().min(0, "Power must be greater than 0").max(1000, "Power must be less than 1500"),
    drive: Yup.string(),
    doors: Yup.number().min(0, "Doors must be greater than 0").max(10, "Doors must be less than 10"),
    seats: Yup.number().min(0, "Seats must be greater than 0").max(10, "Seats must be less than 10"),
    registration_number: Yup.string().max(10, "Registration number must be less than 10 characters").min(3, "Registration number must be greater than 3 characters"),
    first_registration: Yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, "First registration must be in format YYYY-MM-DD"),
    condition: Yup.string(),
    telephone_number: Yup.string().min(9, "Telephone number must be at least 9 characters").max(15, "Telephone number must be less than 15 characters"),
    location: Yup.object().shape({
        type: Yup.string(),
        coordinates: Yup.array().of(Yup.number()),
    }),
});

export default function NewListing() {
  const formik = useFormik({
    initialValues: {
        title: "",
        make: "",
        model: "",
        price: 0,
        description: "",
        photos: [""],
        year: 0,
        mileage: 0,
        vin_number: "",
        engine_capacity: 0,
        fuel: "",
        transmission: "",
        steering: "",
        type: "",
        power: 0,
        drive: "",
        doors: 0,
        seats: 0,
        registration_number: "",
        first_registration: "",
        condition: "",
        telephone_number: "",
        location: {
            type: "Point",
            coordinates: [0, 0],
        },
    } as FormValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
        console.log(values);
        try{
            fetch(`${process.env.REACT_APP_CARS_ADD_ENDPOINT}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
                body: JSON.stringify(values),
            });
        }
        catch(error){
            console.error("Error:", error);
        }
    }
  });

  const handleLocationChange = (params: { position: [number, number] }) => {
    formik.setFieldValue("location", {
      type: "Point",
      coordinates: params.position,
    });
  };

  const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    formik.setFieldValue("make", event.target.value);
    formik.setFieldValue("model", "");
  };

  return (
    <div className="new-listing-page p-4">
      <h1 className="text-2xl font-bold mb-4">New Listing</h1>
      <form className="new-listing-form" onSubmit={formik.handleSubmit}>
        <label htmlFor="title" className="block mb-1 font-bold">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className="w-full border p-2 mb-2"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {formik.errors.title && <div className="text-red-500">{formik.errors.title}</div>}
        <label htmlFor="make" className="block mb-1 font-bold">Make</label>
        <select
          id="make"
          name="make"
          className="w-full border p-2 mb-2"
          onChange={handleMakeChange}
          value={formik.values.make}
        >
          <option value="">Select make</option>
          {makeModelCarsDataJson.map((make) => (
            <option key={make.make} value={make.make}>
              {make.make}
            </option>
          ))}
        </select>
        {formik.errors.make ? <div className="text-red-500">{formik.errors.make}</div> : null}
        <label htmlFor="model" className="block mb-1 font-bold">Model</label>
        <select
          id="model"
          name="model"
          className="w-full border p-2 mb-2"
          onChange={formik.handleChange}
          value={formik.values.model}
        >
          <option value="">Select model</option>
          {makeModelCarsDataJson
            .find((make) => make.make === formik.values.make)
            ?.models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
        </select>
        {formik.errors.model ? <div className="text-red-500">{formik.errors.model}</div> : null}
        <label htmlFor="price" className="block mb-1 font-bold">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          className="w-full border p-2 mb-2"
          onChange={formik.handleChange}
          value={formik.values.price}
        />
        {formik.errors.price ? <div className="text-red-500">{formik.errors.price}</div> : null}
        <label htmlFor="description" className="block mb-1 font-bold">Description</label>
        <textarea
          id="description"
          name="description"
          className="w-full border p-2 mb-2"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        {formik.errors.description ? <div className="text-red-500">{formik.errors.description}</div> : null}
        <label htmlFor="photos" className="block mb-1 font-bold">Photos</label>
        {formik.values.photos.map((photo, index) => (
            <div key={index} className="flex mb-2">
                <input
                key={index}
                type="text"
                value={photo}
                className="w-full border p-2 mb-2"
                onChange={(event) => {
                    const newPhotos = formik.values.photos.slice();
                    newPhotos[index] = event.target.value;
                    formik.setFieldValue("photos", newPhotos);
                } } />
                <button type="button" 
                className="border rounded p-3 mb-2 bg-red-500 text-white hover:bg-red-600 transition duration-300"
                onClick={() => {
                    const newPhotos = formik.values.photos.slice();
                    newPhotos.splice(index, 1);
                    formik.setFieldValue("photos", newPhotos);
                } }>x</button>
            </div>
        ))}
        <button
            type="button"
            className="border rounded p-3 mb-3 bg-green-500 text-white hover:bg-green-600 transition duration-300"
            onClick={() => {
                formik.setFieldValue("photos", formik.values.photos.concat(""));
            }}
        >
        +
        </button>
        {formik.errors.photos ? <div className="text-red-500">{formik.errors.photos}</div> : null}
        <label htmlFor="year" className="block mb-1 font-bold">Year</label>
        <input
          id="year"
          name="year"
          type="number"
          className="w-full border p-2 mb-2"
          onChange={formik.handleChange}
          value={formik.values.year}
        />
        {formik.errors.year ? <div className="text-red-500">{formik.errors.year}</div> : null}
        <label className="block mb-1 font-bold" htmlFor="mileage">Mileage</label>
        <input
          id="mileage"
          name="mileage"
          type="number"
          className="w-full border p-2 mb-2"
          onChange={formik.handleChange}
          value={formik.values.mileage}
        />
        {formik.errors.mileage ? <div className="text-red-500">{formik.errors.mileage}</div> : null}
        <label htmlFor="vin_number" className="block mb-1 font-bold">VIN number</label>
        <input
          id="vin_number"
          name="vin_number"
          type="text"
          className="w-full border p-2 mb-2"
          onChange={formik.handleChange}
          value={formik.values.vin_number}
        />
        {formik.errors.vin_number ? <div className="text-red-500">{formik.errors.vin_number}</div> : null}
        <label htmlFor="engine_capacity" className="block mb-1 font-bold">Engine capacity</label>
        <input
          id="engine_capacity"
          name="engine_capacity"
          type="number"
          className="w-full border p-2 mb-2"
          onChange={formik.handleChange}
          value={formik.values.engine_capacity}
        />
        {formik.errors.engine_capacity ? <div className="text-red-500">{formik.errors.engine_capacity}</div> : null}
        <label htmlFor="fuel" className="block mb-1 font-bold">Fuel</label>
        <select id="fuel" name="fuel" className="w-full border p-2 mb-2" onChange={formik.handleChange} value={formik.values.fuel}>
            <option value="">Select fuel</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="LPG">LPG</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Other">Other</option>
        </select>
        {formik.errors.fuel ? <div className="text-red-500">{formik.errors.fuel}</div> : null}
        <label htmlFor="transmission" className="block mb-1 font-bold">Transmission</label>
        <select
            id="transmission"
            name="transmission"
            className="w-full border p-2 mb-2"
            onChange={formik.handleChange}
            value={formik.values.transmission}
        >
            <option value="">Select transmission</option>
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
            <option value="semi-automatic">Semi-automatic</option>
            <option value="CVT">CVT</option>
            <option value="other">Other</option>
        </select>
        {formik.errors.transmission ? <div className="text-red-500">{formik.errors.transmission}</div> : null}
        <label htmlFor="steering" className="block mb-1 font-bold">Steering</label>
        <select
            id="steering"
            name="steering"
            className="w-full border p-2 mb-2"
            onChange={formik.handleChange}
            value={formik.values.steering}
        >
            <option value="">Select steering</option>
            <option value="Left">Left</option>
            <option value="Right">Right</option>
        </select>
        {formik.errors.steering ? <div className="text-red-500">{formik.errors.steering}</div> : null}
        <label htmlFor="type" className="block mb-1 font-bold">Type</label>
        <select
            id="type"
            name="type"
            className="w-full border p-2 mb-2"
            onChange={formik.handleChange}
            value={formik.values.type}
        >
            <option value="">Select type</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="SUV">SUV</option>
            <option value="Convertible">Convertible</option>
            <option value="Wagon">Wagon</option>
            <option value="Van">Van</option>
            <option value="Pickup">Pickup</option>
            <option value="Other">Other</option>
        </select>
        {formik.errors.type ? <div className="text-red-500">{formik.errors.type}</div> : null}
        <label htmlFor="power" className="block mb-1 font-bold">Power</label>
        <input
          id="power"
          name="power"
          type="number"
          className="w-full border p-2 mb-2"
          onChange={formik.handleChange}
          value={formik.values.power}
        />
        {formik.errors.power ? <div className="text-red-500">{formik.errors.power}</div> : null}
        <label htmlFor="drive" className="block mb-1 font-bold">Drive</label>
        <select id="drive" name="drive" className="w-full border p-2 mb-2" onChange={formik.handleChange} value={formik.values.drive}>
            <option value="">Drive</option>
            <option value="Front">Front</option>
            <option value="Rear">Rear</option>
            <option value="All">All</option>
        </select>
        <label htmlFor="doors" className="block mb-1 font-bold">Doors</label>
        <input
          id="doors"
          name="doors"
          type="number"
          className="w-full border p-2 mb-2"
          onChange={formik.handleChange}
          value={formik.values.doors}
        />
        {formik.errors.doors ? <div className="text-red-500">{formik.errors.doors}</div> : null}
        <label htmlFor="seats" className="block mb-1 font-bold">Seats</label>
        <input
          id="seats"
          name="seats"
          type="number"
          className="w-full border p-2 mb-2"
          onChange={formik.handleChange}
          value={formik.values.seats}
        />
        {formik.errors.seats ? <div className="text-red-500">{formik.errors.seats}</div> : null}
        <label htmlFor="registration_number" className="block mb-1 font-bold">Registration number</label>
        <input
          id="registration_number"
          name="registration_number"
          type="text"
          className="w-full border p-2 mb-2"
          onChange={formik.handleChange}
          value={formik.values.registration_number}
        />
        {formik.errors.registration_number ? <div className="text-red-500">{formik.errors.registration_number}</div> : null}
        <label htmlFor="first_registration" className="block mb-1 font-bold">First registration</label>
        <input
          id="first_registration"
          name="first_registration"
          type="date"
          className="w-full border p-2 mb-2"
          onChange={formik.handleChange}
          value={formik.values.first_registration}
        />
        <label htmlFor="condition" className="block mb-1 font-bold">Condition</label>
        <select
            id="condition"
            name="condition"
            className="w-full border p-2 mb-2"
            onChange={formik.handleChange}
            value={formik.values.condition}
        >
            <option value="">Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Damaged">Damaged</option>
        </select>
        <label htmlFor="telephone_number" className="block mb-1 font-bold">Telephone number</label>
        <input
          id="telephone_number"
          name="telephone_number"
          type="text"
          className="w-full border p-2 mb-2"
          onChange={formik.handleChange}
          value={formik.values.telephone_number}
        />
        {formik.errors.telephone_number ? <div className="text-red-500">{formik.errors.telephone_number}</div> : null}
        <LocationInput
          onLocationChange={handleLocationChange}
        />
        <button type="submit" className="border rounded p-2 bg-teal-500 text-black hover:bg-teal-600 transition duration-300 w-full font-bold">Submit</button>
      </form>
    </div>
  );
};