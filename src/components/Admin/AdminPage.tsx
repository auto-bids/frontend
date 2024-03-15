import LoadingOverlay from "../Other/LoadingOverlay";
import React, {useState, useEffect} from "react";
import { Doughnut } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

export default function AdminPage() {
    const [category, setCategory] = useState("users");
    const [usersEmail, setUsersEmail] = useState("");
    const [offerID, setOfferID] = useState("");
    const [usersReason, setUsersReason] = useState("");
    const [offersReason, setOffersReason] = useState("");
    const [loading, setLoading] = useState(false);

    const handleBanUser = async () => {
        setLoading(true);
        try {
            await fetch(`${process.env.REACT_APP_BAN_USER_ENDPOINT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: usersEmail,
                    reason: usersReason,
                }),
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    const handleBanOffer = async () => {
        setLoading(true);
        try {
            await fetch(`${process.env.REACT_APP_BAN_OFFER_ENDPOINT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    offerID: offerID,
                    reason: offersReason,
                }),
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }
    
    return(
        <div className="h-screen">
            {loading && <LoadingOverlay />}
            <div className="page-buttons flex justify-center items-center h-1/6 space-x-4">
                <button className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded transition duration-300" onClick={() => setCategory("users")}>
                    Users
                </button>
                <button className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded transition duration-300" onClick={() => setCategory("offers")}>
                    Offers
                </button>
                <button className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded transition duration-300" onClick={() => setCategory("statistics")}>
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
                        <input type="text" placeholder="Offer ID" className="w-full h-12 px-4 border border-gray-300 rounded" onChange={(e) => setOfferID(e.target.value)} />
                        <textarea placeholder="Reason for ban" className="w-full h-32 px-4 border border-gray-300 rounded" onChange={(e) => setOffersReason(e.target.value)}/>
                        <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300" onClick={handleBanOffer}>
                            Ban
                        </button>
                    </div>
                )}
                {category === "statistics" && (
                    <div>
                        <h1 className="text-2xl font-bold pb-3">Statistics</h1>
                        <div style={{ maxWidth: "300px", margin: "0 auto" }}>
                            <Doughnut
                                data={{
                                    labels: ["Users", "Offers"],
                                    datasets: [
                                        {
                                            label: "Users and Offers",
                                            data: [10, 20],
                                            backgroundColor: ["#14b8a6", "#737373"],
                                            hoverBackgroundColor: ["#14b8a6", "#737373"],
                                        },
                                    ],
                                }} 
                                options={{
                                    plugins: {
                                        legend: {
                                            display: true,
                                            labels: {
                                                color: 'rgb(255, 99, 132)'
                                            }
                                        },
                                    },  
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}