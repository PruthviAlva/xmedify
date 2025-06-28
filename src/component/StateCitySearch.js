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
        const getStates = async () => {
            await fetch("https://meddata-backend.onrender.com/states")
                .then((res) => res.json())
                .then((data) => setStates(data))
                .catch((err) => console.error("Failed to fetch states:", err));
        }
        getStates();
    }, []);

    // Fetch cities when state changes
    useEffect(() => {
        const getCities = async () => {
            if (selectedState) {
                fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`)
                    .then((res) => res.json())
                    .then((data) => setCities(data))
                    .catch((err) => console.error("Failed to fetch cities:", err));
            }
        }
        getCities();
    }, [selectedState]);

    const getMedicalCenters = async () => {
        if (selectedState && selectedCity) {
            await fetch(`https://meddata-backend.onrender.com/data?state=${selectedState}&city=${selectedCity}`)
                .then((res) => res.json())
                .then((data) => setMedicalCenters(data))
                .catch((err) => console.error("Failed to fetch cities:", err));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getMedicalCenters();
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="search-container">
                <div id="state">
                    <label><MdOutlineLocationOn /> State:</label>
                    <ol value={selectedState} onChange={(e) => setSelectedState(e.target.value)} required>
                        <li value="">Select State</li>
                        {states.map((state) => (
                            <li key={state} value={state}>{state}</li>
                        ))}
                    </ol>
                </div>

                <div id="city">
                    <label><MdOutlineLocationOn /> City:</label>
                    <ol value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} required>
                        <li value="">Select City</li>
                        {cities.map((city) => (
                            <li key={city} value={city}>{city}</li>
                        ))}
                    </ol>
                </div>

                <button type="submit"><IoSearchSharp />Search</button>
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
