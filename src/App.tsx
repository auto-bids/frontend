import './App.css';
import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import {BrowserRouter as Router} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import Account from './components/Account';
import NewListing from './components/NewListing';
import RegisterPage from './components/RegisterPage';
import OfferPage from './components/OfferPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import TermsOfService from './components/TermsOfService';
import Help from './components/Help';
import SellerPage from './components/SellerPage';
import AdminPage from './components/AdminPage';
import OfferPageMotorcycles from './components/OfferPageMotorcycles';
import OfferPageDeliveryVans from './components/OfferPageDeliveryVans';
import OfferPageTrucks from './components/OfferPageTrucks';
import OfferPageConstructionMachinery from './components/OfferPageConstructionMachinery';
import OfferPageTrailers from './components/OfferPageTrailers';
import OfferPageAgriculturalMachinery from './components/OfferPageAgriculturalMachinery';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(document.cookie==="isLoggedIn=true" ? true : false);

  return (
    <div className="App">
      <Router>
        <Header props={isLoggedIn} />
           <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/search/:category" element={<SearchPage />} />
              <Route path="/account" element={<Account setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/new-listing" element={<NewListing />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/offer-cars/:offerType/:id" element={<OfferPage />} />
              <Route path="/offer-motorcycles/:id" element={<OfferPageMotorcycles />} />
              <Route path="/offer-delivery-vans/:id" element={<OfferPageDeliveryVans />} />
              <Route path="/offer-trucks/:id" element={<OfferPageTrucks />} />
              <Route path="/offer-construction-machinery/:id" element={<OfferPageConstructionMachinery />} />
              <Route path="/offer-trailers/:id" element={<OfferPageTrailers />} />
              <Route path="/offer-agricultural-machinery/:id" element={<OfferPageAgriculturalMachinery />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/help" element={<Help />} />
              <Route path="/seller/:email" element={<SellerPage />} />
              <Route path="/admin" element={<AdminPage />} />
           </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
