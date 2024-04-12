import LoadingOverlay from "../Other/LoadingOverlay";
import React, {useState, useEffect} from "react";
import {Bar, Chart, Pie} from "react-chartjs-2";
import removePhotoFromCloudinary from '../../utils/cloudinaryApi';
import {Chart as ChartJS, ArcElement} from "chart.js/auto";
import emailjs from "@emailjs/browser";
import { off } from "process";
ChartJS.register(ArcElement);

export default function AdminPage() {
    const [category, setCategory] = useState("users");
    const [usersEmail, setUsersEmail] = useState("");
    const [offerLink, setOfferLink] = useState("");
    const [usersReason, setUsersReason] = useState("");
    const [offersReason, setOffersReason] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY || ''), []);

    const handleSendEmail = async () => {
        const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID ?? '';
        const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID ?? '';
        try {
            setLoading(true);
            await emailjs.send(serviceId, templateId, {
                name: usersEmail,
                recipient: usersEmail,
                reason: category === "users" ? usersReason : offersReason,
                category: category,
            });
            alert("email successfully sent");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleBanUser = async () => {
        if (!usersEmail || !usersReason) {
            alert("Please fill in all fields");
            return;
        }
        const confirmBan = window.confirm("Are you sure you want to ban this user?");
        if (confirmBan) {
            setLoading(true);
            try {
                await handleSendEmail();
                // const categories = ["cars", "motorcycles", "bids", "delivery-vans", "trucks", "trailers", "construction-machinery", "agricultural-machinery"];
                const categories = ["cars", "motorcycles"];
                for (const cat of categories) {
                    const catBetter = cat === "motorcycles" ? "motorcycle" : cat === "cars" ? "car" : cat;
                    const firstResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${cat}/search/user/${usersEmail}/1`, {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Credentials": "true",
                        },
                    });
                    if (!firstResponse.ok) {
                        throw new Error("Failed to fetch offers");
                    }
                    const firstData = await firstResponse.json();
                    const numberOfPages = firstData.data.number_of_pages;
                    if (numberOfPages === 0) {
                        continue;
                    }
                    else{
                        const offers = firstData.data.data;
                        for (let i = 2; i <= numberOfPages; i++) {
                            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${cat}/search/user/${usersEmail}/${i}`, {
                                method: "GET",
                                credentials: "include",
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Access-Control-Allow-Credentials": "true",
                                },
                            });
                            if (!response.ok) {
                                throw new Error("Failed to fetch offers");
                            }
                            const data = await response.json();
                            offers.push(...data.data.data);
                        }

                        await Promise.all(offers.map(async (offer: any) => {
                            await Promise.all(offer[catBetter].photos.map(async (photo: string) => {
                                try {
                                    await removePhotoFromCloudinary(photo);
                                } catch (error) {
                                    console.error(`Failed to delete photo ${photo} from cloud:`, error);
                                }
                            }));
                        }));
                        await Promise.all(offers.map(async (offer: any) => {
                            try{
                                await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/${cat}/delete/${offer.id}`, {
                                    method: "DELETE",
                                    credentials: "include",
                                    headers: {
                                        "Access-Control-Allow-Origin": "*",
                                        "Access-Control-Allow-Credentials": "true",
                                    },
                                });
                            }
                            catch (error) {
                                console.error(`Failed to ban offer ${offer.id}:`, error);
                            }
                        }));
                    }
                }
                const profileData = await fetch(`${process.env.REACT_APP_PROFILE_EMAIL_ENDPOINT}${usersEmail}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                        },
                        }
                 );
                if (!profileData.ok) {
                    throw new Error("Failed to fetch profile data");
                }
                const profile = await profileData.json();
                console.log('deleting profile')
                await fetch(`${process.env.REACT_APP_BAN_USER_ENDPOINT}${usersEmail}`, {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                    },
                });
                console.log('profile deleted')
                try{
                    removePhotoFromCloudinary(profile.data.data.profile_image);
                }
                catch (error) {
                    console.error(`Failed to delete photo ${profile.data.data.profile_image} from cloud:`, error);
                }
                setLoading(false);
            }
            catch (error) {
                setLoading(false);
                console.error(error);
            }
        }
    }

    const handleBanOffer = async () => {
        if (!offerLink || !offersReason) {
            alert("Please fill in all fields");
            return;
        }
        const confirmBan = window.confirm("Are you sure you want to ban this offer?");
        if (confirmBan) {
            setLoading(true);
            const parts = offerLink.split("/");
            const buyNowOrBid = parts[4];
            const offerCategory = buyNowOrBid === "bid" ? "bid" : parts[3];
            const offerId = parts[5];
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${offerCategory}/details/${offerId}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch offer data");
                }
                const offerData = await response.json();

                setUsersEmail(offerData.data.data.user_email);
                await new Promise((resolve) => setTimeout(resolve, 1000));

                const offerCategoryBetter = offerCategory === "motorcycles" ? "motorcycle" : offerCategory === "cars" ? "car" : offerCategory;
                
                console.log(offerData.data.data[offerCategoryBetter].photos);
                await Promise.all(offerData.data.data[offerCategoryBetter].photos.map(async (photo: string) => {
                    try {
                        await removePhotoFromCloudinary(photo);
                    } catch (error) {
                        console.error(`Failed to delete photo ${photo} from cloud:`, error);
                    }
                }));

                
                await handleSendEmail();
    
                await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/${offerCategory}/delete/${offerId}`, {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                    },
                });
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        }
    }

    const chartData = {
        labels: ["Users", "Offers"],
        datasets: [
            {
                label: "Users and Offers",
                data: [10, 25],
                backgroundColor: ["#14b8a6", "#737373"],
                hoverBackgroundColor: ["#14b8a6", "#737373"],
            },
        ],
    };

    const chartData2 = {
        labels: ["Cars", "Bids", "Motorcycles", "Delivery Vans", "Trucks", "Trailers", "Construction Machinery", "Agricultural Machinery"],
        datasets: [
            {
                label: "Offers",
                data: [20, 10, 15, 5, 10, 5, 10, 5],
                backgroundColor: ["#14b8a6", "#737373", "#14b8a6", "#737373", "#14b8a6", "#737373", "#14b8a6", "#737373"],
                hoverBackgroundColor: ["#14b8a6", "#737373", "#14b8a6", "#737373", "#14b8a6", "#737373", "#14b8a6", "#737373"],
            },
        ],
    };

    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Offers by category",
            },
        },
    };
    
    return(
        <div className="h-screen">
            {loading && <LoadingOverlay />}
            <div className="page-buttons flex justify-center items-center h-1/6 space-x-4">
                <button className={`bg-${category === "users" ? "teal-500" : "gray-400"} hover:bg-${category === "users" ? "blue" : "teal"}-700 text-white py-2 px-4 rounded transition duration-300`} onClick={() => setCategory("users")}>
                    Users
                </button>
                <button className={`bg-${category === "offers" ? "teal-500" : "gray-400"} hover:bg-${category === "offers" ? "blue" : "teal"}-700 text-white py-2 px-4 rounded transition duration-300`} onClick={() => setCategory("offers")}>
                    Offers
                </button>
                <button className={`bg-${category === "statistics" ? "teal-500" : "gray-400"} hover:bg-${category === "statistics" ? "blue" : "teal"}-700 text-white py-2 px-4 rounded transition duration-300`} onClick={() => setCategory("statistics")}>
                    Statistics
                </button>
            </div>
            <div className="page-content h-5/6">
                {category === "users" && (
                    <div className="flex flex-col items-center justify-center h-full space-y-4 p-4">
                        <h1 className="text-2xl font-bold">Ban user</h1>
                        <input type="text" placeholder="User's email" className="w-full h-12 px-4 border border-gray-300 rounded" onChange={(e) => setUsersEmail(e.target.value)} />
                        <textarea placeholder="Reason for ban" className="w-full h-32 px-4 border border-gray-300 rounded" onChange={(e) => setUsersReason(e.target.value)}/>
                        <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300" onClick={handleBanUser}>
                            Ban
                        </button>
                    </div>
                )}
                {category === "offers" && (
                    <div className="flex flex-col items-center justify-center h-full space-y-4 p-4">
                        <h1 className="text-2xl font-bold">Ban offer</h1>
                        <input type="text" placeholder="Link to offer" className="w-full h-12 px-4 border border-gray-300 rounded" onChange={(e) => setOfferLink(e.target.value)} />
                        <textarea placeholder="Reason for ban" className="w-full h-32 px-4 border border-gray-300 rounded" onChange={(e) => setOffersReason(e.target.value)}/>
                        <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300" onClick={handleBanOffer}>
                            Ban
                        </button>
                    </div>
                )}
                {category === "statistics" && (
                    <div>
                        <h1 className="text-2xl font-bold pb-3">Statistics</h1>
                        <div className="flex justify-center items-center space-x-4 pb-4">
                            <div className="w-2/5 max-h-96">
                                <Pie data={chartData} />
                            </div>
                            <div className="w-3/5 max-h-96">
                                <Bar data={chartData2} options={options2} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}