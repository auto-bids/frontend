import React, {useEffect} from "react";
import OfferElement from "../Other/OfferElement";
import {useState} from "react";
import {Link} from "react-router-dom";
import ChatPopup from "./ChatPopup";
import Modal from "react-modal";

interface IOffer {
    id: string;
    image: string;
    title: string;
    price: number;
    year: number;
}


interface ISeller {
    email: string;
    user_name: string;
    profile_picture: string;
}

export default function SellerPage() {
    const [selectedCategory, setSelectedCategory] = useState("cars");
    const [sellerData, setSellerData] = useState<ISeller | null>(null);
    const [offerData, setOfferData] = useState<IOffer [] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [chatModalIsOpen, setChatModalIsOpen] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/profiles/user/` + window.location.pathname.split("/")[2], {
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

    const handleModal = () => {
        setChatModalIsOpen(!chatModalIsOpen);
    }

    const fetchOfferData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${selectedCategory}/search/user/${window.location.pathname.split("/")[2]}/${currentPage}?${searchPhrase}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
            });
            if (response.ok) {
                const offers = await response.json();
            if (offers.data.number_of_pages === 0) {
              setOfferData([]);
              setIsLoading(false);
              return;
            }
                const offerData: IOffer[] = [];
                offers.data.data.forEach((offer: any) => {
                    selectedCategory === "cars" && offerData.push({
                        id: offer.id,
                        image: offer.car.photos.length > 0 ? offer.car.photos[0] : "",
                        title: offer.car.title,
                        price: offer.car.price,
                        year: offer.car.year,
                    });
              selectedCategory === "motorcycles" && offerData.push({
                id: offer.id,
                image: offer.motorcycle.photos.length > 0 ? offer.motorcycle.photos[0] : "",
                title: offer.motorcycle.title,
                price: offer.motorcycle.price,
                year: offer.motorcycle.year,
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
    }, [currentPage, selectedCategory]);


    function handleSearch() {
        setIsLoading(true);
        fetchOfferData();
    }

    if (!sellerData && !isLoading) {
        return (
            <div className="offer-page bg-gray-100 flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold text-center p-4 bg-gray-400 shadow-md border width-100% rounded-md"
                >Seller not found</h1>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="offer-page bg-gray-100 flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold text-center p-4 bg-gray-400 shadow-md border width-100% rounded-md"
                >Loading...</h1>
            </div>
        );
    }

    return(
      <div className="seller-page">
      <div className="seller-page-header flex items-center p-4">
        <img src={sellerData?.profile_picture} alt="seller profile picture" className="w-20 h-20 rounded-full object-cover mr-4" />
        <div>
          <h1 className="text-2xl font-bold">{sellerData?.user_name}</h1>
          <h2>{sellerData?.email}</h2>
        </div>
        <div className="seller-page-buttons ml-auto">
                    {document.cookie === "isLoggedIn=true" && document.cookie.split("=")[1] === "true" ? (
                        <button
                            className="px-4 py-2 bg-teal-500 text-white rounded focus:outline-none hover:bg-teal-600 transition duration-300"
                            onClick={handleModal}
                        >Chat</button>
                    ) : (
                        <Link to="/register">
                            <button
                                className="px-4 py-2 bg-teal-500 text-white rounded focus:outline-none hover:bg-teal-600 transition duration-300">Register/Login
                                to chat with the seller
                            </button>
                        </Link>
                    )}
                </div>
      </div>
        <div className="seller-page-offers mt-4">
          <div className="seller-page-offers-search mb-1 pb-3 shadow-md">
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none"
            >
              <option value="cars">cars</option>
              <option value="motorcycles">motorcycles</option>
              <option value="delivery vans">delivery vans</option>
              <option value="trucks">trucks</option>
              <option value="construction machinery">construction machinery</option>
              <option value="trailers">trailers</option>
              <option value="agricultural machinery">agricultural machinery</option>
            </select>
            <input type="text" placeholder="Search" className="px-4 py-2 border border-gray-300 rounded focus:outline-none" onChange={(e) => setSearchPhrase('search_phrase='+e.target.value)} />
            <button className="px-4 py-2 bg-teal-500 text-white rounded focus:outline-none hover:bg-teal-600 transition duration-300" onClick={handleSearch} >Search</button>
          </div>
          {isLoading ? (
            <div className="offer-page bg-gray-100 flex justify-center items-center h-screen">
              <h1 className="text-2xl font-bold text-center p-4 bg-gray-400 shadow-md border width-100% rounded-md"
              >Loading...</h1>
            </div>
          ) : offerData && offerData.length > 0 ? (
            <>
            <div className="seller-page-offers-offers grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-100 p-3">
              {offerData.map((offer, index) => (
                <Link to={`/${selectedCategory}/offer/${offer.id}`} key={offer.id} className={`block rounded p-1 ${index === offerData.length - 1 && offerData.length % 3 === 1 ? 'col-span-1 md:col-start-2 lg:col-start-2' : ''}`}>
                  <OfferElement image={offer.image} title={offer.title} price={offer.price} year={offer.year} />
                </Link>
              ))}
            </div>
            <div className="seller-page-offers-pagination pt-4 flex justify-center pb-4 bg-white">
              {currentPage > 1 && (
                <button onClick={() => setCurrentPage(currentPage - 1)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-300 focus:outline-none">Previous</button>
              )}
              {currentPage < numberOfPages && numberOfPages>1 && (
                <button onClick={() => setCurrentPage(currentPage + 1)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-300 focus:outline-none">Next</button>
              )}
            </div>
            </>
          ) : (
            <div className="offer-page bg-gray-100 flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold text-center p-4 bg-gray-400 shadow-md border width-100% rounded-md"
                >No offers found</h1>
            </div>
          )}
          <Modal isOpen={chatModalIsOpen} appElement={document.getElementById('root') as HTMLElement} style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.25)'
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '60%',
                        height: '80%',
                        borderRadius: '30px',
                        paddingTop: '8px'
                    }

                }}>
                    <button
                        className="px-4 py-2 bg-red-400 text-white rounded focus:outline-none hover:bg-red-500 transition duration-300 absolute top-4 right-4 backdrop-blur-0"
                        onClick={handleModal}
                    >X
                    </button>
                    {chatModalIsOpen && <ChatPopup receiverEmail={window.location.pathname.split("/")[2]}/>}
            </Modal>
        </div>
    </div>
  );
      
}
