// src/pages/SearchResults.js
import React from "react";

import MedicalCenterCard from "../component/MedicalCenterCard";
import View1Image1 from '../image/View1-image1.png';
import View1Image2 from '../image/View1-image2.png';
import footer from '../image/footer.png';
import "./SearchResults.css";

const SearchResults = ({ medicalCenters }) => {

    return (
        <>
            <div className="search-results">
                <div style={{ padding: "1rem" }}>
                    {!medicalCenters ? (
                        <p>Loading medical centers...</p>
                    ) : medicalCenters.length === 0 ? (
                        <p>No medical centers found.</p>
                    ) : (
                        medicalCenters.map((center, idx) => (
                            <MedicalCenterCard
                                key={idx}
                                center={center}
                            />
                        ))
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
