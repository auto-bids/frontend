import React from "react";

export default function RegisterPage() {
    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        try{
            const response = await fetch("http://4.225.3.102/profiles/create/me", {
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
            <h1>Register page</h1>
            <form>
                <button onClick={onSubmit}>
                    Register
                </button>
            </form>
        </div>
    );
}