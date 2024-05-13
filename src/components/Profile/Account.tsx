import React, {useEffect} from "react";
import OfferElement from "../Other/OfferElement";
import {useState} from "react";
import * as Yup from "yup";
import {Link} from "react-router-dom";
import EditOffer from "./EditOffer";
import removePhotoFromCloudinary from '../../utils/cloudinaryApi';
import LoadingOverlay from "../Other/LoadingOverlay";
import ChatList from "./ChatList";
import MyBids from "./MyBids";

interface IOffer {
    mileage: number;
    photos: string[];
    description: string;
    id: string;
    _id?: string;
    image: string;
    title: string;
    price: number;
    year: number;
    auctionEnd?: string
}


interface IProfile {
    email: string;
    user_name: string;
    profile_picture: string;
}

const AccountSchema = Yup.object().shape({
    user_name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    profile_picture: Yup.string()
        .url("Invalid URL")
        .required("Required"),
});

export default function Account({setIsLoggedIn}: { setIsLoggedIn: (value: boolean) => void; }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState<IProfile | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [editingOfferId, setEditingOfferId] = useState<string | null>(null)
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [selectedComponent, setSelectedComponent] = useState("yourOffers");
    const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("cars");
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.has('chat') && setSelectedComponent('chat');
    }, []);


    const handleEditProfile = () => {
        setIsEditing(true);
        setEditedProfile(profileData ? {...profileData} : null);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedProfile(null);
    };

    const handleDeleteAllOffers = async () => {
        const confirmed = window.confirm("Are you sure you want to delete all your offers?");
        offerData?.forEach((offer) => {
            offer.photos.forEach((photo) => {
                removePhotoFromCloudinary(photo);
            });
        });
        if (numberOfPages > 1) {
            for (let i = 2; i <= numberOfPages; i++) {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${category}/search/user/me/${i}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                    },
                });
                if (response.ok) {
                    const offers = await response.json();
                    offers.data.data.forEach((offer: any) => {
                        offer.car.photos.forEach((photo: string) => {
                            removePhotoFromCloudinary(photo);
                        });
                    });
                }
            }
        }

        if (confirmed) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${category}/delete/all/me`, {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                    },
                });

                if (response.ok) {
                    fetchUsersOffers();
                } else {
                    console.log("Error deleting all offers");
                }
            } catch (error) {
                console.error("Error deleting all offers:", error);
            }
        }
    }


    const handleSaveProfile = async () => {
        setLoading(true);
        const uploadedProfilePicture = newProfilePicture ? await (async () => {
            const formData = new FormData();
            formData.append("file", newProfilePicture);

            if (!newProfilePicture.type.startsWith('image/')) {
                alert("Please upload an image file.");
                setLoading(false);
                return null;
            }

            if (newProfilePicture.size > 10 * 1024 * 1024) {
                alert("File size must be less than 10MB.");
                setLoading(false);
                return null;
            }

            formData.append("upload_preset", `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);
            const response = await fetch(`${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            return data.secure_url;
        })() : null;

        if (uploadedProfilePicture !== null && profileData?.profile_picture) {
            await removePhotoFromCloudinary(profileData.profile_picture);
        }

        AccountSchema.validate(editedProfile)
            .then(() => {
                setIsEditing(false);
                setProfileData(editedProfile ? {...editedProfile} : null);
                const dataToSend = {
                    profile_image: uploadedProfilePicture || profileData?.profile_picture,
                    user_name: editedProfile?.user_name,
                };
                fetch(`${process.env.REACT_APP_PROFILE_EDIT_ENDPOINT}`, {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                    },
                    body: JSON.stringify(dataToSend),
                });
            })
            .then(() => {
                fetchData();
            })
            .catch((error) => {
                console.error("Error validating profile data:", error);
                if (error instanceof Yup.ValidationError) {
                    if (error.path === "user_name") {
                        alert("Name must be between 2 and 50 characters long");
                    }
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditedProfile(editedProfile ? {...editedProfile, [name]: value} : null);
    };

    const [offerData, setOfferData] = useState<IOffer [] | null>(null);
    const [profileData, setProfileData] = useState<IProfile | null>(null);

    const handleNextPage = () => {
        if (pageNumber < numberOfPages) {
            setPageNumber(pageNumber + 1);
        }
    }
    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PROFILE_LOGIN_ENDPOINT}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
            });
            if (response.status === 201) {
                if (document.cookie !== "isLoggedIn=true") {
                    document.cookie = "isLoggedIn=true";
                }
                window.location.reload();
            }
            if (response.status === 200) {
                setIsLoggedIn(true);
                if (document.cookie !== "isLoggedIn=true") {
                    document.cookie = "isLoggedIn=true";
                }
                const profileData = await response.json();
                setProfileData({
                    email: profileData.data.data.email,
                    user_name: profileData.data.data.user_name,
                    profile_picture: profileData.data.data.profile_image,
                });
            }
        } catch (error) {
            console.error("Error loading profile data:", error);
        }
    };

    const fetchUsersOffers = async () => {
        try {
            const uri = category !== "auction" ? `${process.env.REACT_APP_API_BASE_URL}/${category}/search/user/me/${pageNumber}` : `${process.env.REACT_APP_AUCTIONS_ENDPOINT}/my/${profileData?.email}/${pageNumber-1}`
            const response = await fetch(uri, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
            });
            if (response.ok) {
                const offers = await response.json();
                if (offers.data.data !== null) {
                    const offerData: IOffer[] = [];
                    setNumberOfPages(offers.data.number_of_pages);
                    if (offers.data.number_of_pages === 0) {
                        setOfferData([]);
                        return;
                    } else if (category === "cars") {
                        offers.data.data.forEach((offer: any) => {
                            offerData.push({
                                id: offer.id,
                                image: offer.car.photos.length > 0 ? offer.car.photos[0] : "",
                                title: offer.car.title,
                                price: offer.car.price,
                                year: offer.car.year,
                                description: offer.car.description,
                                mileage: offer.car.mileage,
                                photos: offer.car.photos,
                            });
                        });
                    } else if (category === "auction") {
                        offers.data.data.forEach((offer: any) => {
                            offerData.push({
                                id: offer._id,
                                image: offer.car.photos?.length > 0 ? offer.car.photos[0] : [],
                                title: offer.car.title,
                                price: offer.car.price,
                                year: offer.car.year,
                                description: offer.car.description,
                                mileage: offer.car.mileage,
                                photos: offer.car.photos,
                                auctionEnd: offer.end
                            });
                        });
                    } else if (category === "motorcycles") {
                        offers.data.data.forEach((offer: any) => {
                            offerData.push({
                                id: offer.id,
                                image: offer.motorcycle.photos.length > 0 ? offer.motorcycle.photos[0] : "",
                                title: offer.motorcycle.title,
                                price: offer.motorcycle.price,
                                year: offer.motorcycle.year,
                                description: offer.motorcycle.description,
                                mileage: offer.motorcycle.mileage,
                                photos: offer.motorcycle.photos,
                            });
                        });
                    }
                    setOfferData(offerData);
                }
                } else {
                    console.log("Error fetching offers");
                }

        } catch (error) {
            console.error("Error fetching offers:", error);
        }
    }

    useEffect(() => {
        fetchData().then();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchUsersOffers();
        // eslint-disable-next-line
    }, [pageNumber, editingOfferId, category]);

    const handleDeleteProfile = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account?");

        if (confirmed) {
            setLoading(true);
            offerData?.forEach((offer) => {
                offer.photos.forEach((photo) => {
                    removePhotoFromCloudinary(photo);
                });
            });
            if (numberOfPages > 1) {
                for (let i = 2; i <= numberOfPages; i++) {
                    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${category}/search/user/me/${i}`, {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Credentials": "true",
                        },
                    });
                    if (response.ok) {
                        const offers = await response.json();
                        offers.data.data.forEach((offer: any) => {
                            offer.car.photos.forEach((photo: string) => {
                                removePhotoFromCloudinary(photo);
                            });
                        });
                    }
                }
            }
            const categories = ["cars", "motorcycles", "auction", "delivery vans", "trucks", "construction machinery", "trailers", "agricultural machinery"].filter((cat) => cat !== category);
            for (const category of categories) {
                try {
                    let pageNumber = 1;
                    while (true) {
                        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${category}/search/user/me/${pageNumber}`, {
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
                                break;
                            }
                            offers.data.data.forEach((offer: any) => {
                                offer.car.photos.forEach((photo: string) => {
                                    removePhotoFromCloudinary(photo);
                                });
                            });
                            pageNumber++;
                        } else {
                            console.log("Error deleting offers");
                            break;
                        }
                    }
                } catch (error) {
                    console.error("Error deleting offers:", error);
                }

                for (const category of categories) {
                    try {
                        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${category}/delete/all/me`, {
                            method: "DELETE",
                            credentials: "include",
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Credentials": "true",
                            },
                        });
                        if (!response.ok) {
                            console.log("Error deleting offers");
                        }
                    } catch (error) {
                        console.error("Error deleting offers:", error);
                    }
                }
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_PROFILE_DELETE_ENDPOINT}`, {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                    },
                });

                const response2 = await fetch(`${process.env.REACT_APP_LOGOUT_ENDPOINT}`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                    },
                });

                if (response.ok && response2.ok) {
                    setIsLoggedIn(false);
                    if (document.cookie !== "isLoggedIn=false") {
                        document.cookie = "isLoggedIn=false";
                    }
                    window.location.href = "/";
                } else {
                    console.log("Error deleting profile");
                }
            } catch (error) {
                console.error("Error deleting profile:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_LOGOUT_ENDPOINT}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
            });
            if (response.ok) {
                setIsLoggedIn(false);
                if (document.cookie !== "isLoggedIn=false") {
                    document.cookie = "isLoggedIn=false";
                }
                window.location.href = "/";
            } else {
                console.log("Error logging out");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleDeleteOffer = async (id: string, photoUrls: string[]) => {
        const confirmed = window.confirm("Are you sure you want to delete this offer?");
        if (confirmed) {
            setLoading(true);
            try {
                photoUrls?.forEach((photo) => {
                    removePhotoFromCloudinary(photo);
                });
                const uri = category !== "auction" ? `${process.env.REACT_APP_API_BASE_URL}/${category}/delete/me` : `${process.env.REACT_APP_AUCTIONS_ENDPOINT}remove/${profileData?.email}/${id}`;
                const response = await fetch(uri, {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                    },
                    body: JSON.stringify({id}),
                });

                if (response.ok) {
                    fetchUsersOffers();
                } else {
                    console.log("Error deleting offer");
                }
            } catch (error) {
                console.error("Error deleting offer:", error);
            } finally {
                setLoading(false);
            }
        }
    };


    const handleEditOffer = (id: string) => {
        setEditingOfferId(id);
    }

    if (!profileData) {
        return (
            <div className="account p-4 h-screen">
                <h2 className="text-xl font-bold">Loading...</h2>
                <div className="account-header-buttons-element">
                    <p className="text-gray-700">If it takes too long, try logging in again</p>
                    <button onClick={handleLogout}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300">
                        Logout
                    </button>
                </div>
            </div>
        )
    }


    return (
        <div className="account bg-gray-100 min-h-screen">
            {loading && <LoadingOverlay/>}
            <div className="account-header flex justify-between items-center bg-gray-400 p-4 shadow-md shadow-gray-300">
                <div className="account-header-profile flex items-center">
                    <img src={profileData?.profile_picture} alt="profile" className="w-20 h-20 rounded-full mr-4"/>
                    <div className="account-header-profile-info">
                        <h2 className="text-xl font-bold">{profileData?.user_name}</h2>
                        <p>{profileData?.email}</p>
                    </div>
                </div>
                <div className="account-header-buttons flex">
                    <div className="account-header-buttons-element mr-4">
                        <button onClick={handleEditProfile}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                            Edit Profile
                        </button>
                    </div>
                    <div className="account-header-buttons-element mr-4">
                        <button onClick={handleDeleteProfile}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
                            Delete
                        </button>
                    </div>
                    <div className="account-header-buttons-element">
                        <button onClick={handleLogout}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            {isEditing && editedProfile && (
                <div className="account-edit-profile mt-4 p-4 border border-gray-300 rounded">
                    <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                    <label className="block mb-2">
                        Name:
                        <input
                            type="text"
                            name="user_name"
                            value={editedProfile.user_name}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                    </label>
                    <label className="block mb-4">
                        Profile picture:
                        <input
                            type="file"
                            name="profile_picture"
                            onChange={(e) => setNewProfilePicture(e.target.files ? e.target.files[0] : null)}
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                    </label>
                    <div className="flex justify-end">
                        <button onClick={handleCancelEdit}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition duration-300">
                            Cancel
                        </button>
                        <button onClick={handleSaveProfile}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                            Save
                        </button>
                    </div>
                </div>
            )}
            <div className="account-component-selection pt-2">
                <button onClick={() => setSelectedComponent("yourOffers")}
                        className={`mr-2 px-4 py-2 focus:outline-none border rounded ${selectedComponent === "yourOffers" ? "bg-teal-500 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-400"}`}>
                    Your offers
                </button>
                <button onClick={() => setSelectedComponent("chat")}
                        className={`px-4 py-2 focus:outline-none border rounded ${selectedComponent === "chat" ? "bg-teal-500 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-400"}`}>
                    Chat
                </button>
                <button onClick={() => setSelectedComponent("mybids")}
                        className={`px-4 py-2 focus:outline-none border rounded ${selectedComponent === "mybids" ? "bg-teal-500 text-white ml-2" : "bg-gray-300 text-gray-700 hover:bg-gray-400 ml-2"}`}>
                    My Bids
                </button>
            </div>
            {selectedComponent === "yourOffers" &&
                <div className="account-offers p-4 bg-gray-100">
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded focus:outline-none"
                    >
                        <option value="cars">cars</option>
                        <option value="auction">auction</option>
                        <option value="motorcycles">motorcycles</option>
                        <option value="delivery vans">delivery vans</option>
                        <option value="trucks">trucks</option>
                        <option value="construction machinery">construction machinery</option>
                        <option value="trailers">trailers</option>
                        <option value="agricultural machinery">agricultural machinery</option>
                    </select>
                    <button onClick={handleDeleteAllOffers}
                            className="bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-600 transition duration-300">
                        Delete all offers in this category
                    </button>
                    <div className="account-offers-elements mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {offerData &&
                            offerData.map((offer, index) => (
                                <div key={offer.id}
                                     className={`border p-4 rounded bg-white ${index === offerData.length - 1 && offerData.length % 3 === 1 ? 'col-span-1 md:col-start-2 lg:col-start-2' : ''}`}>
                                    {editingOfferId === offer.id ? (
                                        <EditOffer
                                            setEditingOfferId={setEditingOfferId}
                                            id={offer.id}
                                            title={offer.title}
                                            description={offer.description}
                                            price={offer.price}
                                            mileage={offer.mileage}
                                            photos={offer.photos}
                                            category={category}
                                            type={category === "auction" ? "auction" : "offer"}
                                            email={profileData.email}
                                            year={offer.year}
                                        />
                                    ) : (
                                        <Link to={`/${category}/offer/${offer.id}`} className="block rounded p-4">
                                            <OfferElement
                                                image={offer.image}
                                                title={offer.title}
                                                price={offer.price}
                                                year={offer.year}
                                                auctionEnd={offer.auctionEnd}
                                                offerId={offer.id}
                                            />
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => handleDeleteOffer(offer.id, offer.photos)}
                                        className="mt-2 bg-red-500 text-white px-4 py-2 mr-2 rounded hover:bg-red-600 transition duration-300"
                                    >
                                        Delete
                                    </button>
                                    {editingOfferId === offer.id ? (
                                        <button
                                            onClick={() => handleEditOffer('')}
                                            className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
                                        >
                                            Cancel
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEditOffer(offer.id)}
                                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                            ))}
                    </div>
                    <div className="mt-4 flex justify-between">
                        <button onClick={handlePreviousPage}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300">
                            Previous
                        </button>
                        <button onClick={handleNextPage}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300">
                            Next
                        </button>
                    </div>
                </div>
            }
            {selectedComponent === "chat" &&
                <div className="account-chat pt-4 p-4 bg-gray-100">
                    <h2 className="text-xl font-bold mb-4">Chats</h2>
                    <div className="account-chat-elements">
                        <ChatList receiverEmail={profileData.email}/>
                    </div>
                </div>
            }
            {selectedComponent === "mybids" &&
                <div className="account-chat pt-4 p-4 bg-gray-100">
                    <MyBids email={profileData.email}/>
                </div>
            }
        </div>
    );

}