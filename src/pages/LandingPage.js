// src/pages/LandingPage.js
import React from "react";

import SearchResults from "./SearchResults";
import Coupon1 from '../image/Coupon1.png';
import Coupon2 from '../image/Coupon2.png';
import specialisation from '../image/specialisation.png';
import Medical_Specialist from '../image/Medical_Specialist.png';
import Patient_Caring from '../image/Patient _Caring.png';
import latest_news from '../image/latest_news.png';
import our_families from '../image/our_families.png';
import View1Image1 from '../image/View1-image1.png';
import View1Image2 from '../image/View1-image2.png';
import footer from '../image/footer.png';
import "./LandingPage.css";

const LandingPage = ({ medicalCenters }) => {
    return (
        <div className="landing-page">
            {medicalCenters.length ? (
                <SearchResults medicalCenters={medicalCenters} />
            ) : (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <img src={Coupon1} alt="Coupon1" style={{ width: '20%', height: '10%' }} />
                        <img src={Coupon2} alt="Coupon2" style={{ width: '20%', height: '10%' }} />
                        <img src={Coupon1} alt="Coupon1" style={{ width: '20%', height: '10%' }} />
                    </div>
                    <img src={specialisation} alt="ViewImage1" style={{ width: '100%' }} />
                    <img src={Medical_Specialist} alt="ViewImage1" style={{ width: '100%' }} />
                    <img src={Patient_Caring} alt="ViewImage1" style={{ width: '100%' }} />
                    <img src={latest_news} alt="ViewImage1" style={{ width: '100%' }} />
                    <img src={our_families} alt="ViewImage1" style={{ width: '100%' }} />
                    <img src={View1Image1} alt="ViewImage1" style={{ width: '100%' }} />
                    <img src={View1Image2} alt="ViewImage2" style={{ width: '100%' }} />
                    <img src={footer} alt="footer" style={{ width: '100%' }} />
                </>
            )}
        </div >
    );
};

export default LandingPage;
