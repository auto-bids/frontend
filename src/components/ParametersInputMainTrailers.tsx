import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ParametersInputMainTrailers() {

    return(
        <div className="parameters-input-main">
            <label>Make:</label>
            <select>
                <option value="">Make</option>
                <option value="Schmitz Cargobull">Schmitz Cargobull</option>
                <option value="Krone">Krone</option>
                <option value="Kögel">Kögel</option>
            </select>
            <label>Model:</label>
            <input type="text" placeholder="Model" />
            <label>Application:</label>
            <select>
                <option value="">Application</option>
                <option value="Box">Box</option>
                <option value="Curtain Side">Curtain Side</option>
                <option value="Flatbed">Flatbed</option>
                <option value="Refrigerated">Refrigerated</option>
                <option value="Tanker">Tanker</option>
            </select>
            <label>Year:</label>
            <input type="text" placeholder="Year from" />
            <input type="text" placeholder="Year to" />
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