// src/pages/GuestHomePage.js
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import FeaturedPromotions from "../components/FeaturedPromotions";
const GuestHomePage = () => {
  return (
    <div className="GuestHomePage">
      <Navbar />
      <Banner />
      <div className="content">
        <FeaturedPromotions />
      </div>
      <Footer />
    </div>
  );
};

export default GuestHomePage;
