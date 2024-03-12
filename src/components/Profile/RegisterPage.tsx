import React from "react";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Login Page</h1>
      <a
        href={`${process.env.REACT_APP_PROFILE_LOGIN_ENDPOINT}`}
        className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 transition duration-300"
      >
        Login with Google
      </a>
    </div>
  );
}
