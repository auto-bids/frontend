import LoadingOverlay from "../Other/LoadingOverlay";
import React, {useState, useEffect} from "react";
import {Bar, Chart, Pie} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement} from "chart.js/auto";
ChartJS.register(ArcElement);

export default function AdminPage() {
    const [category, setCategory] = useState("users");
    const [usersEmail, setUsersEmail] = useState("");
    const [offerID, setOfferID] = useState("");
    const [usersReason, setUsersReason] = useState("");
    const [offersReason, setOffersReason] = useState("");
    const [loading, setLoading] = useState(false);

    const handleBanUser = async () => {
        if (!usersEmail || !usersReason) {
            alert("Please fill in all fields");
            return;
        }
        const confirmBan = window.confirm("Are you sure you want to ban this user?");
        if (confirmBan) {
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
    }

    const handleBanOffer = async () => {
        if (!offerID || !offersReason) {
            alert("Please fill in all fields");
            return;
        }
        const confirmBan = window.confirm("Are you sure you want to ban this offer?");
        if (confirmBan) {
            setLoading(true);
            try {
                await fetch(`${process.env.REACT_APP_BAN_OFFER_ENDPOINT}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: offerID,
                        reason: offersReason,
                    }),
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