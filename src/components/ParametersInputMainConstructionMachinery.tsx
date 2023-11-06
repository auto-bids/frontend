import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ParametersInputMainTrucks() {
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    return(
        <div className="parameters-input-main">
            <label>Make:</label>
            <select>
                <option value="">Make</option>
                <option value="Caterpillar">Caterpillar</option>
                <option value="Komatsu">Komatsu</option>
                <option value="Liebherr">Liebherr</option>
            </select>
            <label>Model:</label>
            <input type="text" placeholder="Model" />
            <label>Application:</label>
            <select>
                <option value="">Application</option>
                <option value="Articulated Dump Truck">Articulated Dump Truck</option>
                <option value="Backhoe Loader">Backhoe Loader</option>
                <option value="Crawler Dozer">Crawler Dozer</option>
                <option value="Excavator">Excavator</option>
                <option value="Motor Grader">Motor Grader</option>
                <option value="Skid Steer Loader">Skid Steer Loader</option>
                <option value="Wheel Loader">Wheel Loader</option>
            </select>
            <label>Year:</label>
            <input type="text" placeholder="Year from" />
            <input type="text" placeholder="Year to" />
            <label>Operating Hours:</label>
            <input type="text" placeholder="Operating Hours from" />
            <input type="text" placeholder="Operating Hours to" />
            <label>Price:</label>
            <input type="text" placeholder="Price from" />
            <input type="text" placeholder="Price to" />
            <label>Condition:</label>
            <select>
                <option value="">Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Damaged">Damaged</option>
            </select>
            <Link to="/results">
                <button>Search</button>
            </Link>
        </div>
    );
}