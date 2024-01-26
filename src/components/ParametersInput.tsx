import React, { useState, useEffect } from "react";
import LocationInputSearch from "./LocationInputSearch";
import carDataJson from "../testJsons/makeModelCars.json";

interface CarData {
  make: string;
  models: string[];
}

export default function ParametersInputMain({ showAllFields, buyNowOrBid, searchParameters }: { showAllFields: boolean; buyNowOrBid: string, searchParameters: any }) {
  const [carData, setCarData] = useState<CarData[]>([]);

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
    endDateFrom: "",
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
  });

  useEffect(() => {
    if (searchParameters) {
      const paramPairs = searchParameters.split("&");
      const decodedSearchParameters = paramPairs.reduce((acc: any, pair: string) => {
      const [key, value] = pair.split("=");
        acc[key] = decodeURIComponent(value);
        return acc;
      }, {});
      // console.log(decodedSearchParameters);
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        ...decodedSearchParameters,
      }));
    }
  }, [searchParameters]);

  const [locationParams, setLocationParams] = useState<{ position: [number, number] | null; radius: number }>({ position: null, radius: 10000000000 });
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

  const handleMakeInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value, model: "" });
  }

  const handleLocationChange = (params: { position: [number, number] | null; radius: number }) => {
    setLocationParams(params);
  };

  const handleLocationVisibleChange = () => {
    setLocationVisible(!locationVisible);
    setLocationParams({ position: null, radius: 100000 });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchPath = buyNowOrBid === "buyNow" ? "/search/cars" : "/search/cars-bids";
    const queryParams =  new URLSearchParams();
    Object.entries(formValues).forEach(([key, value]) => {
      if (value !== "") {
        queryParams.append(key, value);
      }
    });
    if (locationParams.position) {
      queryParams.append("lat", locationParams.position[0].toString());
      queryParams.append("lng", locationParams.position[1].toString());
      queryParams.append("radius", locationParams.radius.toString());
    }

    window.location.href = `${searchPath}?${queryParams.toString()}/1`;
  };

  return (
    <form className="parameters-input-main" onSubmit={handleSubmit}>
      <label>Make:</label>
      <select name="make" value={formValues.make} onChange={handleMakeInputChange}>
        <option value="">Make</option>
        {carData.map((car) => (
          <option key={car.make} value={car.make}>
            {car.make}
          </option>
        ))}
      </select>

      <label>Model:</label>
      <select name="model" value={formValues.model} onChange={handleInputChange}>
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
      <label>Year:</label>
      <input type="text" name="year_min" placeholder="Year from" value={formValues.year_min} onChange={handleInputChange} />
      <input type="text" name="year_max" placeholder="Year to" value={formValues.year_max} onChange={handleInputChange} />

      {showAllFields && (
        <>
        <label>Mileage:</label>
        <input type="text" name="mileage_min" placeholder="Mileage from" value={formValues.mileage_min} onChange={handleInputChange} />
        <input type="text" name="mileage_max" placeholder="Mileage to" value={formValues.mileage_max} onChange={handleInputChange} />
        <>
          <label>Price:</label>
          <input type="text" name="price_min" placeholder="Price from" value={formValues.price_min} onChange={handleInputChange} />
          <input type="text" name="price_max" placeholder="Price to" value={formValues.price_max} onChange={handleInputChange} />
          </>
        {/* {buyNowOrBid === "Buy Now" && (
          <>
          <label>Price:</label>
          <input type="text" name="price_min" placeholder="Price from" value={formValues.price_min} onChange={handleInputChange} />
          <input type="text" name="price_max" placeholder="Price to" value={formValues.price_max} onChange={handleInputChange} />
          </>
        )}
        {buyNowOrBid === "Bid" && (
          <>
          <label>Current Bid:</label>
          <input type="text" name="currentBidFrom" placeholder="Current Bid from" value={formValues.currentBidFrom} onChange={handleInputChange} />
          <input type="text" name="currentBidTo" placeholder="Current Bid to" value={formValues.currentBidTo} onChange={handleInputChange} />
          <label>Seller Reserve:</label>
          <input type="text" name="sellerReserveFrom" placeholder="Seller Reserve from" value={formValues.sellerReserveFrom} onChange={handleInputChange} />
          <input type="text" name="sellerReserveTo" placeholder="Seller Reserve to" value={formValues.sellerReserveTo} onChange={handleInputChange} />
          <label>Number of Bids:</label>
          <input type="text" name="numberOfBidsFrom" placeholder="Number of Bids from" value={formValues.numberOfBidsFrom} onChange={handleInputChange} />
          <input type="text" name="numberOfBidsTo" placeholder="Number of Bids to" value={formValues.numberOfBidsTo} onChange={handleInputChange} />
          <label>End Date:</label>
          <input type="text" name="endDateFrom" placeholder="End Date from" value={formValues.endDateFrom} onChange={handleInputChange} />
          <input type="text" name="endDateTo" placeholder="End Date to" value={formValues.endDateTo} onChange={handleInputChange} />
          </>
        )} */}
        <label>Fuel Type:</label>
        <select name="fuel" value={formValues.fuel} onChange={handleInputChange}>
          <option value="">Fuel Type</option>
          <option value="Gasoline">Gasoline</option>
          <option value="Diesel">Diesel</option>
          <option value="LPG">LPG</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Other">Other</option>
        </select>
        <label>Condition:</label>
        <select name="condition" value={formValues.condition} onChange={handleInputChange}>
          <option value="">Condition</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
          <option value="Damaged">Damaged</option>
        </select>
        <label>Doors:</label>
        <select name="doors" value={formValues.doors} onChange={handleInputChange}>
          <option value="">Doors</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value='6'>6</option>
          <option value='Other'>Other</option>
        </select>
        <label>Engine Capacity:</label>
        <input type="text" name="engine_capacity_min" placeholder="Engine Capacity from" value={formValues.engine_capacity_min} onChange={handleInputChange} />
        <input type="text" name="engine_capacity_max" placeholder="Engine Capacity to" value={formValues.engine_capacity_max} onChange={handleInputChange} />
        <label>Power:</label>
        <input type="text" name="power_min" placeholder="Power from" value={formValues.power_min} onChange={handleInputChange} />
        <input type="text" name="power_max" placeholder="Power to" value={formValues.power_max} onChange={handleInputChange} />
        <label>Gearbox:</label>
        <select name="gearbox" value={formValues.gearbox} onChange={handleInputChange}>
          <option value="">Gearbox</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
          <option value="Semi-automatic">Semi-automatic</option>
          <option value="CVT">CVT</option>
          <option value="Other">Other</option>
        </select>
        <label>Drive:</label>
        <select name="drive" value={formValues.drive} onChange={handleInputChange}>
          <option value="">Drive</option>
          <option value="Front">Front</option>
          <option value="Rear">Rear</option>
          <option value="All">All</option>
        </select>
        <label>Steering:</label>
        <select name="steering" value={formValues.steering} onChange={handleInputChange}>
          <option value="">Steering</option>
          <option value="Left">Left</option>
          <option value="Right">Right</option>
        </select>
        {
          locationVisible ? (
            <button type="button" onClick={handleLocationVisibleChange}>Any location</button>
          ) : (
            <button type="button" onClick={handleLocationVisibleChange}>Choose location</button>
          )
        }
        {locationVisible && <LocationInputSearch onLocationChange={handleLocationChange} />}
        </>
      )}

      <button type="submit">Search</button>
    </form>
  );
}
