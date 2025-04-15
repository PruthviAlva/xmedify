import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";

import hospital_image from '../image/hospital_image.png';
import './MedicalCenterCard.css';

const MedicalCenterCard = ({ center }) => {

  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleBooking = () => {
    const booking = {
      "Hospital Name": center["Hospital Name"],
      City: center.City,
      State: center.State,
      Address: center.Address,
      "ZIP Code": center["ZIP Code"],
      "Hospital overall rating": center["Hospital overall rating"],
      bookingDate: selectedDate,
      bookingTime: selectedTime,
    };

    const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...existing, booking]));
    setShowBooking(false);
    alert("Appointment booked successfully!");
  };

  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date.toDateString()); // e.g., "Mon Apr 14 2025"
    }
    return days;
  };

  const timeSlots = {
    Morning: ['9:00 AM', '10:00 AM'],
    Afternoon: ['12:00 PM', '1:00 PM'],
    Evening: ['5:00 PM', '6:00 PM'],
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
      {showBooking && (
        <div className="booking-dropdown" data-testid="booking-section">
          <p>Today</p>

          <label>Select Date:</label>
          <select
            id="date-select"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="">-- Choose a Date --</option>
            {getNext7Days().map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>

          {Object.entries(timeSlots).map(([period, times]) => (
            <div key={period} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p>{period}</p>
              {times.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  style={{
                    color: 'black',
                    backgroundColor: selectedTime === time ? 'lightblue' : 'white',
                    margin: '4px'
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          ))}

          <button data-testid="confirm-booking-button" onClick={handleBooking}>Confirm Booking</button>
        </div>
      )}
    </>
  );
};

export default MedicalCenterCard;
