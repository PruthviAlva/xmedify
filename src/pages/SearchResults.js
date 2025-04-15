// src/pages/SearchResults.js
import React, { useEffect, useRef, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";

import MedicalCenterCard from "../component/MedicalCenterCard";
import View1Image1 from '../image/View1-image1.png';
import View1Image2 from '../image/View1-image2.png';
import footer from '../image/footer.png';
import "./SearchResults.css";

const SearchResults = ({ medicalCenters }) => {
    const city = useRef("");
    const [visibleCity, setVisibleCity] = useState("");

    useEffect(() => {
        let val = medicalCenters[0].City.toLowerCase();
        city.current = val;
        setVisibleCity(city.current);
    }, [medicalCenters]);

    return (
        <>
            <div className="search-results">
                <div style={{ padding: "1rem" }}>
                    {!medicalCenters ? (
                        <p>Loading medical centers...</p>
                    ) : medicalCenters.length === 0 ? (
                        <p>No medical centers found.</p>
                    ) : (
                        <>
                            <div>
                                <h1>{medicalCenters.length} medical centers available in {visibleCity}</h1>
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
