import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LocationInputSearch from "./LocationInputSearch";
import motorcycleDataJson from "../testJsons/makeModelMotorcycles.json";

interface MotorcycleData {
  make: string;
  models: string[];
}

export default function MotorcycleParametersInput({showAllFields}: {showAllFields: boolean}) {
  const [motorcycleData, setMotorcycleData] = useState<MotorcycleData[]>([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [locationParams, setLocationParams] = useState<{ position: [number, number] | null; radius: number }>({ position: null, radius: 100000 });

  useEffect(() => {
    setMotorcycleData(motorcycleDataJson);
  }, []);

  const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMake(event.target.value);
    setSelectedModel("");
  };

  const handleLocationChange = (params: { position: [number, number] | null; radius: number }) => {
    setLocationParams(params);
  }

  return (
    <div>
      <label>Make:</label>
      <select value={selectedMake} onChange={handleMakeChange}>
        <option value="">Make</option>
        {motorcycleData.map((motorcycle) => (
          <option key={motorcycle.make} value={motorcycle.make}>
            {motorcycle.make}
          </option>
        ))}
      </select>
      <label>Model:</label>
      <select value={selectedModel} onChange={(event) => setSelectedModel(event.target.value)}>
        <option value="">Model</option>
        {motorcycleData
          .find((motorcycle) => motorcycle.make === selectedMake)?.models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
      </select>
      <label>Type:</label>
      <select>
        <option value="">Type</option>
        <option value="Sportbike">Sportbike</option>
        <option value="Cruiser">Cruiser</option>
        <option value="Dirt Bike">Dirt Bike</option>
      </select>
      {showAllFields && (
      <>
      <label>Year:</label>
      <input type="text" placeholder="Year from" />
      <input type="text" placeholder="Year to" />
      <label>Engine capacity:</label>
      <input type="text" placeholder="Engine capacity from" />
      <input type="text" placeholder="Engine capacity to" />
      <label>Engine power:</label>
      <input type="text" placeholder="Engine power from" />
      <input type="text" placeholder="Engine power to" />
      <label>Transmission:</label>
      <select>
        <option value="">Transmission</option>
        <option value="Manual">Manual</option>
        <option value="Automatic">Automatic</option>
      </select>
      <label>Mileage:</label>
      <input type="text" placeholder="Mileage from" />
      <input type="text" placeholder="Mileage to" />
      <label>Price:</label>
      <input type="text" placeholder="Price from" />
      <input type="text" placeholder="Price to" />
      <label>Fuel type:</label>
      <select>
        <option value="">Fuel Type</option>
        <option value="Gasoline">Gasoline</option>
        <option value="Electric">Electric</option>
      </select>
      <label>Condition:</label>
      <select>
        <option value="">Condition</option>
        <option value="New">New</option>
        <option value="Used">Used</option>
        <option value="Damaged">Damaged</option>
      </select>
      <label>Location:</label>
      <LocationInputSearch onLocationChange={handleLocationChange} />
      </>
      )}
      <Link to="/search">
        <button>Search</button>
      </Link>
    </div>
  );
}
