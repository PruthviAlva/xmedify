import React, { useState } from "react";
import "./BookingSection.css";

const BookingSection = ({ center }) => {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d.toISOString().split("T")[0];
  });
  const [date, setDate] = useState("", []);
  const [time, setTime] = useState("");

  const book = () => {
    const b = { ...center, bookingDate: date, bookingTime: time };
    const saved = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...saved, b]));
    alert("Appointment booked successfully!");
  };

  return (
    <div className="booking-section">
      <select value={date} onChange={(e) => setDate(e.target.value)}>
        <option value="">Select Date</option>
        {days.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>
      <select value={time} onChange={(e) => setTime(e.target.value)}>
        <option value="">Select Time Slot</option>
        <option>10:00 AM</option>
        <option>2:00 PM</option>
        <option>6:00 PM</option>
      </select>
      <button onClick={book}>Confirm Appointment</button>
    </div>
  );
};

export default BookingSection;