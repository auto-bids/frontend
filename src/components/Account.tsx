import React from "react";
import OfferElement from "./OfferElement";
import Chat from "./Chat";
import { useEffect, useState } from "react";

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

interface IProfile {
    email: string;
    name: string;
    surname: string;
    profilePicture: string;
}

export default function Account() {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState<IProfile | null>(null);

    const handleEditProfile = () => {
      setIsEditing(true);
      setEditedProfile(profileData ? { ...profileData } : null);
    };

    const handleCancelEdit = () => {
      setIsEditing(false);
      setEditedProfile(null);
    };

    const handleSaveProfile = () => {
      setIsEditing(false);
      setProfileData(editedProfile ? { ...editedProfile } : null);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditedProfile(editedProfile ? { ...editedProfile, [name]: value } : null);
    };

    //just for testing
    const [offerData, setOfferData] = useState<IOffer | null>(null);
    useEffect(() => {
        Promise.all([
          import("../testJsons/testOfferAgriculturalMachinery.json"),
          import("../testJsons/testOffer.json"),
          import("../testJsons/testOfferConstructionMachinery.json"),
          import("../testJsons/testOfferDeliveryVans.json"),
          import("../testJsons/testOfferMotorcycles.json"),
          import("../testJsons/testOfferTrailers.json"),
          import("../testJsons/testOfferTrucks.json"),
        ])
          .then((data) => {
            const [
              agriculturalMachineryData,
              offerData,
              constructionMachineryData,
              deliveryVansData,
              motorcyclesData,
              trailersData,
              trucksData,
            ] = data;
      
            setOfferData({
              agriculturalMachinery: {
                photos: agriculturalMachineryData.default.photos,
                title: agriculturalMachineryData.default.title,
                price: agriculturalMachineryData.default.price,
                year: agriculturalMachineryData.default.year,
              },
              generalOffer: {
                photos: offerData.default.photos,
                title: offerData.default.title,
                price: offerData.default.price,
                year: offerData.default.year,
              },
              constructionMachinery: {
                photos: constructionMachineryData.default.photos,
                title: constructionMachineryData.default.title,
                price: constructionMachineryData.default.price,
                year: constructionMachineryData.default.year,
              },
              deliveryVans: {
                photos: deliveryVansData.default.photos,
                title: deliveryVansData.default.title,
                price: deliveryVansData.default.price,
                year: deliveryVansData.default.year,
              },
              motorcycles: {
                photos: motorcyclesData.default.photos,
                title: motorcyclesData.default.title,
                price: motorcyclesData.default.price,
                year: motorcyclesData.default.year,
              },
              trailers: {
                photos: trailersData.default.photos,
                title: trailersData.default.title,
                price: trailersData.default.price,
                year: trailersData.default.year,
              },
              trucks: {
                photos: trucksData.default.photos,
                title: trucksData.default.title,
                price: trucksData.default.price,
                year: trucksData.default.year,
              },
            });
          })
          .catch((error) => console.error("Error loading local data:", error));
      }, []);

      const [profileData, setProfileData] = useState<IProfile | null>(null);
      useEffect(() => {
        Promise.all([
          import("../testJsons/profile.json"),
        ])
          .then((data) => {
            const [
              profileData,
            ] = data;
      
            setProfileData({
              email: profileData.default.email,
              name: profileData.default.name,
              surname: profileData.default.surname,
              profilePicture: profileData.default.profilePicture,
            });
          })
          .catch((error) => console.error("Error loading local data:", error));
      }, []);

    return(
        <div className="account">
          <div className="account-header">
            <div className="account-header-profile">
              <img src={profileData?.profilePicture} alt="profile" />
              <div className="account-header-profile-info">
                <h2>{profileData?.name} {profileData?.surname}</h2>
                <p>{profileData?.email}</p>
              </div>
            </div>
            <div className="account-header-buttons">
              <button onClick={handleEditProfile}>Edit Profile</button>
            </div>
          </div>
          {isEditing && editedProfile && (
            <div className="account-edit-profile">
              <h2>Edit Profile</h2>
              <label>Name:
                <input type="text" name="name" value={editedProfile.name} onChange={handleInputChange} />
              </label>
              <label>Surname:
                <input type="text" name="surname" value={editedProfile.surname} onChange={handleInputChange} />
              </label>
              <label>Profile picture:
                <input type="text" name="profilePicture" value={editedProfile.profilePicture} onChange={handleInputChange} />
              </label>
              <div>
                <button onClick={handleCancelEdit}>Cancel</button>
                <button onClick={handleSaveProfile}>Save</button>
              </div>
            </div>
        )}
        <div className="account-offers">
          <h2>Your offers</h2>
          <div className="account-offers-elements">
            ?{offerData?.generalOffer.photos.map((photo) => (
              <OfferElement
                key={photo}
                image={photo}
                title={offerData?.generalOffer.title}
                price={offerData?.generalOffer.price}
                year={offerData?.generalOffer.year} />
            ))}
          </div>
        </div><div className="account-saved-offers">
          <h2>Saved offers</h2>
          <div className="account-saved-offers-elements">
            ?{offerData?.generalOffer.photos.map((photo) => (
              <OfferElement
                key={photo}
                image={photo}
                title={offerData?.generalOffer.title}
                price={offerData?.generalOffer.price}
                year={offerData?.generalOffer.year} />
            ))}
          </div>
        </div>
        <div className="account-chat">
          <h2>Chat</h2>
          <div className="account-chat-elements">
            <Chat />
          </div>
        </div>
      </div>
    );
}