import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from './component/Navbar';
import StateCitySearch from "./component/StateCitySearch";
import LandingPage from "./pages/LandingPage";
import MyBookingsPage from "./pages/MyBookingsPage";

import './App.css';

function App() {
  const [medicalCenters, setMedicalCenters] = useState([]);

  return (
    <BrowserRouter>
      <div className="app-container">
        <p className="detail">The health and well-being of our patients and their health care team will always be our priority, so we follow the best practices for cleanliness.</p>
        <Navbar />
        <div className="searchbar">
          <StateCitySearch medicalCenters={medicalCenters} setMedicalCenters={setMedicalCenters} />
        </div>
        <Routes>
          <Route path="/" element={<LandingPage medicalCenters={medicalCenters} />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
