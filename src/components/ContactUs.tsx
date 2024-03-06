import React, { useState } from "react";

export default function ContactUs() {
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
    };

    const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const emailData = {
            email: email,
            description: description,
        };
        //tutaj dodać ewentualną funkcję wysyłającą email
        console.log(emailData);
    };

    return (
        <div className="contact-us p-4 h-screen">
          <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
          <form onSubmit={handleSubmit} className="mb-4">
            <label className="block mb-2">
              Email:
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="block w-full border border-gray-300 p-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Description:
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                className="block w-full border border-gray-300 p-2 rounded"
              />
            </label>
            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      );
      
}
