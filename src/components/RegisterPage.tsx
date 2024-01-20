import React from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.API_GATEWAY_URI;

export default function RegisterPage() {
    const navigate = useNavigate();

    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        window.location.href = apiUrl + "/profiles/create/me";
        navigate("/");
        // try{
        //     const response = await fetch("API_GATEWAY_URI + "/profiles/create/me";", {
        //         method: "GET",
        //         mode: "cors",
        //         redirect: "follow",
        //         credentials: "include",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Access-Control-Allow-Origin": "*",
        //         },
        //     });
        //     if (response.ok){
        //         console.log("great success");
        //     }
        //     else{
        //         console.log("error");
        //     }
        // }
        // catch(error){
        //     console.log(error);
        // }
    };
    
    return (
        <div>
            <h1>Register page</h1>
            <form>
                <button onClick={onSubmit}>
                    Register
                </button>
            </form>
        </div>
    );
}