import React, { useState } from "react";
import { Link } from "react-router-dom";
import LocationInputSearch from "./LocationInputSearch";

export default function ParametersInputDeliveryVans({showAllFields}: {showAllFields: boolean}) {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [locationParams, setLocationParams] = useState<{ position: [number, number] | null; radius: number }>({ position: null, radius: 100000 });

  const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMake(event.target.value);
    setSelectedModel("");
  };

  const handleLocationChange = (params: { position: [number, number] | null; radius: number }) => {
    setLocationParams(params);
  };

  return (
    <div className="parameters-input-main">
      <label>Make:</label>
      <select value={selectedMake} onChange={handleMakeChange}>
        <option value="">Make</option>
        <option value="Ford">Ford</option>
        <option value="Mercedes-Benz">Mercedes-Benz</option>
        <option value="Volkswagen">Volkswagen</option>
      </select>

      <label>Model:</label>
      <select value={selectedModel} onChange={(event) => setSelectedModel(event.target.value)}>
        <option value="">Model</option>
        {selectedMake === "Ford" && (
          <>
            <option value="Transit">Transit</option>
            <option value="Connect">Connect</option>
          </>
        )}
        {selectedMake === "Mercedes-Benz" && (
          <>
            <option value="Sprinter">Sprinter</option>
            <option value="Vito">Vito</option>
          </>
        )}
        {selectedMake === "Volkswagen" && (
          <>
            <option value="Transporter">Transporter</option>
            <option value="Caddy">Caddy</option>
          </>
        )}
      </select>
      <label>Year:</label>
      <input type="text" placeholder="Year from" />
      <input type="text" placeholder="Year to" />
      {showAllFields && (
      <>
      <label>Mileage:</label>
      <input type="text" placeholder="Mileage from" />
      <input type="text" placeholder="Mileage to" />
      <label>Price:</label>
      <input type="text" placeholder="Price from" />
      <input type="text" placeholder="Price to" />
      <label>Fuel Type:</label>
      <select>
        <option value="">Fuel Type</option>
        <option value="Gasoline">Gasoline</option>
        <option value="Diesel">Diesel</option>
        <option value="Electric">Electric</option>
        <option value="Hybrid">Hybrid</option>
        <option value="LPG">LPG</option>
        <option value="CNG">CNG</option>
        <option value="Hydrogen">Hydrogen</option>
        <option value="Ethanol">Ethanol</option>
      </select>
      <label>Transmission:</label>
      <select>
        <option value="">Transmission</option>
        <option value="Manual">Manual</option>
        <option value="Automatic">Automatic</option>
        <option value="Semi-automatic">Semi-automatic</option>
      </select>
      <label>Drive:</label>
      <select>
        <option value="">Drive</option>
        <option value="Front">Front</option>
        <option value="Rear">Rear</option>
        <option value="All">All</option>
      </select>
      <label>Steering:</label>
      <select>
        <option value="">Steering</option>
        <option value="Left">Left</option>
        <option value="Right">Right</option>
      </select>
      <label>Engine capacity:</label>
      <input type="text" placeholder="Engine capacity from" />
      <input type="text" placeholder="Engine capacity to" />
      <label>Power:</label>
      <input type="text" placeholder="Power from" />
      <input type="text" placeholder="Power to" />
      <label>Condition:</label>
      <select>
        <option value="">Condition</option>
        <option value="New">New</option>
        <option value="Used">Used</option>
        <option value="Damaged">Damaged</option>
      </select>
      <label>Doors:</label>
      <select>
        <option value="">Doors</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="8+">8+</option>
      </select>
      <label>Seats:</label>
      <select>
        <option value="">Seats</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value='9+'>9+</option>
      </select>
      <label>Permissible Gross Weight</label>
      <input type="text" placeholder="PGW from" />
      <input type="text" placeholder="PGW to" />
      <label>Maximum Load</label>
      <input type="text" placeholder="Maximum Load from" />
      <input type="text" placeholder="Maximum Load to" />
      <label>Capacity:</label>
      <input type="text" placeholder="Capacity from" />
      <input type="text" placeholder="Capacity to" />
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
