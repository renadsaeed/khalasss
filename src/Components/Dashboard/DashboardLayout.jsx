import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { useState, useEffect } from "react";
import "./Dashboard.css";
import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
  const [detailedDonations, setDetailedDonations] = useState([]);
  const [organizationData, setOrganizationData] = useState({
    volData: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const user = JSON.parse(storedUser);
      const charityId = user.id;

      try {
        const response = await fetch(
          `/api/Opportunities?charityId=${charityId}`
        );
        if (response.ok) {
          const result = await response.json();
          setOrganizationData({ volData: result.result || [] });
        } else {
          console.error("فشل تحميل فرص التطوع");
        }
      } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <DashboardSidebar setDetailedDonations={setDetailedDonations} setOrganizationData={setOrganizationData}  />
      <div className="dashboard-main">
        <DashboardHeader />
        <main className="dashboard-content">
          <Outlet
            context={{
              detailedDonations,
              setDetailedDonations,
              organizationData,
              setOrganizationData,
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
