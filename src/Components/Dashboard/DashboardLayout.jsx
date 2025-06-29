import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { useState } from "react";
import "./Dashboard.css";
import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
  const [detailedDonations, setDetailedDonations] = useState([]);
  return (
    <div className="dashboard-container">
      <DashboardSidebar setDetailedDonations={setDetailedDonations} />
      <div className="dashboard-main">
        <DashboardHeader />
        <main className="dashboard-content">
          <Outlet context={{ detailedDonations, setDetailedDonations }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
