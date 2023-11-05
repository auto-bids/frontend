import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ParametersInputDeliveryVans() {
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
        <option value="4">4</option>
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
