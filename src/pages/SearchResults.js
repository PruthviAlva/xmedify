// src/pages/SearchResults.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CiCircleCheck } from "react-icons/ci";

import MedicalCenterCard from "../component/MedicalCenterCard";
import View1Image1 from '../image/View1-image1.png';
import View1Image2 from '../image/View1-image2.png';
import footer from '../image/footer.png';
import "./SearchResults.css";

const SearchResults = () => {
    const [medicalCenters, setMedicalCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const state = queryParams.get("state");
    const city = queryParams.get("city");

    useEffect(() => {
        if (state && city) {
            setLoading(true);
            axios
                .get(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`)
                .then((response) => {
                    setMedicalCenters(response.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching medical centers:", err);
                    setLoading(false);
                });
        }
    }, [state, city]);

    return (
        <>
            <div className="search-results">
                <div style={{ padding: "1rem" }}>
                    {loading ? (
                        <p>Loading medical centers...</p>
                    ) : medicalCenters.length === 0 ? (
                        <p>No medical centers found.</p>
                    ) : (
                        <>
                            <div>
                                <h1>{medicalCenters.length} medical centers available in {city.toLowerCase()}</h1>
                                <p><CiCircleCheck /> Book appointments with minimum wait-time & verified doctor details</p>
                            </div>
                            {medicalCenters.map((center, idx) => (
                                <MedicalCenterCard
                                    key={idx}
                                    center={center}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
            <div>
                <img src={View1Image1} alt="ViewImage1" style={{ width: '100%' }} />
                <img src={View1Image2} alt="ViewImage2" style={{ width: '100%' }} />
                <img src={footer} alt="footer" style={{ width: '100%' }} />
            </div>
        </>
    );
};

export default SearchResults;
