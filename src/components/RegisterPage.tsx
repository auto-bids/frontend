import React from "react";

export default function RegisterPage() {
    
    return (
        <div>
            <h1>Login page</h1>
            <a href={`${process.env.REACT_APP_PROFILE_LOGIN_ENDPOINT}`}>
                Login with Google
            </a>
        </div>
    );
}
