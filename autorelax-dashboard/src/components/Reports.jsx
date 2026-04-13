import React from "react";
import { FaPlus } from "react-icons/fa";
import "./Reports.css";

const Reports = () => {
  return (
    <div className="reports-page">
      <header>
        <h2>Report Analysis</h2>
        <p>Your main content goes here...</p>
      </header>

      {/* Stats Cards Section */}
      <div className="stats-grid">
        <div className="stat-card pink">Total Items <h3>120</h3> <small>Total in stock</small></div>
        <div className="stat-card green">Low Stock <h3>50</h3> <small>Running low</small></div>
        <div className="stat-card blue">Expired <h3>20</h3> <small>Expired items</small></div>
        <div className="stat-card yellow">Out of Stock <h3>10</h3> <small>Out of stock</small></div>
      </div>

      <div className="reports-layout">
        {/* Left Side Chart */}
        <div className="card weekly-overview">
          <h3>Weekly Overview</h3>
          <div className="chart-bars">
            {/* Simple CSS bars */}
            <div className="bar" style={{height: "50%"}}></div>
            <div className="bar orange" style={{height: "80%"}}></div>
            <div className="bar blue" style={{height: "60%"}}></div>
          </div>
          <div className="chart-footer">You're doing good!</div>
        </div>

        {/* Right Side Table */}
        <div className="card expenses-table">
          <div className="table-header">
            <h3>Expenses Report</h3>
            <button className="add-btn"><FaPlus /> Expenses</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Date</th>
                <th>Type</th>
                <th>Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01</td>
                <td>12/06/2026</td>
                <td>Electric Bill</td>
                <td className="red-text">↓ 1200.00</td>
                <td className="red-text bold">1200.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;