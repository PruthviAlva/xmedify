// src/pages/MyBookingsPage.js
import React, { useState, useEffect } from "react";

import MyBookingCard from '../component/MyBookingCard';
import View1Image1 from '../image/View1-image1.png';
import View1Image2 from '../image/View1-image2.png';
import footer from '../image/footer.png';

const MyBookingsPage = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
        setBookings(storedBookings);
    }, []);

    return (
        <div className="mybookingPage">
            <div>
                <h1>My Bookings</h1>
            </div>
            <div tyle={{ padding: "1rem" }}>
                {bookings.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    bookings.map((booking, index) => (
                        <MyBookingCard
                            key={index}
                            center={booking}
                        />
                    ))
                )}
            </div>
            <div>
                <img src={View1Image1} alt="ViewImage1" style={{width: '100%'}} />
                <img src={View1Image2} alt="ViewImage2" style={{width: '100%'}} />
                <img src={footer} alt="footer" style={{width: '100%'}} />
            </div>
        </div>
    );
};

export default MyBookingsPage;