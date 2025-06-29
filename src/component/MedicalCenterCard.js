import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";

import hospital_image from '../image/hospital_image.png';
import BookingSection from "./BookingSection";
import './MedicalCenterCard.css';

const MedicalCenterCard = ({ center }) => {

  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      <div className="medical-center-card">
        <div className="parent_div">
          <img src={hospital_image} alt="hospital_image" className="hospital_image" />
          <div className="child_div">
            <FaCheck />
          </div>
        </div>
        <div className="medical-details">
          <h3 style={{ color: "rgba(20, 190, 240, 1)" }}>{center["Hospital Name"]}</h3>
          <p>{center.Address}, {center.City}, {center.State} {center["ZIP Code"]}</p>
          <p><strong>Rating:</strong> {center["Hospital overall rating"] || "N/A"}</p>
        </div>
        <div className="medical-button">
          <p style={{ color: "rgba(1, 164, 0, 1)" }}>Available Today</p>
          <button
            data-testid="book-visit-button"
            onClick={() => setShowBooking(!showBooking)}
          >
            Book FREE Center Visit
          </button>
        </div>
      </div>
      {showBooking && <BookingSection center={center} />}
    </>
  );
};

export default MedicalCenterCard;
