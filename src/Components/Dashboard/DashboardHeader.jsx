import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ormanLogo from "/public/ormanlogo.png"; // Using a static logo for now

const DashboardHeader = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // 👈 استرجاع بيانات الجمعية
    }
  }, []);

  if (!user) {
    console.log("user is null");
    return <p>جاري التحميل...</p>;
  }
  console.log("user ID هو:");
  console.log(user.id);
  return (
    <header className="dashboard-header">
      <div className="org-info">
        <div className="org-title">
          <div className="org-img-container">
            <img
              src={user.image}
              alt="Organization Logo"
              className="org-logo"
            />
          </div>
          <h2 className="org-name">{user.charityName}</h2>
        </div>
        {/* The "Edit Profile" button has been moved to the sidebar */}
      </div>
    </header>
  );
};

export default DashboardHeader;
