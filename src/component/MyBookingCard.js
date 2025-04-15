import React from "react";
import { FaCheck } from "react-icons/fa6";

import hospital_image from '../image/hospital_image.png';
import './MedicalCenterCard.css';

const MyBookingCard = ({ center }) => {
    return (
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
                <p><strong>Rating:</strong> {center["Hospital overall rating"]}</p>
                <p><strong>Date:</strong> {center.bookingDate}</p>
                <p><strong>Time:</strong> {center.bookingTime}</p>
            </div>
        </div>
    );
};

export default MyBookingCard;
