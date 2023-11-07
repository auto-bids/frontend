import React from "react";
import { Link } from "react-router-dom";

export default function ParametersInputMainAgriculturalMachinery({showAllFields}: {showAllFields: boolean}) {

    return(
        <div className="parameters-input-main">
            <label>Make:</label>
            <select>
                <option value="">Make</option>
                <option value="John Deere">John Deere</option>
                <option value="New Holland">New Holland</option>
                <option value="Case IH">Case IH</option>
            </select>
            <label>Model:</label>
            <input type="text" placeholder="Model" />
            <label>Application:</label>
            <select>
                <option value="">Application</option>
                <option value="Tractor">Tractor</option>
                <option value="Combine Harvester">Combine Harvester</option>
                <option value="Forage Harvester">Forage Harvester</option>
                <option value="Sprayer">Sprayer</option>
                <option value="Seeder">Seeder</option>
                <option value="Other">Other</option>
            </select>
            {showAllFields && (
            <>
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
            <label>Location:</label>
            <input type="text" placeholder="Country" />
            <input type="text" placeholder="City" />
            <input type="text" placeholder="Radius" />
            </>
            )}
            <Link to="/results">
                <button>Search</button>
            </Link>
        </div>
    );
}
