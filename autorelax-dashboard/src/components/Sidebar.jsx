import React from "react";
import { FaHome, FaBox, FaPlus, FaChartBar, FaExclamationTriangle, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout Clicked");
    navigate("/"); 
  };

  return (
    <aside className="sidebar">
      <p className="menu-label">Main</p>
      <ul className="menu-list">
        <li className="active"><FaHome /> Dashboard</li>
        <li><FaBox /> Inventory</li>
        <li><FaPlus /> Add Product</li>
        <li><FaChartBar /> Reports</li>
        <li><FaExclamationTriangle /> 404 Error</li>
        <li><FaFileAlt /> Docs</li>
      </ul>

      <p className="menu-label" >Account</p>
      <ul className="menu-list">
        <li onClick={handleLogout} >
          <FaSignOutAlt /> Logout
        </li>
      </ul> 
    </aside>
  );
};

export default Sidebar;