import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MotorcycleParametersInput() {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");

  const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMake(event.target.value);
    setSelectedModel("");
  };

  return (
    <div>
      <label>Make:</label>
      <select value={selectedMake} onChange={handleMakeChange}>
        <option value="">Make</option>
        <option value="Honda">Honda</option>
        <option value="Yamaha">Yamaha</option>
        <option value="Kawasaki">Kawasaki</option>
      </select>

      <label>Model:</label>
      <select value={selectedModel} onChange={(event) => setSelectedModel(event.target.value)}>
        <option value="">Model</option>
        {selectedMake === "Honda" && (
          <>
            <option value="CBR">CBR</option>
            <option value="CRF">CRF</option>
          </>
        )}
        {selectedMake === "Yamaha" && (
          <>
            <option value="YZF">YZF</option>
            <option value="MT">MT</option>
          </>
        )}
        {selectedMake === "Kawasaki" && (
          <>
            <option value="Ninja">Ninja</option>
            <option value="Z">Z</option>
          </>
        )}
      </select>

      <label>Type:</label>
      <select>
        <option value="">Type</option>
        <option value="Sportbike">Sportbike</option>
        <option value="Cruiser">Cruiser</option>
        <option value="Dirt Bike">Dirt Bike</option>
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
        <option value="Electric">Electric</option>
      </select>

      <select>
        <option value="">Condition</option>
        <option value="New">New</option>
        <option value="Used">Used</option>
        <option value="Damaged">Damaged</option>
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
