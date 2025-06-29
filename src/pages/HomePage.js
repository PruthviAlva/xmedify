import React, { useState } from "react";
import StateCitySearch from "../component/StateCitySearch";

const HomePage = () => {
  const [medicalCenters, setMedicalCenters] = useState([]);

  return (
    <div>
      <StateCitySearch setMedicalCenters={setMedicalCenters} />
      {medicalCenters}
    </div>
  );
};

export default HomePage;
