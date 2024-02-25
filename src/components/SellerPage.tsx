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
          const response = await fetch(`${process.env.REACT_APP_CARS_EMAIL_PAGE_ENDPOINT}/` + window.location.pathname.split("/")[2]+'/1', {
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
            setOfferData(offerData);
          }
        } catch (error) {
          console.error("Error loading offer data:", error
          );
        }
      }

      useEffect(() => {
        fetchData();
        fetchOfferData();
      }, []);

    
    return(
        <div className="seller-page">
            <div className="seller-page-header">
                <img src={sellerData?.profile_picture} alt="seller profile picture" />
                <h1>{sellerData?.user_name}</h1>
                <h2>{sellerData?.email}</h2>
            </div>
            <div className="seller-page-buttons">
                <button onClick={() => setShowContactOrOffer("offer")}>Offers</button>
                <button onClick={() => setShowContactOrOffer("contact")}>Contact</button>
            </div>
            {showContactOrOffer === "offer" && 
            <div className="seller-page-offers">
                <div className="seller-page-offers-search">
                    <select onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="all">all</option>
                        <option value="cars">cars</option>
                        <option value="motorcycles">motorcycles</option>
                        <option value="delivery vans">delivery vans</option>
                        <option value="trucks">trucks</option>
                        <option value="construction machinery">construction machinery</option>
                        <option value="trailers">trailers</option>
                        <option value="agricultural machinery">agricultural machinery</option>
                    </select>
                    {selectedCategory === "cars" && <ParametersInput showAllFields={showAllFields} buyNowOrBid="buyNow" searchParameters= {null} />}
                    {selectedCategory === "motorcycles" && <ParametersInputMotorcycles showAllFields={showAllFields} searchParameters={null} />}
                    {selectedCategory === "delivery vans" && <ParametersInputDeliveryVans showAllFields={showAllFields} searchParameters={null}/>}
                    {selectedCategory === "trucks" && <ParametersInputTrucks showAllFields={showAllFields} searchParameters={null}/> }
                    {selectedCategory === "construction machinery" && <ParametersInputConstructionMachinery showAllFields={showAllFields} searchParameters={null}/>}
                    {selectedCategory === "trailers" && <ParametersInputTrailers showAllFields={showAllFields} searchParameters={null}/> }
                    {selectedCategory === "agricultural machinery" && <ParametersInputAgriculturalMachinery showAllFields={showAllFields} searchParameters={null}/>}
                    {selectedCategory === "all" &&
                        <>
                            <input type="text" placeholder="Search" />
                            <button>Search</button>
                        </>
                    }
                    <button className="show-all-fields" onClick={() => setShowAllFields(!showAllFields)}>{showAllFields ? "Hide additional fields" : "Show additional fields"}</button>
                </div>
                <h1>Offers</h1>
                <div className="seller-page-offers-offers">
                  {offerData && offerData.map((offer) => {
                        return (
                            <OfferElement key={offer.id} image={offer.image} title={offer.title} price={offer.price} year={offer.year} />
                        )
                    }
                    )}
                </div>
            </div>}
            {showContactOrOffer === "contact" &&
            <div className="seller-page-contact">
                <h1>Contact</h1>
                <div className="seller-page-contact-info">
                    <h2>Phone number</h2>
                    <h2>Address</h2>
                    <h2>{sellerData?.email}</h2>
                </div>
            </div>}
        </div>
      
    )
}
