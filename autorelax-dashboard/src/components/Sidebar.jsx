import React from "react";
import { FaHome, FaBox, FaPlus, FaChartBar, FaExclamationTriangle, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <p className="menu-label">Main</p>
      <ul className="menu-list">
        <li>
          <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaHome className="icon" /> <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/inventory" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaBox className="icon" /> <span>Inventory</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/add-product" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaPlus className="icon" /> <span>Add Product</span>
          </NavLink>
        </li>
        
        {/* Reports Link Added */}
        <li>
          <NavLink to="/dashboard/reports" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaChartBar className="icon" /> <span>Reports</span>
          </NavLink>
        </li>

        {/* 404 Error Link Added */}
        <li>
          <NavLink to="/dashboard/error" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaExclamationTriangle className="icon" /> <span>404 Error</span>
          </NavLink>
        </li>

        {/* Docs Link Added */}
        <li>
          <NavLink to="/dashboard/docs" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaFileAlt className="icon" /> <span>Docs</span>
          </NavLink>
        </li>
      </ul>

      <p className="menu-label">Account</p>
      <ul className="menu-list">
        <li onClick={() => navigate("/")} className="logout-wrapper">
          <div className="logout-content">
            <FaSignOutAlt className="icon" /> <span>Logout</span>
          </div>
        </li>
      </ul> 
    </aside>
  );
};

export default Sidebar;