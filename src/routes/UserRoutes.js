import React from "react";
import { Routes, Route } from "react-router-dom";
import GuestHomePage from "../pages/GuestHomePage";
import LoginPage from "../pages/LoginPage";
import OTPPage from "../pages/OTPPage";
import SearchResults from "../pages/SearchResults";
import SeatSelectionPage from "../pages/SeatSelectionPage";
import BookingSuccessPage from "../pages/BookingSuccessPage";
import SchedulePage from "../pages/SchedulePage";
import MyTicketsPage from "../pages/MyTicketsPage";
import PaymentPage from "../pages/PaymentPage";
import InvoicePage from "../pages/InvoicePage";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestHomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/otp" element={<OTPPage />} />
      <Route
        path="/search-results/:departureLocation/:arrivalLocation"
        element={<SearchResults />}
      />

      <Route path="/seat-selection" element={<SeatSelectionPage />} />
      <Route path="/booking-success" element={<BookingSuccessPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/my-tickets" element={<MyTicketsPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/invoices" element={<InvoicePage />} />
    </Routes>
  );
};

export default UserRoutes;
