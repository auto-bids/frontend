import React, {useState, useEffect} from "react";

export default function AdminPage() {
    const [category, setCategory] = useState("users");
    const [usersEmail, setUsersEmail] = useState("");
    const [offerID, setOfferID] = useState("");
    const [usersReason, setUsersReason] = useState("");
    const [offersReason, setOffersReason] = useState("");
    
    return(
        <div className="h-screen">
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
                        <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300">
                            Ban
                        </button>
                    </div>
                )}
                {category === "offers" && (
                    <div className="flex flex-col items-center justify-center h-full space-y-4 p-4">
                        <h1 className="text-2xl font-bold">Ban offer</h1>
                        <input type="text" placeholder="Offer ID" className="w-full h-12 px-4 border border-gray-300 rounded" />
                        <textarea placeholder="Reason for ban" className="w-full h-32 px-4 border border-gray-300 rounded"></textarea>
                        <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300">
                            Ban
                        </button>
                    </div>
                )}
                {category === "statistics" && (
                    <div>
                        <h1>Statistics</h1>

                    </div>
                )}
            </div>
        </div>
    )
}