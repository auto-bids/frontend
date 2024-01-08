import React from "react";

export default function RegisterPage() {
    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        try{
            const response = await fetch("http://localhost:4000/profiles/create/me", {
                method: "GET",
                mode: "cors",
                redirect: "follow",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
            if (response.ok){
                console.log("great success");
            }
            else{
                console.log("error");
            }
        }
        catch(error){
            console.log(error);
        }
    };
    
    return (
        <div>
            <h1>Register</h1>
            <form>
                <button onClick={onSubmit}>
                    Register with facebook
                </button>
            </form>
        </div>
    );
}