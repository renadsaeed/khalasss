import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ormanLogo from '/public/ormanlogo.png'; // Using a static logo for now

const DashboardHeader = () => {
    const [orgInfo] = useState({
        name: 'جمعية الأورمان',
        logo: ormanLogo
    });

    return (
        <header className="dashboard-header">
            <div className="org-info">
                <div className="org-title">
                    <div className="org-img-container">
                        <img
                            src={orgInfo.logo}
                            alt="Organization Logo"
                            className="org-logo"
                        />
                    </div>
                    <h2 className="org-name">
                        {orgInfo.name}
                    </h2>
                </div>
                {/* The "Edit Profile" button has been moved to the sidebar */}
            </div>
        </header>
    );
};

export default DashboardHeader; 