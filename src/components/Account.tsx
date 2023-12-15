import React from "react";
import OfferElement from "./OfferElement";
import Chat from "./Chat";
import { useEffect, useState } from "react";

interface IOffer {
  id: string;
  image: string;
  title: string;
  price: number;
  year: number;
};


interface IProfile {
    email: string;
    name: string;
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
    const [offerData, setOfferData] = useState<IOffer []| null>(null);
    useEffect(() => {
      const fetchData = async () => {
        let data: any[] = [];
        data[1] = await import("../testJsons/testOffer.json");
        data[2] = await import("../testJsons/testOfferMotorcycles.json");
        data[3] = await import("../testJsons/testOfferDeliveryVans.json");
        data[4] = await import("../testJsons/testOfferTrucks.json");
        data[5] = await import("../testJsons/testOfferConstructionMachinery.json");
        data[6] = await import("../testJsons/testOfferTrailers.json");
        data[7] = await import("../testJsons/testOfferAgriculturalMachinery.json");
        let offerData: IOffer[] = [];
        for (let i = 1; i < 8; i++) {
          const { id, photos, title, price, year } = data[i].default;
          offerData.push({ id, image: photos.length > 0 ? photos[0] : "", title, price, year });
        }
        setOfferData(offerData);
      };
      fetchData();
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
                <h2>{profileData?.name}</h2>
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
            {offerData && offerData.map((offer) => {
                    return (
                        <OfferElement key={offer.id} image={offer.image} title={offer.title} price={offer.price} year={offer.year} />
                    )
                }
                )}
          </div>
        </div><div className="account-saved-offers">
          <h2>Saved offers</h2>
          <div className="account-saved-offers-elements">
            {offerData && offerData.map((offer) => {
                    return (
                        <OfferElement key={offer.id} image={offer.image} title={offer.title} price={offer.price} year={offer.year} />
                    )
                }
              )}
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