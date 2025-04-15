import React, { useEffect, useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";

import './StateCitySearch.css';

const StateCitySearch = ({ setMedicalCenters }) => {
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
        </div>
    );
};

export default StateCitySearch;
