import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../admin/AdminDashboard";
import UserManagement from "../admin/UserManagement";
import TripManagement from "../admin/TripManagement";
import PickupPointsManagement from "../admin/PickupPointManagement";
import DropOffPointsManagement from "../admin/DropOffPointsManagement";
import InvoiceManagement from "../admin/InvoiceManagement";
import PriceManagement from "../admin/PriceManagement";
import ReportManagement from "../admin/ReportManagement";
import PaymentManagement from "../admin/PaymentManagement";
import PromotionManagement from "../admin/PromotionManagement";
import TicketsManagement from "../admin/TicketsManagement";
import LocationManagement from "../admin/LocationManagement";
import ScheduleManagement from "../admin/ScheduleManagement";
import BusManagement from "../admin/BusManagement";
import CustomerManagement from "../admin/CustomerManagement";
import AdminLoginPage from "../admin/AdminLoginPage";
import CustomerReports from "../admin/Reports/CustomerReports";
import EmployeeReports from "../admin/Reports/EmployeeReports";
import PromotionReports from "../admin/Reports/PromotionReports";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/trips" element={<TripManagement />} />
      <Route path="/admin/pickup-points" element={<PickupPointsManagement />} />
      <Route path="/admin/drop-off-points" element={<DropOffPointsManagement />} />
      <Route path="/admin/invoices" element={<InvoiceManagement />} />
      <Route path="/admin/prices" element={<PriceManagement />} />
      <Route path="/admin/reports" element={<ReportManagement />} />
      <Route path="/admin/payments" element={<PaymentManagement />} />
      <Route path="/admin/promotions" element={<PromotionManagement />} />
      <Route path="/admin/tickets" element={<TicketsManagement />} />
      <Route path="/admin/locations" element={<LocationManagement />} />
      <Route path="/admin/schedules" element={<ScheduleManagement />} />
      <Route path="/admin/buses" element={<BusManagement />} />
      <Route path="/admin/customers" element={<CustomerManagement />} />
      <Route path="/admin/reports/CustomerReports" element={<CustomerReports />} />
      <Route path="/admin/reports/EmployeeReports" element={<EmployeeReports />} />
      <Route path="/admin/reports/PromotionReports" element={<PromotionReports />} />
    </Routes>
  );
};

export default AdminRoutes;
