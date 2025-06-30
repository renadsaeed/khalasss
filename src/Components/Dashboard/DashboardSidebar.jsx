import React, { useState, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "./Dashboard.css";
import AddDonationForm from "./AddDonationForm";
import AddVolunteeringForm from "./AddVolunteeringForm";
import DashboardLayout from "./DashboardLayout";

const DashboardSidebar = ({ setDetailedDonations , setOrganizationData }) => {
  const location = useLocation();

  const isDonationsActive = location.pathname.includes(
    "/DashboardLayout/Donationbranch"
  );
  const isVolunteeringActive = location.pathname.includes(
    "/DashboardLayout/Volunteering"
  );
  const [showAddDonation, setShowAddDonation] = useState(false);
  const [showAddVolunteering, setShowAddVolunteering] = useState(false);

  return (
    <>
      <aside className="dashboard-sidebar">
        <nav className="dashboard-nav">
          <NavLink
            to="/DashboardLayout"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active" : "")
            }
          >
            الإحصائيات
          </NavLink>
          <div className="sidebar-link-group">
            <NavLink
              to="/DashboardLayout/Donationbranch"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              التبرعات
            </NavLink>
            {isDonationsActive && (
              <button
                className="add-opportunity-btn"
                onClick={() => setShowAddDonation(true)}
              >
                <span className="plus-icon">+</span> إضافة فرصة تبرع
              </button>
            )}
          </div>
          <div className="sidebar-link-group">
            <NavLink
              to="/DashboardLayout/Volunteering"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              التطوع
            </NavLink>
            {isVolunteeringActive && (
              <button
                className="add-opportunity-btn"
                onClick={() => setShowAddVolunteering(true)}
              >
                <span className="plus-icon">+</span> إضافة فرصة تطوع
              </button>
            )}
          </div>
          <NavLink
            to="/DashboardLayout/editprofile"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active" : "")
            }
          >
            تعديل الملف الشخصي
          </NavLink>
          <NavLink
            to="/DashboardLayout/ChangePassword"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active" : "")
            }
          >
            تغيير كلمة المرور
          </NavLink>
        </nav>
      </aside>
      {showAddDonation && (
        <AddDonationForm
          onClose={() => setShowAddDonation(false)}
          setDetailedDonations={setDetailedDonations}
        />
      )}

      {showAddVolunteering && (
        <AddVolunteeringForm onClose={() => setShowAddVolunteering(false)} setOrganizationData={setOrganizationData} />
      )}
    </>
  );
};

export default DashboardSidebar;
