import React from "react";
import OfferElement from "./OfferElement";
import Chat from "./Chat";
import { useEffect, useState } from "react";
import * as Yup from "yup";

interface IOffer {
  id: string;
  image: string;
  title: string;
  price: number;
  year: number;
};


interface IProfile {
    email: string;
    user_name: string;
    profile_picture: string;
}

const AccountSchema = Yup.object().shape({
  user_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  profile_picture: Yup.string()
    .url("Invalid URL")
    .required("Required"),
});

export default function Account({ setIsLoggedIn }: {setIsLoggedIn: (value: boolean) => void;}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState<IProfile | null>(null);
    const [pageNumber, setPageNumber] = useState(1);

    const handleEditProfile = () => {
      setIsEditing(true);
      setEditedProfile(profileData ? { ...profileData } : null);
    };

    const handleCancelEdit = () => {
      setIsEditing(false);
      setEditedProfile(null);
    };

    const handleDeleteAllOffers = () => {
      const confirmed = window.confirm("Are you sure you want to delete all your offers?");
      if (confirmed) {
        try{
          fetch(`${process.env.REACT_APP_PROFILE_DELETE_ENDPOINT}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
            },
          });
        } catch (error) {
          console.error("Error deleting all offers:", error);
        }
      }
    };
    

    const handleSaveProfile = () => {
      AccountSchema.validate(editedProfile)
        .then(() => {
          setIsEditing(false);
          setProfileData(editedProfile ? { ...editedProfile } : null);
          const dataToSend = {
            profile_image: editedProfile?.profile_picture,
            user_name: editedProfile?.user_name,
          };
          fetch(`${process.env.REACT_APP_PROFILE_EDIT_ENDPOINT}`, {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
            },
            body: JSON.stringify(dataToSend),
          });
        })
        .catch((error) => {
          console.error("Error validating profile data:", error);
          if (error instanceof Yup.ValidationError) {
            if (error.path === "user_name") {
              alert("Name must be between 2 and 50 characters long");
            }
            if (error.path === "profile_picture") {
              alert("Profile picture must be a valid URL");
            }
          }
        });
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditedProfile(editedProfile ? { ...editedProfile, [name]: value } : null);
    };

    const [offerData, setOfferData] = useState<IOffer []| null>(null);
    const [profileData, setProfileData] = useState<IProfile | null>(null);

    const handleNextPage = () => {
      setPageNumber(pageNumber + 1);
    }
    const handlePreviousPage = () => {
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
      }
    }

      const fetchData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_PROFILE_LOGIN_ENDPOINT}`, {
            method: "GET",
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
          });
          if (response.status === 201) {
            document.cookie = "isLoggedIn=true";
            window.location.reload();
          }
          if(response.status === 200){
            setIsLoggedIn(true);
            document.cookie = "isLoggedIn=true";
            const profileData = await response.json();
            setProfileData({
              email: profileData.data.data.email,
              user_name: profileData.data.data.user_name,
              profile_picture: profileData.data.data.profile_image,
            });
          }
        } catch (error) {
          console.error("Error loading profile data:", error);
        }
      };

      const fetchUsersOffers = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_PROFILE_CARS_ENDPOINT}${pageNumber}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
            },
          });
          if (response.ok) {
            const offers = await response.json();
            const offerData: IOffer[] = [];
            offers.data.data.forEach((offer: any) => {
              offerData.push({
                id: offer.id,
                image: offer.car.photos.length > 0 ? offer.car.photos[0] : "",
                title: offer.car.title,
                price: offer.car.price,
                year: offer.car.year,
              });
            });
            setOfferData(offerData);
          } else {
            console.log("Error fetching offers");
          }
        } catch (error) {
          console.error("Error fetching offers:", error);
        }
      }

      useEffect(() => {
        fetchData();
        // fetchUsersOffers();
      }, []);

      useEffect(() => {
        fetchUsersOffers();
      }, [pageNumber]);

      const handleDeleteProfile = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account?");

        if (confirmed) {
          try {
            const response = await fetch(`${process.env.REACT_APP_CARS_DELETE_ALL_USER_CARS_ENDPOINT}`, {
              method: "DELETE",
              credentials: "include",
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
              },
            });
      
            if (response.ok) {
              console.log("All offers deleted");
            } else {
              console.log("Error deleting all offers");
            }
          } catch (error) {
            console.error("Error deleting all offers:", error);
          }
          try {
            const response = await fetch(`${process.env.REACT_APP_PROFILE_DELETE_ENDPOINT}`, {
              method: "DELETE",
              credentials: "include",
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
              },
            });
      
            const response2 = await fetch(`${process.env.REACT_APP_LOGOUT_ENDPOINT}`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
              },
            });
      
            if (response.ok && response2.ok) {
              setIsLoggedIn(false);
              document.cookie = "isLoggedIn=false";
              window.location.href = "/";
            } else {
              console.log("Error deleting profile");
            }
          } catch (error) {
            console.error("Error deleting profile:", error);
          }
        }
      };

      const handleLogout = async () => {
        try{
          const response = await fetch(`${process.env.REACT_APP_LOGOUT_ENDPOINT}`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
            },
          });
          if (response.ok){
            setIsLoggedIn(false);
            document.cookie = "isLoggedIn=false";
            window.location.href = "/";
          }
          else{
            console.log("Error logging out");
          }
        } catch (error) {
          console.error("Error logging out:", error);
        }
      };

      const handleDeleteOffer = async (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this offer?");
        if (confirmed) {
          try {
            const response = await fetch(`${process.env.REACT_APP_CARS_DELETE_ENDPOINT}`, {
              method: "DELETE",
              credentials: "include",
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
              },
              body: JSON.stringify({ id }),
            });
            if (response.ok) {
              fetchUsersOffers();
            } else {
              console.log("Error deleting offer");
            }
          } catch (error) {
            console.error("Error deleting offer:", error);
          }
        }
      }

    return(
        <div className="account">
          <div className="account-header">
            <div className="account-header-profile">
              <img src={profileData?.profile_picture} alt="profile" />
              <div className="account-header-profile-info">
                <h2>{profileData?.user_name}</h2>
                <p>{profileData?.email}</p>
              </div>
            </div>
            <div className="account-header-buttons">
              <div className="account-header-buttons-element">
                <button onClick={handleEditProfile}>Edit Profile</button>
              <div className="account-header-buttons-element">
                <button onClick={handleDeleteProfile}>Delete</button>
              </div>
              <div className="account-header-buttons-element">
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
          {isEditing && editedProfile && (
              <div className="account-edit-profile">
                <h2>Edit Profile</h2>
                <label>Name:
                  <input type="text" name="user_name" value={editedProfile.user_name} onChange={handleInputChange} />
                </label>
                <label>Profile picture:
                  <input type="text" name="profile_picture" value={editedProfile.profile_picture} onChange={handleInputChange} />
                </label>
                <div>
                  <button onClick={handleCancelEdit}>Cancel</button>
                  <button onClick={handleSaveProfile}>Save</button>
                </div>
              </div>
          )}
          <div className="account-offers">
            <h2>Your offers</h2>
            <button onClick={handleDeleteAllOffers}>Delete all offers</button>
            <div className="account-offers-elements">
              {offerData && offerData.map((offer) => {
                      return (
                        <React.Fragment key={offer.id}>
                          <OfferElement image={offer.image} title={offer.title} price={offer.price} year={offer.year} />
                          <button onClick={() => handleDeleteOffer(offer.id)}>Delete</button>
                        </React.Fragment>
                      )
                  }
                  )}
              <br />
              <button onClick={handlePreviousPage}>Previous</button>
              <button onClick={handleNextPage}>Next</button>
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
      </div>
    );
}