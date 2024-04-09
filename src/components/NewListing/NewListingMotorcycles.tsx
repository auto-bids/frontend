import React from "react";
import { useState, useEffect } from "react";
import { useFormik} from "formik";
import LocationInput from "../Map/LocationInput";
import makeModelMotorcycles from "../../testJsons/makeModelMotorcycles.json";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import LoadingOverlay from "../Other/LoadingOverlay";
import Autosuggest from "react-autosuggest";
import { useNavigate } from 'react-router-dom';
import { init } from "@emailjs/browser";

interface FormValues {
    make: string;
    model: string;
    title: string;
    description: string;
    photos: string[];
    type:  string;
    year: number;
    mileage: number;
    vin_number: string;
    price: number;
    fuel: string;
    transmission: string;
    engine_capacity: number;
    power: number;
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
    make: Yup.string().required("Make is required"),
    model: Yup.string().required("Model is required"),
    type: Yup.string().required("Type is required"),
    year: Yup.number().required("Year is required"),
    mileage: Yup.number().required("Mileage is required"),
    vin_number: Yup.string().required("VIN number is required"),
    price_min: Yup.number().required("Price is required"),
    fuel: Yup.string().required("Fuel is required"),
    transmission: Yup.string().required("Transmission is required"),
    engine_capacity: Yup.number().required("Engine capacity is required"),
    power: Yup.number().required("Power is required"),
    condition: Yup.string().required("Condition is required"),
    registration_number: Yup.string().required("Registration number is required"),
    first_registration: Yup.string().required("First registration is required"),
    telephone_number: Yup.string().required("Telephone number is required"),
    location: Yup.object().shape({
        type: Yup.string().required("Location type is required"),
        coordinates: Yup.array().of(Yup.number()).required("Location coordinates are required"),
    }),
});

export default function NewListingMotorcycles() {
    const [tempPhotos, setTempPhotos] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [tempMake, setTempMake] = useState("");
    const [tempModel, setTempModel] = useState("");
    const [renderMakeSuggestions, setRenderMakeSuggestions] = useState(false);
    const [renderModelSuggestions, setRenderModelSuggestions] = useState(false);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            make: "",
            model: "",
            title: "",
            description: "",
            photos: [],
            type: "",
            year: 0,
            mileage: 0,
            vin_number: "",
            price: 0,
            fuel: "",
            transmission: "",
            engine_capacity: 0,
            power: 0,
            condition: "",
            registration_number: "",
            first_registration: "",
            telephone_number: "",
            location: {
                type: "",
                coordinates: [0, 0],
            },
        } as FormValues,
        validationSchema: validationSchema,
        onSubmit: (values) =>{
            handleSubmit();
        }
    });

    const handleLocationChange = (params: { position: [number, number] }) => {
        formik.setFieldValue("location", {
          type: "Point",
          coordinates: params.position,
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
          const uploadedPhotoUrls = await Promise.all(
            tempPhotos.map(async (file) => {
              if (file instanceof File) {
              const formData = new FormData();
              formData.append("file", file);
              formData.append("upload_preset", `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);
              const response = await fetch(`${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData,
              });
              const data = await response.json();
              return data.secure_url;
              }
            })
          );
          const filteredUploadedPhotoUrls = uploadedPhotoUrls.filter((photo) => photo !== undefined);
          const valuesWithPhotos = { ...formik.values, photos: filteredUploadedPhotoUrls };
          await fetch(`${process.env.REACT_APP_MOTORCYCLES_ADD_ENDPOINT}`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
            },
            body: JSON.stringify(valuesWithPhotos),
          });
    
          setTempPhotos([]);
        } catch (error) {
          console.error("Error:", error);
        }
        finally {
          await new Promise(resolve => setTimeout(resolve, 2000));
          setLoading(false);
          navigate("/");
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = event.target.files?.[0];
        const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!file || !allowedFileTypes.includes(file.type)) {
          alert("Invalid file type. Please upload a JPEG or PNG image.");
          return;
        }
        if (file.size > 10 * 1024 * 1024) {
          alert("File size too large. Please upload a file smaller than 10MB.");
          return;
        }
        if (file) {
          setTempPhotos((prevPhotos) => {
            const newPhotos = [...prevPhotos];
            newPhotos[index] = file;
            return newPhotos;
          });
        }
    };

    const handleRemoveTempPhoto = (index: number) => {
        setTempPhotos((prevPhotos) => {
          const newPhotos = [...prevPhotos];
          newPhotos.splice(index, 1);
          return newPhotos;
        });
    };
    
      const handleAddTempPhoto = () => {
        if (tempPhotos.length >= 10) {
          alert("Maximum 10 photos allowed");
          return;
        }
        setTempPhotos((prevPhotos) => [...prevPhotos, new File([""], `temp${prevPhotos.length}`)]);
    };

    const getMakeSuggestions = (value: string) => {
        if (value === "") {
          return makeModelMotorcycles.map((make) => make.make);
        }
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0
          ? []
          : makeModelMotorcycles
              .map((make) => make.make)
              .filter((make) => make.toLowerCase().slice(0, inputLength) === inputValue);
      };
    
      const getModelSuggestions = (value: string) => {
        if (value === "") {
          return makeModelMotorcycles
            .filter((make) => make.make === formik.values.make)
            .map((model) => model.models)
            .flat();
        }
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0
          ? []
          : makeModelMotorcycles
              .filter((make) => make.make === formik.values.make)
              .map((model) => model.models)
              .flat()
              .filter((model) => model.toLowerCase().slice(0, inputLength) === inputValue);
      };
    
      const getSuggestionValue = (suggestion: string) => suggestion;
    
      const renderMakeSuggestion = (suggestion: string) => (
        <div onClick={() => {formik.setFieldValue("make", suggestion); formik.setFieldValue("model", ""); setTempMake(suggestion)}}>
          {suggestion}
        </div>
    );
    
      const renderModelSuggestion = (suggestion: string) => (
        <div onClick={() => {formik.setFieldValue("model", suggestion); setTempModel(suggestion); setRenderModelSuggestions(false)}}>
          {suggestion}
        </div>
    );
    
    const handleResetMake = (): void => {
        setTempMake("");
        setTempModel("");
        formik.setFieldValue("make", "");
    }
    
      const handleResetModel = (): void => {
        setTempModel("");
        formik.setFieldValue("model", "");
    }

        return (
        <div className="new-listing-page p-4">
          {loading && <LoadingOverlay />}
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
            <div className="relative">
              <Autosuggest
                suggestions={getMakeSuggestions(tempMake)}
                onSuggestionsFetchRequested={({ value }) => setTempMake(value)}
                onSuggestionsClearRequested={() => setTempMake("")}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderMakeSuggestion}
                inputProps={{
                  placeholder: "Make",
                  name: "make",
                  value: formik.values.make? formik.values.make : tempMake,
                  className: "w-full border p-2 mb-2",
                  onChange: (e, { newValue }) => setTempMake(newValue),
                  onFocus: () => { setRenderMakeSuggestions(true); setRenderModelSuggestions(false)},
                  onBlur: () => { setRenderMakeSuggestions(false); setRenderModelSuggestions(false); setTempModel("") },
                }}
                alwaysRenderSuggestions={renderMakeSuggestions}
                theme={{
                  container: "relative",
                  input: "form-input border rounded p-2 w-full",
                  suggestionsContainer: "absolute z-10 bg-white w-full max-h-60 overflow-y-auto",
                  suggestionsList: "p-2 bg-gray-100",
                  suggestion: "p-2 cursor-pointer hover:bg-gray-200",
                  
                }}
              />
              {formik.values.make && (
                <button onClick={handleResetMake} className="absolute inset-y-0 right-0 px-2 text-gray-400 hover:text-red-600 focus:outline-none justify-center items-center">
                X
                </button>
              )}
            </div>
            {formik.errors.make ? <div className="text-red-500">{formik.errors.make}</div> : null}
            <label htmlFor="model" className="block mb-1 font-bold">Model</label>
            <div className="relative">
              <Autosuggest
                suggestions={getModelSuggestions(tempModel)}
                onSuggestionsFetchRequested={({ value }) => setTempModel(value)}
                onSuggestionsClearRequested={() => setTempModel("")}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderModelSuggestion}
                inputProps={{
                  placeholder: "Model",
                  name: "model",
                  value: formik.values.model? formik.values.model : tempModel,
                  className: "w-full border p-2 mb-2",
                  onChange: (e, { newValue }) => setTempModel(newValue),
                  onFocus: () => { setRenderModelSuggestions(true); setRenderMakeSuggestions(false)},
                  onBlur: () => { setRenderModelSuggestions(false); setRenderMakeSuggestions(false) },
                  disabled: !formik.values.make,
                }}
                alwaysRenderSuggestions={renderModelSuggestions}
                theme={{
                  container: "relative",
                  input: "form-input border rounded p-2 w-full",
                  suggestionsContainer: "absolute z-10 bg-white w-full max-h-60 overflow-y-auto",
                  suggestionsList: "p-2 bg-gray-100",
                  suggestion: "p-2 cursor-pointer hover:bg-gray-200",
                }}
              />
              {formik.values.model && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-2 text-gray-400 hover:text-red-600 focus:outline-none justify-center items-center"
                  onClick={handleResetModel}
                >
                  X
                </button>
              )}
            </div>
            {formik.errors.model ? <div className="text-red-500">{formik.errors.model}</div> : null}
            <label htmlFor="price" className="block mb-1 font-bold">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              className="w-full border p-2 mb-2"
              pattern="[0-9]*"
              inputMode="numeric"
              onWheel={(e) => e.currentTarget.blur()}
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
            {tempPhotos.map((photo, index) => (
                <div key={index} className="flex mb-2">
                    <input
                    type="file"
                    className="w-full border p-2 mb-2"
                    onChange={(event) => handleFileChange(event, index)}
                    />
                    <button type="button" 
                    className="border rounded p-3 mb-2 bg-red-500 text-white hover:bg-red-600 transition duration-300"
                    onClick={() => handleRemoveTempPhoto(index)}>
                    x</button>
                </div>
            ))}
            <button
                type="button"
                className="border rounded p-3 mb-3 bg-green-500 text-white hover:bg-green-600 transition duration-300"
                onClick={handleAddTempPhoto}
            >
            +
            </button>
            {formik.errors.photos ? <div className="text-red-500">{formik.errors.photos}</div> : null}
            <label htmlFor="year" className="block mb-1 font-bold">Year</label>
            <input
              id="year"
              name="year"
              type="number"
              pattern="[0-9]*"
              inputMode="numeric"
              onWheel={(e) => e.currentTarget.blur()}
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
              pattern="[0-9]*"
              inputMode="numeric"
              onWheel={(e) => e.currentTarget.blur()}
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
              pattern="[0-9]*"
              inputMode="numeric"
              onWheel={(e) => e.currentTarget.blur()}
              className="w-full border p-2 mb-2"
              onChange={formik.handleChange}
              value={formik.values.engine_capacity}
            />
            {formik.errors.engine_capacity ? <div className="text-red-500">{formik.errors.engine_capacity}</div> : null}
            <label htmlFor="fuel" className="block mb-1 font-bold">Fuel</label>
            <select id="fuel" name="fuel" className="w-full border p-2 mb-2" onChange={formik.handleChange} value={formik.values.fuel}>
                <option value="">Fuel</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
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
                <option value="">Transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
                <option value="CVT">CVT</option>
            </select>
            {formik.errors.transmission ? <div className="text-red-500">{formik.errors.transmission}</div> : null}
            <label htmlFor="type" className="block mb-1 font-bold">Type</label>
            <select
                id="type"
                name="type"
                className="w-full border p-2 mb-2"
                onChange={formik.handleChange}
                value={formik.values.type}
            >
                <option value="">Type</option>
                <option value="Sport">Sport</option>
                <option value="Touring">Touring</option>
                <option value="Cruiser">Cruiser</option>
                <option value="Dirt">Dirt</option>
                <option value="Scooter">Scooter</option>
                <option value="Naked">Naked</option>
                <option value="Adventure">Adventure</option>
                <option value="Custom">Custom</option>
            </select>
            {formik.errors.type ? <div className="text-red-500">{formik.errors.type}</div> : null}
            <label htmlFor="power" className="block mb-1 font-bold">Power</label>
            <input
              id="power"
              name="power"
              type="number"
              pattern="[0-9]*"
              inputMode="numeric"
              onWheel={(e) => e.currentTarget.blur()}
              className="w-full border p-2 mb-2"
              onChange={formik.handleChange}
              value={formik.values.power}
            />
            {formik.errors.power ? <div className="text-red-500">{formik.errors.power}</div> : null}
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
}