import React, {useState, useEffect} from "react";

interface IProfile {
    email: string;
    name: string;
    surname: string;
    profilePicture: string;
}

interface IOffer {
    agriculturalMachinery: {
        photos: string[];
        title: string;
        price: number;
        year: number;
    };
    generalOffer: {
        photos: string[];
        title: string;
        price: number;
        year: number;
    };
    constructionMachinery: {
        photos: string[];
        title: string;
        price: number;
        year: number;
    };
    deliveryVans: {
        photos: string[];
        title: string;
        price: number;
        year: number;
    };
    motorcycles: {
        photos: string[];
        title: string;
        price: number;
        year: number;
    };
    trailers: {
        photos: string[];
        title: string;
        price: number;
        year: number;
    };
    trucks: {
        photos: string[];
        title: string;
        price: number;
        year: number;
    };
};

export default function AdminPage() {

    const [profiles, setProfiles] = useState<IProfile[]>([]);
    const [offers, setOffers] = useState<IOffer[]>([]);


    useEffect(() => {
        fetch("http://localhost:3000/profiles")
            .then((response) => response.json())
            .then((data) => setProfiles(data));
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/offers")
            .then((response) => response.json())
            .then((data) => setOffers(data));
    }, []);

    const banProfile = (profile: IProfile) => {
        fetch("http://localhost:3000/profiles", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
        })
            .then((response) => response.json())
            .then((data) => setProfiles(data));
    };

    const banOffer = (offer: IOffer) => {
        fetch("http://localhost:3000/offers", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(offer),
        })
            .then((response) => response.json())
            .then((data) => setOffers(data));
    }

    return (
        <div className="admin-page">
            <h1>Admin Page</h1>
            <div className="admin-page-profiles">
                {profiles.map((profile) => (
                    <div className="admin-page-profile">
                        <img src={profile.profilePicture} alt="profile picture" />
                        <p>{profile.name} {profile.surname}</p>
                        <p>{profile.email}</p>
                        <button onClick={() => banProfile(profile)}>Ban</button>
                    </div>
                ))}
            </div>
            <div className="admin-page-offers">
                {offers.map((offer) => (
                    <div className="admin-page-offer">
                        <img src={offer.agriculturalMachinery.photos[0]} alt="offer picture" />
                        <p>{offer.agriculturalMachinery.title}</p>
                        <p>{offer.agriculturalMachinery.price}</p>
                        <p>{offer.agriculturalMachinery.year}</p>
                        <button onClick={() => banOffer(offer)}>Ban</button>
                    </div>
                ))}
            </div>
        </div>
    );
}