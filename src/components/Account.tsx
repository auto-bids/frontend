import React from "react";
import OfferElement from "./OfferElement";

export default function Account() {
    return(
        <div className="account">
            <div className="account-header">
                <h2>Your account</h2>
                <img src='https://rybnik.policja.gov.pl/dokumenty/zalaczniki/57/57-663570_g.jpg' alt='jacek' />
                <h2>Jacek</h2>
                <h2>Jaworek</h2>
                <h3>email: jacek@jaworek.pl</h3>
            </div>
            <div className="account-offers">
                <h2>Your offers</h2>
                <div className="account-offers-elements">
                    {[...Array(6)].map((e, i) => <OfferElement key={i} />)}
                </div>
            </div>
            <div className="account-saved-offers">
                <h2>Saved offers</h2>
                <div className="account-saved-offers-elements">
                    {[...Array(6)].map((e, i) => <OfferElement key={i} />)}
                </div>
            </div>
            <div className="account-chat">
                <h2>Chat</h2>
            </div>
        </div>
    );
}