import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LocationInputSearch from "./LocationInputSearch";
import carDataJson from "../testJsons/makeModelCars.json";
import { Formik, Form, Field } from "formik";

interface CarData {
  make: string;
  models: string[];
}

export default function ParametersInputMain({showAllFields, buyNowOrBid}: {showAllFields: boolean, buyNowOrBid: string}) {
  const [carData, setCarData] = useState<CarData[]>([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [locationParams, setLocationParams] = useState<{ position: [number, number] | null; radius: number }>({ position: null, radius: 10000000000 });
  const [locationVisible, setLocationVisible] = useState(false);

  useEffect(() => {
    setCarData(carDataJson);
  }, []);

  const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMake(event.target.value);
    setSelectedModel("");
  };

  const handleLocationChange = (params: { position: [number, number] | null; radius: number }) => {
    setLocationParams(params);
  };

  const handleLocationVisibleChange = () => {
    setLocationVisible(!locationVisible);
    setLocationParams({ position: null, radius: 100000 });
  }

  const handleSubmit = (values: any) => {
    const searchPath = buyNowOrBid === "buyNow" ? "/search/cars" : "/search/cars-bids";
    const queryParams =  new URLSearchParams();

    if (values.make) {
      queryParams.append("make", values.make);
    }
    if (values.model) {
      queryParams.append("model", values.model);
    }
    if (values.type) {
      queryParams.append("type", values.type);
    }
    if (values.yearFrom) {
      queryParams.append("yearFrom", values.yearFrom);
    }
    if (values.yearTo) {
      queryParams.append("yearTo", values.yearTo);
    }
    if (values.mileageFrom) {
      queryParams.append("mileageFrom", values.mileageFrom);
    }
    if (values.mileageTo) {
      queryParams.append("mileageTo", values.mileageTo);
    }
    if (values.priceFrom) {
      queryParams.append("priceFrom", values.priceFrom);
    }
    if (values.priceTo) {
      queryParams.append("priceTo", values.priceTo);
    }
    if (values.currentBidFrom) {
      queryParams.append("currentBidFrom", values.currentBidFrom);
    }
    if (values.currentBidTo) {
      queryParams.append("currentBidTo", values.currentBidTo);
    }
    if (values.sellerReserveFrom) {
      queryParams.append("sellerReserveFrom", values.sellerReserveFrom);
    }
    if (values.sellerReserveTo) {
      queryParams.append("sellerReserveTo", values.sellerReserveTo);
    }
    if (values.numberOfBidsFrom) {
      queryParams.append("numberOfBidsFrom", values.numberOfBidsFrom);
    }
    if (values.numberOfBidsTo) {
      queryParams.append("numberOfBidsTo", values.numberOfBidsTo);
    }
    if (values.endDateFrom) {
      queryParams.append("endDateFrom", values.endDateFrom);
    }
    if (values.endDateTo) {
      queryParams.append("endDateTo", values.endDateTo);
    }
    if (values.fuelType) {
      queryParams.append("fuelType", values.fuelType);
    }
    if (values.condition) {
      queryParams.append("condition", values.condition);
    }
    if (values.doors) {
      queryParams.append("doors", values.doors);
    }
    if (values.engineCapacityFrom) {
      queryParams.append("engineCapacityFrom", values.engineCapacityFrom);
    }
    if (values.engineCapacityTo) {
      queryParams.append("engineCapacityTo", values.engineCapacityTo);
    }
    if (values.powerFrom) {
      queryParams.append("powerFrom", values.powerFrom);
    }
    if (values.powerTo) {
      queryParams.append("powerTo", values.powerTo);
    }
    if (values.gearbox) {
      queryParams.append("gearbox", values.gearbox);
    }
    if (values.drive) {
      queryParams.append("drive", values.drive);
    }
    if (values.steering) {
      queryParams.append("steering", values.steering);
    }
    if (values.status) {
      queryParams.append("status", values.status);
    }
    if (locationParams.position) {
      queryParams.append("lat", locationParams.position[0].toString());
      queryParams.append("lng", locationParams.position[1].toString());
      queryParams.append("radius", locationParams.radius.toString());
    }

    window.location.href = `${searchPath}?${queryParams.toString()}`;
  }

  return (
    <Formik initialValues={{make: "", model: "", type: "", yearFrom: "", yearTo: "", mileageFrom: "", mileageTo: "", priceFrom: "", priceTo: "", currentBidFrom: "", currentBidTo: "", sellerReserveFrom: "", sellerReserveTo: "", numberOfBidsFrom: "", numberOfBidsTo: "", endDateFrom: "", endDateTo: "", fuelType: "", condition: "", doors: "", engineCapacityFrom: "", engineCapacityTo: "", powerFrom: "", powerTo: "", gearbox: "", drive: "", steering: "", status: ""}} onSubmit={handleSubmit}>
      <Form className="parameters-input-main">
        <label>Make:</label>
        <Field name="make" as="select">
          <option value="">Make</option>
          {carData.map((car) => (
            <option key={car.make} value={car.make}>
              {car.make}
            </option>
          ))}
        </Field>

        <label>Model:</label>
        <Field name="model" as="select">
          <option value="">Model</option>
          {carData
            .find((car) => car.make === selectedMake)?.models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
        </Field>

        <label>Type:</label>
        <Field name="type" as="select">
          <option value="">Type</option>
          <option value="Sedan">Sedan</option>
          <option value="Station Wagon">Station Wagon</option>
          <option value="Hatchback">Hatchback</option>
          <option value="SUV">SUV</option>
          <option value="Van">Van</option>
          <option value="Cabriolet">Cabriolet</option>
          <option value="Coupe">Coupe</option>
          <option value="Other">Other</option>
        </Field>
        <label>Year:</label>
        <Field name="yearFrom" type="text" placeholder="Year from" />
        <Field name="yearTo" type="text" placeholder="Year to" />
        {showAllFields &&(
        <><label>Mileage:</label>
        <Field name="mileageFrom" type="text" placeholder="Mileage from" />
        <Field name="mileageTo" type="text" placeholder="Mileage to" />
        {buyNowOrBid === "buyNow" ? (
          <>
            <label>Price:</label>
            <Field name="priceFrom" type="text" placeholder="Price from" />
            <Field name="priceTo" type="text" placeholder="Price to" />
          </>
        ) : (
          <>
            <label>Current bid:</label>
            <Field name="currentBidFrom" type="text" placeholder="Current bid from" />
            <Field name="currentBidTo" type="text" placeholder="Current bid to" />
            <label>Seller reserve: </label>
            <Field name="sellerReserveFrom" type="text" placeholder="Seller reserve from" />
            <Field name="sellerReserveTo" type="text" placeholder="Seller reserve to" />
            <label>Number of bids:</label>
            <Field name="numberOfBidsFrom" type="text" placeholder="Number of bids from" />
            <Field name="numberOfBidsTo" type="text" placeholder="Number of bids to" />
            <label>End date:</label>
            <Field name="endDateFrom" type="text" placeholder="End date from" />
            <Field name="endDateTo" type="text" placeholder="End date to" />
          </>
        )
        }
        <label>Fuel Type:</label>
        <Field name="fuelType" as="select">
          <option value="">Fuel Type</option>
          <option value="Gasoline">Gasoline</option>
          <option value="Diesel">Diesel</option>
          <option value="LPG">LPG</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Other">Other</option>
        </Field>

        <label>Condition:</label>
        <Field name="condition" as="select">
          <option value="">Condition</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
          <option value="Damaged">Damaged</option>
        </Field>
        <label>Doors:</label>
        <Field name="doors" as="select">
          <option value="">Doors</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value='6'>6</option>
          <option value='Other'>Other</option>
        </Field>

        <label>Engine Capacity:</label>
        <Field name="engineCapacityFrom" type="text" placeholder="Engine Capacity from" />
        <Field name="engineCapacityTo" type="text" placeholder="Engine Capacity to" />

        <label>Power:</label>
        <Field name="powerFrom" type="text" placeholder="Power from" />
        <Field name="powerTo" type="text" placeholder="Power to" />

        <label>Gearbox:</label>
        <Field name="gearbox" as="select">
          <option value="">Gearbox</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
          <option value="Semi-automatic">Semi-automatic</option>
          <option value="CVT">CVT</option>
          <option value="Other">Other</option>
        </Field>

        <label>Drive:</label>
        <Field name="drive" as="select">
          <option value="">Drive</option>
          <option value="Front">Front</option>
          <option value="Rear">Rear</option>
          <option value="All">All</option>
          <option value="Other">Other</option>
        </Field>

        <label>Steering:</label>
        <Field name="steering" as="select">
          <option value="">Steering</option>
          <option value="Left">Left</option>
          <option value="Right">Right</option>
        </Field>

        {
          locationVisible ? (
            <button onClick={handleLocationVisibleChange}>Any location</button>
          ) : (
            <button onClick={handleLocationVisibleChange}>Choose location</button>
          )
        }
        {locationVisible && <LocationInputSearch onLocationChange={handleLocationChange} />}
        <label>Status:</label>
        <Field name="status" as="select">
          <option value="">Status</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
          <option value="Damaged">Damaged</option>
        </Field>
        </>)}
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
}
