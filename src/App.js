import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import Navbar from "./component/Navbar";

// import Navbar from './component/Navbar';
// import StateCitySearch from "./component/StateCitySearch";
// import LandingPage from "./pages/LandingPage";
// import MyBookingsPage from "./pages/MyBookingsPage";

import './App.css';

function App() {
  // const [medicalCenters, setMedicalCenters] = useState([]);

  return (
    <div className="app-container">
      <Router>
        <p className="detail">The health and well-being of our patients and their health care team will always be our priority, so we follow the best practices for cleanliness.</p>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
        </Routes>
      </Router>
      {/* <Router>
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
      </Router> */}
    </div>
  );
}

export default App;
