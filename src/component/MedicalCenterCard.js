import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { format, addDays } from "date-fns";

import hospital_image from '../image/hospital_image.png';
import './MedicalCenterCard.css';

const timeSlots = {
  Morning: ["09:00 AM", "09:30 AM", "10:00 AM"],
  Afternoon: ["12:00 PM", "12:30 PM", "01:00 PM"],
  Evening: ["04:00 PM", "04:30 PM", "05:00 PM"],
};

const MedicalCenterCard = ({ center, onBook }) => {

  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [selectedSlot, setSelectedSlot] = useState("");

  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  const handleBooking = () => {
    if (!selectedSlot) return alert("Please select a time slot");

    const booking = {
      hospitalName: center["Hospital Name"],
      address: center.Address,
      city: center.City,
      state: center.State,
      zip: center["ZIP Code"],
      date: selectedDate,
      time: selectedSlot,
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
    setShowBooking(false);
    onBook(); // Callback to refresh or close dropdown (if needed)
  };

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
          <p><strong>Rating:</strong> {center["Overall Rating"] || "N/A"}</p>
        </div>
        <div className="medical-button">
          <p style={{ color: "rgba(1, 164, 0, 1)" }}>Available Today</p>
          <button onClick={() => setShowBooking(!showBooking)}>
            {showBooking ? "Hide Booking Options" : "Book FREE Center Visit"}
          </button>
        </div>
      </div>
      <div>
        {showBooking && (
          <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #eee", borderRadius: "8px" }}>
            <label htmlFor="date">Select Date:</label>
            <select id="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
              {dates.map((d) => (
                <option key={d} value={format(d, "yyyy-MM-dd")}>
                  {format(d, "eeee, MMM d")}
                </option>
              ))}
            </select>

            <div style={{ marginTop: "1rem", display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <p>Morning</p>
                {timeSlots.Morning.map((slot) => (
                  <button key={slot} onClick={() => setSelectedSlot(slot)} className={slot === selectedSlot ? "selected" : ""}>
                    {slot}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <p>Afternoon</p>
                {timeSlots.Afternoon.map((slot) => (
                  <button key={slot} onClick={() => setSelectedSlot(slot)} className={slot === selectedSlot ? "selected" : ""}>
                    {slot}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <p>Evening</p>
                {timeSlots.Evening.map((slot) => (
                  <button key={slot} onClick={() => setSelectedSlot(slot)} className={slot === selectedSlot ? "selected" : ""}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <button onClick={handleBooking}>Confirm Booking</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MedicalCenterCard;
