// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.scrollTop = sidebar.scrollTop;
    }
  }, [location]);

  return (
    <div className="App">
      <AdminRoutes />
      <UserRoutes />
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default AppWrapper;
