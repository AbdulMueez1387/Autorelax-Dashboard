import React from "react";
import { FaHome, FaBox, FaPlus, FaChartBar, FaExclamationTriangle, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom"; // NavLink add kiya gaya
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout Clicked");
    navigate("/login"); 
  };

  return (
    <aside className="sidebar">
      <p className="menu-label">Main</p>
      <ul className="menu-list">
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaHome /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/inventory" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaBox /> Inventory
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-product" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaPlus /> Add Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaChartBar /> Reports
          </NavLink>
        </li>
        <li>
          <NavLink to="/docs" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaFileAlt /> Docs
          </NavLink>
        </li>
      </ul>

      <p className="menu-label">Account</p>
      <ul className="menu-list">
        <li onClick={handleLogout} className="logout-item">
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;