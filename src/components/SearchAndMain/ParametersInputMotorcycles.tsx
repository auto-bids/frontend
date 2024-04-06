import React, { useState, useEffect } from "react";
import LocationInputSearch from "../Map/LocationInputSearch";
import motorcycleDataJson from "../../testJsons/makeModelMotorcycles.json";
import Autosuggest from 'react-autosuggest';

interface MotorcycleData {
  make: string;
  models: string[];
}

export default function MotorcycleParametersInput({showAllFields, searchParameters}: {showAllFields: boolean, searchParameters: any}) {
  const [motorcycleData, setMotorcycleData] = useState<MotorcycleData[]>([]);
  const [locationParams, setLocationParams] = useState<{ position: [number, number] | null; radius: number }>({ position: null, radius: 100000 });
  const [locationVisible, setLocationVisible] = useState(false);
  const [tempMake, setTempMake] = useState("");
  const [tempModel, setTempModel] = useState("");
  const [renderMakeSuggestions, setRenderMakeSuggestions] = useState(false);
  const [renderModelSuggestions, setRenderModelSuggestions] = useState(false);
    
  const handleLocationVisibleChange = () => {
      setLocationVisible(!locationVisible);
      setLocationParams({ position: null, radius: 100000 });
  };

  useEffect(() => {
    setMotorcycleData(motorcycleDataJson);
  }, []);

  const handleLocationChange = (params: { position: [number, number] | null; radius: number }) => {
    setLocationParams(params);
  };

  const [formValues, setFormValues] = useState({
    make: "",
    model: "",
    type: "",
    year_min: "",
    year_max: "",
    mileage_min: "",
    mileage_max: "",
    price_min: "",
    price_max: "",
    fuel: "",
    transmission: "",
    engine_capacity_min: "",
    engine_capacity_max: "",
    power_min: "",
    power_max: "",
    condition: "",
    filter_by: "",
    sort_direction: "",
  });

  useEffect(() => {
    if (searchParameters) {
      const paramPairs = searchParameters.split("&");
      const decodedSearchParameters = paramPairs.reduce((acc: any, pair: string) => {
        const [key, encodedValue] = pair.split("=");
        const sanitizedValue = encodedValue.replace(/\+/g, ' ');
        const value = decodeURIComponent(sanitizedValue);
        acc[key] = value;
        return acc;
      }, {});
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        ...decodedSearchParameters,
      }));
  
      if (decodedSearchParameters["lat"] && decodedSearchParameters["lng"]) {
        setLocationParams({
          position: [parseFloat(decodedSearchParameters["lat"]), parseFloat(decodedSearchParameters["lng"])],
          radius: parseFloat(decodedSearchParameters["radius"]),
        });
      }
    }
  }, [searchParameters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.name === "price_min" || e.target.name === "price_max" || e.target.name === "mileage_min" || e.target.name === "mileage_max" || e.target.name === "year_min" || e.target.name === "year_max" || e.target.name === "engine_capacity_min" || e.target.name === "engine_capacity_max" || e.target.name === "power_min" || e.target.name === "power_max") {
      if (typeof e.target.value === "string" && e.target.value !== "") {
        const number = parseInt(e.target.value);
        if (!isNaN(number)) {
          setFormValues({ ...formValues, [e.target.name]: number });
        }
      } else {
        setFormValues({ ...formValues, [e.target.name]: "" });
      }
    }
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value, model: "" });
  };

  const getMakeSuggestions = (value: string) => {
    if (value === "") {
      return motorcycleData.map((motorcycle) => motorcycle.make);
    }
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? motorcycleData.map((motorcycle) => motorcycle.make) : motorcycleData.map((motorcycle) => motorcycle.make).filter((make) => make.toLowerCase().slice(0, inputLength) === inputValue);
  };

  const getModelSuggestions = (value: string) => {
    if (value === "") {
      return motorcycleData.find((motorcycle) => motorcycle.make === formValues.make)?.models || [];
    }
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? motorcycleData.find((motorcycle) => motorcycle.make === formValues.make)?.models || [] : motorcycleData.find((motorcycle) => motorcycle.make === formValues.make)?.models.filter((model) => model.toLowerCase().slice(0, inputLength) === inputValue) || [];
  };

  const getSuggestionValue = (suggestion: string) => suggestion;

  const renderMakeSuggestion = (suggestion: string) => <div onClick={() => setFormValues({ ...formValues, make: suggestion, model: "" })}>{suggestion}</div>;
  const renderModelSuggestion = (suggestion: string) => <div onClick={() => setFormValues({ ...formValues, model: suggestion })}>{suggestion}</div>;

  const handleResetMake = () => {
    setFormValues({ ...formValues, make: "", model: "" });
    setTempMake("");
    setTempModel("");
  }

  const handleResetModel = () => {
    setFormValues({ ...formValues, model: "" });
    setTempModel("");
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchPath = "/search/motorcycles";
    const queryParams =  new URLSearchParams();
    Object.entries(formValues).forEach(([key, value]) => {
      if (value !== "") {
        queryParams.append(key, value);
      }
    });
    queryParams.delete("lat");
    queryParams.delete("lng");
    queryParams.delete("radius");

    if (locationParams.position) {
      queryParams.append("lat", locationParams.position[0].toString());
      queryParams.append("lng", locationParams.position[1].toString());
      queryParams.append("radius", locationParams.radius.toString());
    }

    const newUrl = `${searchPath}?${queryParams.toString()}/1`;
    window.location.href = newUrl;
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [filter_by, sort_direction] = e.target.value.split("_");
    setFormValues({ ...formValues, filter_by, sort_direction });
  };

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Make:</label>
        <div className="relative">
          <Autosuggest
            suggestions={getMakeSuggestions(tempMake)}
            onSuggestionsFetchRequested={({ value }) => setTempMake(value)}
            onSuggestionsClearRequested={() => setTempMake("")}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderMakeSuggestion}
            inputProps={{
              placeholder: "Make",
              value: formValues.make ? formValues.make : tempMake,
              onChange: (e, { newValue }) => setTempMake(newValue),
              name: "make",
              className: "form-input border rounded p-2 w-full",
              onFocus: () => { setRenderMakeSuggestions(true); setRenderModelSuggestions(false) },
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
          {formValues.make && (
            <button onClick={handleResetMake} className="absolute inset-y-0 right-0 px-4 text-gray-400 hover:text-red-600 focus:outline-none justify-center items-center">
              X
            </button>
          )}
        </div>
      </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Model:</label>
          <div className="relative">
            <Autosuggest
              suggestions={getModelSuggestions(tempModel)}
              onSuggestionsFetchRequested={({ value }) => setTempMake(value)}
              onSuggestionsClearRequested={() => setTempMake("")}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderModelSuggestion}
              inputProps={{
                placeholder: "Model",
                value: formValues.model? formValues.model : tempModel,
                onChange: (e, { newValue }) => setTempModel(newValue),
                name: "model",
                className: "form-input border rounded p-2 w-full",
                onFocus: () => setRenderModelSuggestions(true),
                onBlur: () => setRenderModelSuggestions(false),
                disabled: formValues.make === "",
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
            {formValues.model && (
              <button onClick={handleResetModel} className="absolute inset-y-0 right-0 px-4 text-gray-400 hover:text-red-600 focus:outline-none">
                X
              </button>
            )}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Type:</label>
          <select
            name="type"
            value={formValues.type}
            onChange={handleInputChange}
            className="form-select border rounded p-2 full block w-full mt-1">
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
        </div>
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Year:</label>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="year_min"
            placeholder="Year from"
            type="number"
            pattern="[0-9]*"
            inputMode="numeric"
            onWheel={(e) => e.currentTarget.blur()}
            value={formValues.year_min}
            onChange={handleInputChange}
            className="form-input border rounded p-2 full"
          />
          <input
            name="year_max"
            placeholder="Year to"
            type="number"
            pattern="[0-9]*"
            inputMode="numeric"
            onWheel={(e) => e.currentTarget.blur()}
            value={formValues.year_max}
            onChange={handleInputChange}
            className="form-input border rounded p-2 full"
          />
        </div>
      </div>
      {showAllFields && (
        <>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Year:</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="year_min"
                value={formValues.year_min}
                onChange={handleInputChange}
                placeholder="Min"
                className="form-input border rounded p-2 w-full"
              />
              <input
                type="number"
                name="year_max"
                value={formValues.year_max}
                onChange={handleInputChange}
                placeholder="Max"
                className="form-input border rounded p-2 w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Mileage:</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="mileage_min"
                value={formValues.mileage_min}
                onChange={handleInputChange}
                placeholder="Min"
                className="form-input border rounded p-2 w-full"
              />
              <input
                type="number"
                name="mileage_max"
                value={formValues.mileage_max}
                onChange={handleInputChange}
                placeholder="Max"
                className="form-input border rounded p-2 w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="price_min"
                value={formValues.price_min}
                onChange={handleInputChange}
                placeholder="Min"
                className="form-input border rounded p-2 w-full"
              />
              <input
                type="number"
                name="price_max"
                value={formValues.price_max}
                onChange={handleInputChange}
                placeholder="Max"
                className="form-input border rounded p-2 w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Fuel:</label>
            <select
              name="fuel"
              value={formValues.fuel}
              onChange={handleInputChange}
              className="form-select border rounded p-2 full block w-full mt-1"
            >
              <option value="">Fuel</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Transmission:</label>
            <select
              name="transmission"
              className="form-select border rounded p-2 full block w-full mt-1"
              value={formValues.transmission}
              onChange={handleInputChange}
            >
              <option value="">Transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Engine Capacity:</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="engine_capacity_min"
                value={formValues.engine_capacity_min}
                onChange={handleInputChange}
                placeholder="Min"
                className="form-input border rounded p-2 w-full"
              />
              <input
                type="number"
                name="engine_capacity_max"
                value={formValues.engine_capacity_max}
                onChange={handleInputChange}
                placeholder="Max"
                className="form-input border rounded p-2 w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Power:</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="power_min"
                value={formValues.power_min}
                onChange={handleInputChange}
                placeholder="Min"
                className="form-input border rounded p-2 w-full"
              />
              <input
                type="number"
                name="power_max"
                value={formValues.power_max}
                onChange={handleInputChange}
                placeholder="Max"
                className="form-input border rounded p-2 w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Condition:</label>
            <select
              name="condition"
              value={formValues.condition}
              onChange={handleInputChange}
              className="form-select border rounded p-2 full block w-full mt-1"
            >
              <option value="">Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>
        </>
      )}
      <div className="mb-4">
        {locationVisible ? (
              <button className="form-button border rounded p-2 full bg-neutral-50 hover:bg-neutral-200 transition duration-300" type="button" onClick={handleLocationVisibleChange}>Any location</button>
            ) : (
              <button className="form-button border rounded p-2 full bg-neutral-50 hover:bg-neutral-200 transition duration-300" type="button" onClick={handleLocationVisibleChange}>Choose location</button>
            )}
        {locationVisible && <LocationInputSearch onLocationChange={handleLocationChange} />}
      </div>
      <div className="col-span-1 flex items-center justify-center">
          <button type="submit" className="form-button border rounded p-4 font-bold bg-teal-500 hover:bg-teal-600 transition duration-300">
            Search
          </button>
        </div>
        <div className="col-span-1 flex items-center justify-end">
          <select name="filter_by" className="form-select border rounded p-2" onChange={handleSortByChange} value={`${formValues.filter_by}_${formValues.sort_direction}`} >
            <option value="">Sort by</option>
            <option value="price_1">Price Asc</option>
            <option value="price_-1">Price Desc</option>
            <option value="year_1">Year Asc</option>
            <option value="year_-1">Year Desc</option>
            <option value="mileage_1">Mileage Asc</option>
            <option value="mileage_-1">Mileage Desc</option>
          </select>
        </div>
    </form>
  );
}
