import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import {BrowserRouter as Router} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import Account from './components/Account';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
           <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/account" element={<Account />} />
           </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
