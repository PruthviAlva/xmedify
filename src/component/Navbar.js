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
            <ul>
                <li><NavLink to="/" className="nav-link" activeclassname="active">Find Doctors</NavLink ></li>
                <li><NavLink to="/" className="nav-link" activeclassname="active">Hospitals</NavLink ></li>
                <li><NavLink to="/" className="nav-link" activeclassname="active">Medicines</NavLink ></li>
                <li><NavLink to="/" className="nav-link" activeclassname="active">Surgeries</NavLink ></li>
                <li><NavLink to="/" className="nav-link" activeclassname="active">Software for Provider</NavLink ></li>
                <li><NavLink to="/" className="nav-link" activeclassname="active">Facilities</NavLink ></li>
            </ul>
            <p className="my-bookings">
                <NavLink to="/my-bookings" className="nav-link">My Bookings</NavLink>
            </p>
        </nav>
    );
};

export default Navbar;
