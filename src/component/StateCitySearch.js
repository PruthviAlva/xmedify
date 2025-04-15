import React, { useEffect, useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { CiCircleCheck } from "react-icons/ci";

import './StateCitySearch.css';

const StateCitySearch = ({ medicalCenters, setMedicalCenters }) => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    // Fetch states on mount
    useEffect(() => {
        fetch("https://meddata-backend.onrender.com/states")
            .then((res) => res.json())
            .then((data) => setStates(data))
            .catch((err) => console.error("Failed to fetch states:", err));
    }, []);

    // Fetch cities when state changes
    useEffect(() => {
        if (selectedState) {
            fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`)
                .then((res) => res.json())
                .then((data) => setCities(data))
                .catch((err) => console.error("Failed to fetch cities:", err));
        }
    }, [selectedState]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedState && selectedCity) {
            fetch(`https://meddata-backend.onrender.com/data?state=${selectedState}&city=${selectedCity}`)
                .then((res) => res.json())
                .then((data) => setMedicalCenters(data))
                .catch((err) => console.error("Failed to fetch cities:", err));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="search-container">
                <div id="state">
                    <label><MdOutlineLocationOn /> State:</label>
                    <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} required>
                        <option value="">Select State</option>
                        {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>

                <div id="city">
                    <label><MdOutlineLocationOn /> City:</label>
                    <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} required>
                        <option value="">Select City</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                <button type="submit"><IoSearchSharp /> Search</button>
            </form>
            {medicalCenters.length !== 0 ? (
                <div>
                    <h1>{medicalCenters.length} medical centers available in {selectedCity.toLowerCase()}</h1>
                    <p><CiCircleCheck /> Book appointments with minimum wait-time & verified doctor details</p>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default StateCitySearch;
