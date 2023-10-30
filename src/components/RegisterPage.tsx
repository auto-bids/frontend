import React from "react";

export default function RegisterPage() {
    return (
        <div>
            <h1>Register</h1>
            <form>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" />
                </div>
                <input type="submit" value="Register" />
            </form>
        </div>
    );
}