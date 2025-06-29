import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";
import MedicalCenterCard from "../component/MedicalCenterCard";

const ResultsPage = () => {
  const [centers, setCenters] = useState([]);
  const loc = useLocation();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("results") || "[]");
    setCenters(data);
  }, []);

  const city = new URLSearchParams(loc.search).get("city") || "";

  return (
    <div style={{alignItems: 'center'}}>
      <h1>
        {centers.length} medical centers available in {city.toLowerCase()}
      </h1>
      <p>
        <CiCircleCheck /> Book appointments with minimum wait-time &
        verified doctor details
      </p>
      {centers.map((c, i) => (
        <MedicalCenterCard key={i} center={c} />
      ))}
    </div>
  );
};

export default ResultsPage;