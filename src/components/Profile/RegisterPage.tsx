import React from "react";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <a
        href={`${process.env.REACT_APP_API_BASE_URL}/profiles/login/me`}
        className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 transition duration-300 text-center"
      >
        Open the login page
      </a>
    </div>
  );
}
