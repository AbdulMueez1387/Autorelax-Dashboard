import React from "react";
import { FaBox, FaWifi, FaHistory, FaExclamationCircle, FaSearch, FaEdit, FaEllipsisH } from "react-icons/fa";
import "./Inventory.css";

const Inventory = () => {
  const inventoryData = [
    { id: 1, name: "Engine Oil", qty: "5L", date: "August 15, 2026", status: "Good" },
    { id: 2, name: "Car Shampoo", qty: "1L", date: "August 20, 2026", status: "Expired" },
    { id: 3, name: "Spray Wax", qty: "16 oz (473 ml)", date: "August 15, 2026", status: "In Stock" },
  ];

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <h1>Inventory Management</h1>
        <p>Your main content goes here...</p>
      </div>

      {/* Stats Cards Row */}
      <div className="stats-container">
        <div className="stat-card pink">
          <div className="stat-icon"><FaBox /></div>
          <div className="stat-info">
            <p>Total Items</p>
            <h3>120</h3>
            <span className="sub-text">Total items in stock</span>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon"><FaWifi /></div>
          <div className="stat-info">
            <p>Low Stock Items</p>
            <h3>50</h3>
            <span className="sub-text">Number of items running low</span>
          </div>
        </div>

        <div className="stat-card blue">
          <div className="stat-icon"><FaHistory /></div>
          <div className="stat-info">
            <p>Expired Items</p>
            <h3>20</h3>
            <span className="sub-text">Number of expired items</span>
          </div>
        </div>

        <div className="stat-card yellow">
          <div className="stat-icon"><FaExclamationCircle /></div>
          <div className="stat-info">
            <p>Out of Stock Items</p>
            <h3>10</h3>
            <span className="sub-text">Number of items out of stock</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-section">
        <div className="table-controls">
          <h3>Inventory Management</h3>
          <div className="controls-right">
            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Search" />
            </div>
            <button className="add-btn">+ Add Items</button>
          </div>
        </div>

        <table className="inventory-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Item Name</th>
              <th>Image</th>
              <th>Quantity</th>
              <th>Last Updated</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item) => (
              <tr key={item.id}>
                <td><input type="checkbox" /></td>
                <td>{item.name}</td>
                <td><div className="img-box"></div></td>
                <td>{item.qty}</td>
                <td>{item.date}</td>
                <td>
                  <span className={`status-pill ${item.status.toLowerCase().replace(" ", "")}`}>
                    {item.status}
                  </span>
                </td>
                <td className="actions">
                  <FaEdit className="edit-icon" />
                  <FaEllipsisH className="more-icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;