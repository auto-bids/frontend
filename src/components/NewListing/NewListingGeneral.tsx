import React, {useState, useEffect} from "react";
import NewListing from "./NewListing";
import NewListingAgriculturalMachinery from "./NewListingAgriculturalMachinery";
import NewListingConstructionMachinery from "./NewListingConstructionMachinery";
import NewListingDeliveryVans from "./NewListingDeliveryVans";
import NewListingMotorcycles from "./NewListingMotorcycles";
import NewListingTrailers from "./NewListingTrailers";
import NewListingTrucks from "./NewListingTrucks";
import { Link } from "react-router-dom";
import NewListingBid from "./NewListingBid";

export default function NewListingGeneral({isLoggedIn}: {isLoggedIn: boolean}){
    const [category, setCategory] = useState("");
    const [categoryComponent, setCategoryComponent] = useState(<div className="p-4 text-center text-2xl border border-gray-300 rounded bg-gray-200">Please select a category</div>);

    const handleCategoryChange = (categoryName: string) => {
        setCategory(categoryName);
    }

    useEffect(() => {
        switch (category) {
            case "agricultural-machinery":
                setCategoryComponent(<NewListingAgriculturalMachinery />);
                break;
            case "construction-machinery":
                setCategoryComponent(<NewListingConstructionMachinery />);
                break;
            case "delivery-vans":
                setCategoryComponent(<NewListingDeliveryVans />);
                break;
            case "motorcycles":
                setCategoryComponent(<NewListingMotorcycles />);
                break;
            case "trailers":
                setCategoryComponent(<NewListingTrailers />);
                break;
            case "trucks":
                setCategoryComponent(<NewListingTrucks />);
                break;
            case "cars":
                setCategoryComponent(<NewListing />);
                break;
            case "auction":
                setCategoryComponent(<NewListingBid />);
                break;
            default:
                setCategoryComponent(<div className="p-4 text-center text-2xl border border-gray-300 rounded bg-gray-200">Please select a category</div>);
            break;
        }
    }, [category]);


    if (isLoggedIn) {
        return(
            <div>
                <div>
                    {["cars","auction","motorcycles","delivery-vans","trucks","construction-machinery","trailers","agricultural-machinery"].map((categoryName) => (
                        <button
                        key={categoryName}
                        onClick={() => handleCategoryChange(categoryName)}
                        className={`category-button ${
                            category === categoryName
                            ? 'bg-teal-500 text-white hover:bg-teal-600 transition duration-300'
                            : 'bg-gray-200 text-black hover:bg-gray-300 transition duration-300'
                        } px-3 py-1 rounded m-2`}
                        >
                        {categoryName}
                        </button>
                    ))}
                </div>
                <div className="min-h-screen">
                    {categoryComponent}
                </div>
            </div>
        )
    }
    else {
        return (
          <div className="new-listing-page p-4 h-screen flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-4">New Listing</h1>
            <Link to="/register" className="border rounded p-2 bg-teal-500 text-white hover:bg-teal-600 transition duration-300 font-bold w-auto">
              Login or register to add new listing
            </Link>
          </div>
        );
    }
}