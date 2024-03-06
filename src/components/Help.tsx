import React from "react";

export default function Help() {
    return (
        <div className='help p-4'>
            <h1 className="text-2xl font-bold mb-2">How Can We Help You?</h1>
            <p className="mb-4 bg-gray-200 border rounded">
                Welcome to our Help Center. We are here to assist you with any questions or issues you may have. Please feel free to reach out to us for support.
            </p>
            <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
            <p className="mb-4 bg-gray-200 border rounded">
                If you need assistance, you can contact our customer support team by email or phone.
            </p>
            <p className="mb-4 bg-gray-200 border rounded">
                Email: support@our-company.com
                <br />
                Phone: +1-123-456-7890
            </p>
            <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="mb-4 bg-gray-200 border rounded">
                Before contacting us, you might want to check our list of frequently asked questions (FAQs). You may find answers to common queries there.
            </p>
            <h3 className="text-2xl font-bold mb-2">How do I create an account?</h3>
            <p className="mb-4 bg-gray-200 border rounded">
                To create an account, click on the "Sign Up" button in the top right corner of the page. Then, fill out the form with your information and click "Sign Up".
            </p>
            <h3 className="text-2xl font-bold mb-2">How do I log in to my account?</h3>
            <p className="mb-4 bg-gray-200 border rounded">
                To log in to your account, click on the "Log In" button in the top right corner of the page. Then, enter your email and password and click "Log In".
            </p>
        </div>
    );
}
