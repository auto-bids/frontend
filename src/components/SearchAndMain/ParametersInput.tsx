import React, { useState, useEffect } from "react";
import LocationInputSearch from "../Map/LocationInputSearch";
import carDataJson from "../../testJsons/makeModelCars.json";
import Autosuggest from 'react-autosuggest';

interface CarData {
  make: string;
  models: string[];
}

export default function ParametersInputMain({ showAllFields, buyNowOrBid, searchParameters }: { showAllFields: boolean; buyNowOrBid: string, searchParameters: any }) {
  const [carData, setCarData] = useState<CarData[]>([]);
  const [locationParams, setLocationParams] = useState<{ position: [number, number] | null; radius: number }>({ position: null, radius: 10000000000 });
  const [tempMake, setTempMake] = useState("");
  const [tempModel, setTempModel] = useState("");
  const [renderMakeSuggestions, setRenderMakeSuggestions] = useState(false);
  const [renderModelSuggestions, setRenderModelSuggestions] = useState(false);

  useEffect(() => {
    setCarData(carDataJson);
  }, []);

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
    currentBidFrom: "",
    currentBidTo: "",
    sellerReserveFrom: "",
    sellerReserveTo: "",
    numberOfBidsFrom: "",
    numberOfBidsTo: "",
    end: "",
    endDateTo: "",
    fuel: "",
    condition: "",
    doors: "",
    engine_capacity_min: "",
    engine_capacity_max: "",
    power_min: "",
    power_max: "",
    gearbox: "",
    drive: "",
    steering: "",
    filter_by: "",
    sort_direction: "",
    Status: "",
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

  
  const [locationVisible, setLocationVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.name === "price_min" || e.target.name === "price_max" || e.target.name === "currentBidFrom" || e.target.name === "currentBidTo" || e.target.name === "sellerReserveFrom" || e.target.name === "sellerReserveTo" || e.target.name === "numberOfBidsFrom" || e.target.name === "numberOfBidsTo" || e.target.name === "mileage_min" || e.target.name === "mileage_max" || e.target.name === "year_min" || e.target.name === "year_max" || e.target.name === "engine_capacity_min" || e.target.name === "engine_capacity_max" || e.target.name === "power_min" || e.target.name === "power_max") {
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


  const handleLocationChange = (params: { position: [number, number] | null; radius: number }) => {
    setLocationParams(params);
  };

  const handleLocationVisibleChange = () => {
    setLocationVisible(!locationVisible);
    setLocationParams({ position: null, radius: 100000 });
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [filter_by, sort_direction] = e.target.value.split("_");
    setFormValues({ ...formValues, filter_by, sort_direction });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchPath = buyNowOrBid === "buyNow" ? "/search/cars" : "/search/auction";
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

  const getMakeSuggestions = (value: string) => {
    if (value === "") {
      return carData.map((car) => car.make);
    }
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? carData.map((car) => car.make) : carData.map((car) => car.make).filter((make) => make.toLowerCase().slice(0, inputLength) === inputValue);
  };

  const getModelSuggestions = (value: string) => {
    if (value === "") {
      return carData.find((car) => car.make === formValues.make)?.models || [];
    }
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? carData.find((car) => car.make === formValues.make)?.models || [] : carData.find((car) => car.make === formValues.make)?.models.filter((model) => model.toLowerCase().slice(0, inputLength) === inputValue) || [];
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
            <option value="Sedan">Sedan</option>
            <option value="Station Wagon">Station Wagon</option>
            <option value="Hatchback">Hatchback</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
            <option value="Cabriolet">Cabriolet</option>
            <option value="Coupe">Coupe</option>
            <option value="Other">Other</option>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-gray-700">Mileage:</label>
            <div className="flex space-x-2">
              <input className="form-input border rounded pb-2 pt-2 pl-1 full" type="number" pattern="[0-9]*" inputMode="numeric" onWheel={(e) => e.currentTarget.blur()} name="mileage_min" placeholder="Mileage from" value={formValues.mileage_min} onChange={handleInputChange} />
              <input className="form-input border rounded pb-2 pt-2 pl-1 full" type="number" pattern="[0-9]*" inputMode="numeric" onWheel={(e) => e.currentTarget.blur()} name="mileage_max" placeholder="Mileage to" value={formValues.mileage_max} onChange={handleInputChange} />
            </div>
          </div>
  
          {buyNowOrBid === "buyNow" && (
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700">Price:</label>
              <div className="flex space-x-2">
                <input className="form-input border rounded pb-2 pt-2 pl-1 full" name="price_min" placeholder="Price from" value={formValues.price_min} onChange={handleInputChange} type="number" pattern="[0-9]*" inputMode="numeric" onWheel={(e) => e.currentTarget.blur()}/>
                <input className="form-input border rounded pb-2 pt-2 pl-1 full" name="price_max" placeholder="Price to" value={formValues.price_max} onChange={handleInputChange} type="number" pattern="[0-9]*" inputMode="numeric" onWheel={(e) => e.currentTarget.blur()}/>
              </div>
            </div>
          )}
  
          {buyNowOrBid === "bid" && (
            <>
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium text-gray-700">Status:</label>
                <div className="flex space-x-2">
                  <select className="form-select border rounded p-2 full" name="Status" value={formValues.Status}
                          onChange={handleInputChange}>
                    <option value="">Status</option>
                    <option value="started">Started</option>
                    <option value="ended">Ended</option>
                    <option value="notstarted">Not Started</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-gray-700">Fuel Type:</label>
            <select className="form-select border rounded p-2 full" name="fuel" value={formValues.fuel}
                    onChange={handleInputChange}>
              <option value="">Fuel Type</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="LPG">LPG</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-gray-700">Condition:</label>
            <select className="form-select border rounded p-2 full" name="condition" value={formValues.condition} onChange={handleInputChange}>
              <option value="">Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>
          
          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-gray-700">Doors:</label>
            <select className="form-select border rounded p-2 full" name="doors" value={formValues.doors} onChange={handleInputChange}>
              <option value="">Doors</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value='6'>6</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          
          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-gray-700">Engine Capacity:</label>
            <div className="flex space-x-2">
              <input className="form-input border rounded pb-2 pt-2 pl-1 full" type="number" pattern="[0-9]*" inputMode="numeric" onWheel={(e) => e.currentTarget.blur()} name="engine_capacity_min" placeholder="Engine Capacity from" value={formValues.engine_capacity_min} onChange={handleInputChange} />
              <input className="form-input border rounded pb-2 pt-2 pl-1 full" type="number" pattern="[0-9]*" inputMode="numeric" onWheel={(e) => e.currentTarget.blur()} name="engine_capacity_max" placeholder="Engine Capacity to" value={formValues.engine_capacity_max} onChange={handleInputChange} />
            </div>
          </div>
            
          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-gray-700">Power:</label>
            <div className="flex space-x-2">
              <input className="form-input border rounded pb-2 pt-2 pl-1 full" type="number" pattern="[0-9]*" inputMode="numeric" onWheel={(e) => e.currentTarget.blur()} name="power_min" placeholder="Power from" value={formValues.power_min} onChange={handleInputChange} />
              <input className="form-input border rounded pb-2 pt-2 pl-1 full" type="number" pattern="[0-9]*" inputMode="numeric" onWheel={(e) => e.currentTarget.blur()} name="power_max" placeholder="Power to" value={formValues.power_max} onChange={handleInputChange} />
            </div>
          </div>
  
          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-gray-700">Gearbox:</label>
            <select className="form-select border rounded p-2 full" name="gearbox" value={formValues.gearbox} onChange={handleInputChange}>
              <option value="">Gearbox</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
              <option value="Semi-automatic">Semi-automatic</option>
              <option value="CVT">CVT</option>
              <option value="Other">Other</option>
            </select>
          </div>
  
          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-gray-700">Drive:</label>
            <select className="form-select border rounded p-2 full" name="drive" value={formValues.drive} onChange={handleInputChange}>
              <option value="">Drive</option>
              <option value="Front">Front</option>
              <option value="Rear">Rear</option>
              <option value="All">All</option>
            </select>
          </div>
  
          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-gray-700">Steering:</label>
            <select className="form-select border rounded p-2 full" name="steering" value={formValues.steering} onChange={handleInputChange}>
              <option value="">Steering</option>
              <option value="Left">Left</option>
              <option value="Right">Right</option>
            </select>
          </div>
  
          
        </div>
      )}
      <div className="mb-4">
        {locationVisible ? (
              <button className="form-button border rounded p-2 full bg-neutral-50 hover:bg-neutral-200 transition duration-300" type="button" onClick={handleLocationVisibleChange}>Any location</button>
            ) : (
              <button className="form-button border rounded p-2 full bg-neutral-50 hover:bg-neutral-200 transition duration-300" type="button" onClick={handleLocationVisibleChange}>Choose location</button>
            )}
        {locationVisible && <LocationInputSearch onLocationChange={handleLocationChange} />}
      </div>
      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="col-span-1">
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
      </div>
    </form>
  );
  
}
