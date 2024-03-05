import React, {useEffect} from "react";
import ParametersInput from "./ParametersInput";
import ParametersInputMotorcycles from "./ParametersInputMotorcycles";
import OfferElement from "./OfferElement";
import ParametersInputDeliveryVans from "./ParametersInputDeliveryVans";
import ParametersInputTrucks from "./ParametersInputTrucks";
import ParametersInputConstructionMachinery from "./ParametersInputConstructionMachinery";
import ParametersInputTrailers from "./ParametersInputTrailers";
import ParametersInputAgriculturalMachinery from "./ParametersInputAgriculturalMachinery";
import { useState } from "react";
import { Link } from "react-router-dom";

interface IOffer {
  id: string;
  image: string;
  title: string;
  price: number;
  year: number;
};


interface ISeller {
  email: string;
  user_name: string;
  profile_picture: string;
}

export default function SellerPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showAllFields, setShowAllFields] = useState(false);
    const [showContactOrOffer, setShowContactOrOffer] = useState("offer");
    const [sellerData, setSellerData] = useState<ISeller | null>(null);
    const [offerData, setOfferData] = useState<IOffer [] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_PROFILE_EMAIL_ENDPOINT}` + window.location.pathname.split("/")[2], {
          method: "GET",
              credentials: "include",
              headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Credentials": "true",
              },
        });
        if (response.ok) {
          const profileData = await response.json();
          setSellerData({
            email: profileData.data.data.email,
            user_name: profileData.data.data.user_name,
            profile_picture: profileData.data.data.profile_image,
          });
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    };

      const fetchOfferData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_CARS_EMAIL_PAGE_ENDPOINT}/` + window.location.pathname.split("/")[2]+`/${currentPage}`, {
            method: "GET",
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
          });
          if (response.ok) {
            const offers = await response.json();
            const offerData: IOffer[] = [];
            offers.data.data.forEach((offer: any) => {
              offerData.push({
                id: offer.id,
                image: offer.car.photos.length > 0 ? offer.car.photos[0] : "",
                title: offer.car.title,
                price: offer.car.price,
                year: offer.car.year,
              });
            });
            setNumberOfPages(offers.data.number_of_pages);
            setOfferData(offerData);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error loading offer data:", error);
          setIsLoading(false);
        }
      }

      useEffect(() => {
        fetchData();
        fetchOfferData();
      }, [currentPage]);

    
    return(
      <div className="seller-page p-4">
      <div className="seller-page-header flex items-center">
        <img src={sellerData?.profile_picture} alt="seller profile picture" className="w-12 h-12 rounded-full object-cover mr-4" />
        <div>
          <h1 className="text-2xl font-bold">{sellerData?.user_name}</h1>
          <h2>{sellerData?.email}</h2>
        </div>
      </div>
      <div className="seller-page-buttons mt-4 flex">
        <button onClick={() => setShowContactOrOffer("offer")} className={`mr-2 px-4 py-2 focus:outline-none ${showContactOrOffer === "offer" ? "bg-teal-500 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-400"}`}>Offers</button>
        <button onClick={() => setShowContactOrOffer("contact")} className={`px-4 py-2 focus:outline-none ${showContactOrOffer === "contact" ? "bg-teal-500 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-400"}`}>Contact</button>
      </div>
      {showContactOrOffer === "offer" && (
        <div className="seller-page-offers mt-4">
          <div className="seller-page-offers-search">
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none"
            >
              <option value="all">all</option>
              <option value="cars">cars</option>
              <option value="motorcycles">motorcycles</option>
              <option value="delivery vans">delivery vans</option>
              <option value="trucks">trucks</option>
              <option value="construction machinery">construction machinery</option>
              <option value="trailers">trailers</option>
              <option value="agricultural machinery">agricultural machinery</option>
            </select>
            {selectedCategory === "cars" && <ParametersInput showAllFields={showAllFields} buyNowOrBid="buyNow" searchParameters={null} />}
            {selectedCategory === "motorcycles" && <ParametersInputMotorcycles showAllFields={showAllFields} searchParameters={null} />}
            {selectedCategory === "delivery vans" && <ParametersInputDeliveryVans showAllFields={showAllFields} searchParameters={null} />}
            {selectedCategory === "trucks" && <ParametersInputTrucks showAllFields={showAllFields} searchParameters={null} />}
            {selectedCategory === "construction machinery" && <ParametersInputConstructionMachinery showAllFields={showAllFields} searchParameters={null} />}
            {selectedCategory === "trailers" && <ParametersInputTrailers showAllFields={showAllFields} searchParameters={null} />}
            {selectedCategory === "agricultural machinery" && <ParametersInputAgriculturalMachinery showAllFields={showAllFields} searchParameters={null} />}
            {selectedCategory === "all" && (
              <>
                <input type="text" placeholder="Search" className="px-4 py-2 border border-gray-300 rounded focus:outline-none" />
                <button className="px-4 py-2 bg-teal-500 text-white rounded focus:outline-none hover:bg-teal-600 transition duration-300">Search</button>
              </>
            )}
            {selectedCategory !== "all" && (
              <button
                onClick={() => setShowAllFields(!showAllFields)}
                className='show-all-fields mb-4 p-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-300'
              >
                {showAllFields ? "Hide additional fields" : "Show additional fields"}
              </button>
            )}
          </div>
          <h1 className="text-2xl font-bold mt-4">Offers</h1>
          {isLoading ? (
            <div className="offer-page bg-gray-100 flex justify-center items-center h-screen">
              <h1 className="text-2xl font-bold text-center p-4 bg-gray-400 shadow-md border width-100% rounded-md"
              >Loading...</h1>
            </div>
          ) : offerData && offerData.length > 0 ? (
            <>
            <div className="seller-page-offers-offers grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {offerData.map((offer) => (
                <Link to={`/cars/offer/${offer.id}`} key={offer.id} className="block border border-gray-300 rounded p-4 transition duration-300 hover:shadow-md">
                  <OfferElement image={offer.image} title={offer.title} price={offer.price} year={offer.year} />
                </Link>
              ))}
            </div>
            <div className="seller-page-offers-pagination mt-4 flex justify-center">
              {currentPage > 1 && (
                <button onClick={() => setCurrentPage(currentPage - 1)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l hover:bg-gray-400 transition duration-300 focus:outline-none">Previous</button>
              )}
              {currentPage < numberOfPages && numberOfPages>1 && (
                <button onClick={() => setCurrentPage(currentPage + 1)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r hover:bg-gray-400 transition duration-300 focus:outline-none">Next</button>
              )}
            </div>
            </>
          ) : (
            <div className="offer-page bg-gray-100 flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold text-center p-4 bg-gray-400 shadow-md border width-100% rounded-md"
                >No offers found</h1>
            </div>
          )}
        </div>
      )}
      {showContactOrOffer === "contact" && (
        <div className="seller-page-contact mt-4 h-screen">
          <h1 className="text-2xl font-bold">Contact</h1>
          <div className="seller-page-contact-info mt-4 space-y-2">
            <div>
              <h2 className="text-lg font-bold">Phone number</h2>
            </div>
            <div>
              <h2 className="text-lg font-bold">Address</h2>
            </div>
            <div>
              <h2 className="text-lg font-bold">{sellerData?.email}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
      
}
