import React from "react";
import { FaPlus, FaSearch, FaEllipsisV, FaEdit, FaTrashAlt } from "react-icons/fa";
import "./Inventory.css";

const Inventory = () => {
  const inventoryData = [
    { id: 1, name: "Engine Oil", quantity: "5L", updated: "August 15, 2026", status: "Good", image: "https://via.placeholder.com/40" },
    { id: 2, name: "Car Shampoo", quantity: "1L", updated: "August 20, 2026", status: "Expired", image: "https://via.placeholder.com/40" },
    { id: 3, name: "Spray Wax", quantity: "16 fl oz (473 ml)", updated: "August 15, 2026", status: "In Stock", image: "https://via.placeholder.com/40" },
  ];

  return (
    <div className="inventory-container">
      <header className="inventory-header">
        <h1>Inventory Management</h1>
        <p>Your main content goes here...</p>
      </header>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card pink">
          <div className="stat-info">
            <span className="stat-label">Total Items</span>
            <h2 className="stat-count">120</h2>
            <span className="stat-subtext">Total items in stock</span>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-info">
            <span className="stat-label">Low Stock Items</span>
            <h2 className="stat-count">50</h2>
            <span className="stat-subtext">Number of items running low</span>
          </div>
        </div>
        <div className="stat-card blue">
          <div className="stat-info">
            <span className="stat-label">Expired Items</span>
            <h2 className="stat-count">20</h2>
            <span className="stat-subtext">Number of expired items</span>
          </div>
        </div>
        <div className="stat-card yellow">
          <div className="stat-info">
            <span className="stat-label">Out of Stock Items</span>
            <h2 className="stat-count">10</h2>
            <span className="stat-subtext">Number of items out of stock</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-section">
        <div className="table-header">
          <h3>Inventory Management</h3>
          <div className="table-actions">
            <div className="search-bar">
              <FaSearch />
              <input type="text" placeholder="Search" />
            </div>
            <button className="add-btn">
              <FaPlus /> Add Items
            </button>
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
                <td><img src={item.image} alt={item.name} className="item-img" /></td>
                <td>{item.quantity}</td>
                <td>{item.updated}</td>
                <td>
                  <span className={`status-badge ${item.status.toLowerCase().replace(" ", "-")}`}>
                    {item.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <FaEdit className="edit-icon" />
                  <FaEllipsisV className="more-icon" />
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