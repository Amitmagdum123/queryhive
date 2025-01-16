import React from "react";
import { CiHome, CiSettings, CiExport, CiLight, CiCloudMoon } from "react-icons/ci";

const Navbar = ({ isDarkMode, toggleTheme, handleLogout }) => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: isDarkMode ? "#333" : "#f8f9fa",
        color: isDarkMode ? "#fff" : "#000",
        borderBottom: "1px solid #ddd",
        marginBottom: "1rem",
      }}
    >
      <div className="container-fluid">
       
        <div className="d-flex align-items-center"></div>

        
        <div className="d-flex align-items-center ms-auto">
          
          <a
            href="#"
            style={{
              color: isDarkMode ? "#FFD700" : "#333",
              fontSize: "18px",
              marginRight: "20px",
              textDecoration: "none",
            }}
          >
            <CiHome /> {/* Home Icon */}
          </a>
          <a
            href="#"
            style={{
              color: isDarkMode ? "#FFD700" : "#333",
              fontSize: "18px",
              marginRight: "20px",
              textDecoration: "none",
            }}
          >
            <CiSettings /> {/* Notifications Icon */}
          </a>
          <div
            style={{
              cursor: "pointer",
              fontSize: "18px",
              marginRight: "20px",
              color: isDarkMode ? "#FFD700" : "#333",
            }}
            onClick={handleLogout} // Handle logout when clicked
          >
            <CiExport /> {/* Use logout icon here */}
          </div>
          <div
            style={{
              cursor: "pointer",
              fontSize: "18px",
              color: isDarkMode ? "#FFD700" : "#333",
            }}
            onClick={toggleTheme}
          >
            {isDarkMode ? <CiLight /> : <CiCloudMoon />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
