import './App.css';
import React from 'react';
import {useState} from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './components/SearchAndMain/MainPage';
import {HashRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import SearchPage from './components/SearchAndMain/SearchPage';
import Account from './components/Profile/Account';
import NewListingGeneral from './components/NewListing/NewListingGeneral';
import RegisterPage from './components/Profile/RegisterPage';
import OfferPage from './components/OfferPage/OfferPage';
import PrivacyPolicy from './components/Footer/PrivacyPolicy';
import AboutUs from './components/Footer/AboutUs';
import ContactUs from './components/Footer/ContactUs';
import TermsOfService from './components/Footer/TermsOfService';
import Help from './components/Footer/Help';
import SellerPage from './components/Profile/SellerPage';
import AdminPage from './components/Admin/AdminPage';
import OfferPageMotorcycles from './components/OfferPage/OfferPageMotorcycles';
import OfferPageDeliveryVans from './components/OfferPage/OfferPageDeliveryVans';
import OfferPageTrucks from './components/OfferPage/OfferPageTrucks';
import OfferPageConstructionMachinery from './components/OfferPage/OfferPageConstructionMachinery';
import OfferPageTrailers from './components/OfferPage/OfferPageTrailers';
import OfferPageAgriculturalMachinery from './components/OfferPage/OfferPageAgriculturalMachinery';
import NotFound from './components/Other/NotFound';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(document.cookie === "isLoggedIn=true");
    // const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <div className="App">
            <Router>
                <Header props={isLoggedIn}/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/search/:category" element={<SearchPage/>}/>
                    <Route path="/account" element={<Account setIsLoggedIn={setIsLoggedIn}/>}/>
                    <Route path="/new-listing" element={<NewListingGeneral isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    {/* <Route path="/offer-cars/:offerType/:id" element={<OfferPage />} /> */}
                    <Route path="/auction/offer/:id" element={<OfferPage/>}/>
                    <Route path="/cars/offer/:id" element={<OfferPage/>}/>
                    <Route path="/motorcycles/offer/:id" element={<OfferPageMotorcycles/>}/>
                    <Route path="/offer-motorcycles/:id" element={<OfferPageMotorcycles/>}/>
                    <Route path="/offer-delivery-vans/:id" element={<OfferPageDeliveryVans/>}/>
                    <Route path="/offer-trucks/:id" element={<OfferPageTrucks/>}/>
                    <Route path="/offer-construction-machinery/:id" element={<OfferPageConstructionMachinery/>}/>
                    <Route path="/offer-trailers/:id" element={<OfferPageTrailers/>}/>
                    <Route path="/offer-agricultural-machinery/:id" element={<OfferPageAgriculturalMachinery/>}/>
                    <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                    <Route path="/about-us" element={<AboutUs/>}/>
                    <Route path="/contact-us" element={<ContactUs/>}/>
                    <Route path="/terms-of-service" element={<TermsOfService/>}/>
                    <Route path="/help" element={<Help/>}/>
                    <Route path="/seller/:email" element={<SellerPage/>}/>
                    <Route path="/admin" element={<AdminPage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
