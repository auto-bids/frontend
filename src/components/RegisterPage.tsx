import React from "react";
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {
    const navigate = useNavigate();

    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        try{
            const response = await fetch("http://localhost:4000/profiles/login/me", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
            });

            if (response.ok){
                console.log("great success");
            }
            else{
                console.log("error");
            }
            navigate("/");

            console.log(response.body);
        }

        catch(error){
            console.log(error);
        }
    };
    
    return (
        <div>
            <h1>Register page</h1>
            <form>
                <a href="http://localhost:4000/profiles/login/me">Google</a>
                <button onClick={onSubmit}>
                    TYLKO ARKA GDYNIA
                </button>
            </form>
        </div>
    );
    }