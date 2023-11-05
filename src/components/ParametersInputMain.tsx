import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ParametersInputMain() {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");

  const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMake(event.target.value);
    setSelectedModel("");
  };

  return (
    <div className="parameters-input-main">
      <label>Make:</label>
      <select value={selectedMake} onChange={handleMakeChange}>
        <option value="">Make</option>
        <option value="FSO">FSO</option>
        <option value="FSR">FSR</option>
        <option value="FSM">FSM</option>
      </select>

      <label>Model:</label>
      <select
        value={selectedModel}
        onChange={(event) => setSelectedModel(event.target.value)}
      >
        <option value="">Model</option>
        {selectedMake === "FSO" && (
          <>
            <option value="Polonez">Polonez</option>
            <option value="Warszawa">Warszawa</option>
          </>
        )}
        {selectedMake === "FSR" && (
          <>
            <option value="Tarpan">Tarpan</option>
          </>
        )}
        {selectedMake === "FSM" && (
          <>
            <option value="126p">126p</option>
            <option value="Syrena">Syrena</option>
          </>
        )}
        
      </select>
      <label>Type:</label>
        <select>
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
        <input type="text" placeholder="Year from" />
        <input type="text" placeholder="Year to" />
        <input type="text" placeholder="Mileage from" />
        <input type="text" placeholder="Mileage to" />
        <input type="text" placeholder="Price from" />
        <input type="text" placeholder="Price to" />
        <select>
            <option value="">Fuel Type</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="LPG">LPG</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Other">Other</option>
        </select>
        <select>
            <option value="">Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Damaged">Damaged</option>
        </select>
        <select>
            <option value="">Doors</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
        </select>
        <label>Color:</label>
          <input
            type="color"
            value={selectedColor}
            onChange={(event) => setSelectedColor(event.target.value)}
          />
      <Link to="/search">
        <button>Search</button>
      </Link>
    </div>
  );
}
