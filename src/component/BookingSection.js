import React, { useState } from "react";
import "./BookingSection.css";

const BookingSection = ({ center }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

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

  const book = () => {
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
    alert("Appointment booked successfully!");
  };

  return (
    <div className="booking-section">
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

      <button data-testid="confirm-booking-button" onClick={book}>Confirm Booking</button>
    </div>
  );
};

export default BookingSection;