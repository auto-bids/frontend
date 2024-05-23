import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import LoadingOverlay from "../Other/LoadingOverlay";

export default function ContactUs() {
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY || ''), []);

    const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
    };

    const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescription(event.target.value);
    };

    const handleSendEmail = async () => {
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID ?? '';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID_2 ?? '';
      try {
          setLoading(true);
          await emailjs.send(serviceId, templateId, {
              email: email,
              description: description,
          });
          alert("email successfully sent");
      } catch (error) {
          console.log(error);
      } finally {
          setLoading(false);
      }
  }
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        handleSendEmail();
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
