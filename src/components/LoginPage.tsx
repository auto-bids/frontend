import React from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const handleGoogleLogin = () => {
    };

    const handleFacebookLogin = () => {
    };

    const handleCustomLogin = () => {
    };

    return (
        <div>
            <h1>Login</h1>
            <button>
                <a href="http://localhost:8080/auth/google">Login with Google</a>
            </button>
            <button>
                <a href="http://localhost:8080/auth/facebook">Login with Facebook</a>
            </button>
            <h2>Auto-Bids Login</h2>
            <form>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button>Login</button>
            </form>
            <Link to="/register">
                <button>Register</button>
            </Link>
        </div>
    );
}
