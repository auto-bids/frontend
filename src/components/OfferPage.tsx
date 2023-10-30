import React from "react";
import BidElement from "./BidElement";

export default function OfferPage(){
    return(
        <div className="offer-page">
            <div className="offer-page-top-bar">
                <h1>Offer title</h1>
                <h1>Price</h1>
                <button className="offer-page-top-bar-button">Add to favourites</button>
            </div>
            <div className="offer-page-main">
                <div className="offer-page-main-images">
                    <div className="offer-images-current-image">
                        <img src="/test.jpeg" alt="offer" />
                    </div>
                    <div className="offer-images-other-images">
                        <img src="/test.jpeg" alt="offer" />
                        <img src="/test.jpeg" alt="offer" />
                        <img src="/test.jpeg" alt="offer" />
                        <img src="/test.jpeg" alt="offer" />
                        <img src="/test.jpeg" alt="offer" />
                    </div>
                </div>
                <div className="offer-page-main-details">
                    <p>Make:</p>
                    <p>Model:</p>
                    <p>Type:</p>
                    <p>Year:</p>
                    <p>Mileage:</p>
                    <p>Engine capacity:</p>
                    <p>Fuel:</p>
                    <p>Power:</p>
                    <p>Transmission:</p>
                    <p>Drive:</p>
                    <p>Steering:</p>
                    <p>Color:</p>
                    <p>Doors:</p>
                    <p>Seats:</p>
                    <p>Registration number:</p>
                    <p>First registration:</p>
                    <p>Condition:</p>
                    <p>Vin number:</p>
                </div>
                <div className="offer-page-main-bid">
                    <BidElement/>
                </div>
                <div className="offer-page-main-description">
                    <h2>Description</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis nisl euismod, aliquet magna sed, ultrices urna. Sed sit amet mauris ut nulla bibendum rutrum. Sed euismod, dui eget aliquam aliquet, tellus elit suscipit risus, a lacinia nunc nibh vitae diam. Donec vel quam vel nunc aliquet tempor. Donec non semper elit. Duis et nunc ut leo ultrices pellentesque. Nulla facilisi. Nulla facilisi. Donec ut erat in nisl aliquam ultricies. Etiam ultricies, elit quis gravida ultricies, nunc leo eleifend libero, ut laoreet eros nunc a nunc. Nulla facilisi. Sed eget nisl nec nisi aliquam aliquet. Nullam euismod, felis nec consectetur gravida, nisl nibh varius felis, in pellentesque ex ipsum non mi. Donec euismod, ligula at luctus tristique, nunc diam aliquam magna, vel pulvinar libero leo in ante. Cras at semper nunc.</p>
                </div>
                <div className="offer-page-main-features">
                    <h2>Features</h2>
                    <p>Heated Seats</p>
                    <p>Heated Mirrors</p>
                    <p>Power Steering</p>
                    <p>Power Windows</p>
                    <p>AC</p>
                    <p>Central Locking</p>
                </div>
                <div className="offer-page-main-seller">
                
                </div>
            </div>
        </div>
    );
}