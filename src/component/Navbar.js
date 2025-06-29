import React from "react";
import { NavLink } from "react-router-dom";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logoComponent">
                <div className="logo">
                    <IoShieldCheckmarkOutline />
                </div>
                <p>Medify</p>
            </div>
            <ul className="nav-list">
                {["Find Doctors", "Hospitals", "Medicines", "Surgeries", "Software for Provider", "Facilities"].map((text) => (
                    <li key={text}>
                        <NavLink to={text === "Hospitals" ? "/" : "#"} className="nav-link" activeclassname={text === "Hospitals" ? "active" : ""}>{text}</NavLink>
                    </li>
                ))}
                <li><NavLink to="/my-bookings" className="nav-link">My Bookings</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;
