import { useState } from "react";
import "./FloatingDonateButton.css";
import DonationModal from "./DonationModal";

const FloatingDonateButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleDonateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleCollapse = (e) => {
    e.stopPropagation(); // يمنع فتح المودال عند الضغط على السهم
    setIsCollapsed(!isCollapsed);
  };

  const buttonClasses = ` floating-donate-button ${
    isCollapsed ? "collapsed" : ""
  }`;

  return (
    <>
      <div className={buttonClasses}>
        <div className="donate-text" onClick={handleDonateClick}>
          <span className="main-text">تبرع سريع</span>
          <span className="sub-text">فرصة للخير بين يديك</span>
        </div>
        <div className="donate-arrow" onClick={toggleCollapse}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 6L9 12L15 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <DonationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default FloatingDonateButton;
