import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";

import "./StateCitySearch.css";

const StateCitySearch = () => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [showState, toggleShowState] = useState(false);
    const [showCity, toggleShowCity] = useState(false);
    const stateRef = useRef();
    const cityRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://meddata-backend.onrender.com/states")
            .then((r) => r.json())
            .then(setStates);
    }, []);

    useEffect(() => {
        if (selectedState) {
            fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`)
                .then((r) => r.json())
                .then(setCities);
        }
    }, [selectedState]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(
            `https://meddata-backend.onrender.com/data?state=${selectedState}&city=${selectedCity}`
        );
        const data = await res.json();
        localStorage.setItem("results", JSON.stringify(data));
        navigate(`/results?state=${selectedState}&city=${selectedCity}`);
    };

    useEffect(() => {
        const listener = (e) => {
            if (stateRef.current && !stateRef.current.contains(e.target))
                toggleShowState(false);
            if (cityRef.current && !cityRef.current.contains(e.target))
                toggleShowCity(false);
        };
        document.addEventListener("mousedown", listener);
        return () => document.removeEventListener("mousedown", listener);
    }, []);

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <div id="state" ref={stateRef} className="dropdown-wrapper">
                <label><MdOutlineLocationOn />State</label>
                <div
                    className="dropdown-control"
                    onClick={() => toggleShowState(!showState)}
                >
                    {selectedState || "Select State"}
                </div>
                {showState && (
                    <ul className="dropdown-list">
                        {states.map((s) => (
                            <li key={s} onClick={() => { setSelectedState(s); toggleShowState(false); }}>
                                {s}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div id="city" ref={cityRef} className="dropdown-wrapper">
                <label><MdOutlineLocationOn />City</label>
                <div
                    className="dropdown-control"
                    onClick={() => toggleShowCity(!showCity)}
                >
                    {selectedCity || "Select City"}
                </div>
                {showCity && (
                    <ul className="dropdown-list">
                        {cities.map((c) => (
                            <li key={c} onClick={() => {setSelectedCity(c); toggleShowCity(false);}}>
                                {c}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button type="submit" id="searchBtn">
                <IoSearchSharp />Search
            </button>
        </form>
    );
};

export default StateCitySearch;