import React, { useEffect, useState, useRef } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { CiCircleCheck } from "react-icons/ci";

import "./StateCitySearch.css";

const StateCitySearch = ({ medicalCenters, setMedicalCenters }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const stateRef = useRef();
  const cityRef = useRef();

  useEffect(() => {
    const getStates = async () => {
      try {
        const res = await fetch("https://meddata-backend.onrender.com/states");
        const data = await res.json();
        setStates(data);
      } catch (err) {
        console.error("Failed to fetch states:", err);
      }
    };
    getStates();
  }, []);

  useEffect(() => {
    const getCities = async () => {
      if (selectedState) {
        try {
          const res = await fetch(
            `https://meddata-backend.onrender.com/cities/${selectedState}`
          );
          const data = await res.json();
          setCities(data);
        } catch (err) {
          console.error("Failed to fetch cities:", err);
        }
      }
    };
    getCities();
  }, [selectedState]);

  const getMedicalCenters = async () => {
    if (selectedState && selectedCity) {
      try {
        const res = await fetch(
          `https://meddata-backend.onrender.com/data?state=${selectedState}&city=${selectedCity}`
        );
        const data = await res.json();
        setMedicalCenters(data);
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMedicalCenters();
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (stateRef.current && !stateRef.current.contains(e.target)) {
        setShowStateDropdown(false);
      }
      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setShowCityDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-container">
        <div id="state" ref={stateRef}>
          <label>
            <MdOutlineLocationOn /> State:
          </label>
          <div
            className="custom-select"
            onClick={() => setShowStateDropdown(!showStateDropdown)}
          >
            {selectedState || "Select State"}
          </div>
          {showStateDropdown && (
            <ol className="dropdown-list">
              {states.map((state) => (
                <li
                  key={state}
                  value={state}
                  onClick={() => {
                    setSelectedState(state);
                    setShowStateDropdown(false);
                    setSelectedCity(""); // Reset city
                  }}
                >
                  {state}
                </li>
              ))}
            </ol>
          )}
        </div>

        <div id="city" ref={cityRef}>
          <label>
            <MdOutlineLocationOn /> City:
          </label>
          <div
            className="custom-select"
            onClick={() => setShowCityDropdown(!showCityDropdown)}
          >
            {selectedCity || "Select City"}
          </div>
          {showCityDropdown && (
            <ol className="dropdown-list">
              {cities.map((city) => (
                <li
                  key={city}
                  value={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setShowCityDropdown(false);
                  }}
                >
                  {city}
                </li>
              ))}
            </ol>
          )}
        </div>

        <button type="submit">
          <IoSearchSharp />
          Search
        </button>
      </form>

      {medicalCenters.length !== 0 ? (
        <div>
          <h1>
            {medicalCenters.length} medical centers available in{" "}
            {selectedCity.toLowerCase()}
          </h1>
          <p>
            <CiCircleCheck /> Book appointments with minimum wait-time &
            verified doctor details
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default StateCitySearch;