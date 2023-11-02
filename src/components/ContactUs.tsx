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
        <div className='contact-us'>
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>Description:
                    <textarea value={description} onChange={handleDescriptionChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
