import React from "react";
import { FaPlus, FaLightbulb, FaBolt, FaArrowDown, FaExclamationCircle } from "react-icons/fa";
import "./Reports.css";

const Reports = () => {
  const expensesData = [
    { id: 1, date: "12/06/2026", type: "Electric Bill", price: "1200.00", total: "1200.00" },
    { id: 2, date: "12/06/2026", type: "Electric Bill", price: "1200.00", total: "1200.00" },
    { id: 3, date: "12/06/2026", type: "Electric Bill", price: "1200.00", total: "1200.00" },
    { id: 4, date: "12/06/2026", type: "Electric Bill", price: "1200.00", total: "1200.00" },
    { id: 5, date: "12/06/2026", type: "Electric Bill", price: "1200.00", total: "1200.00" },
  ];

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Report Analysis</h1>
        <p>Your main content goes here...</p>
      </div>

      {/* Stats Cards Section */}
      <div className="report-stats-grid">
        <div className="r-card border-red">
          <div className="r-icon bg-red"><FaBolt /></div>
          <div className="r-info">
            <span>Total Items</span>
            <h3>120</h3>
            <p>Total items in stock</p>
          </div>
        </div>
        <div className="r-card border-green">
          <div className="r-icon bg-green"><FaLightbulb /></div>
          <div className="r-info">
            <span>Low Stock Items</span>
            <h3>50</h3>
            <p>Number of items running low</p>
          </div>
        </div>
        <div className="r-card border-blue">
          <div className="r-icon bg-blue"><FaPlus /></div>
          <div className="r-info">
            <span>Expired Items</span>
            <h3>20</h3>
            <p>Number of expired items</p>
          </div>
        </div>
        <div className="r-card border-yellow">
          <div className="r-icon bg-yellow"><FaExclamationCircle /></div>
          <div className="r-info">
            <span>Out Of Stock Items</span>
            <h3>10</h3>
            <p>Number of items out of stock</p>
          </div>
        </div>
      </div>

      <div className="reports-main-grid">
        {/* Chart Section */}
        <div className="chart-box">
          <div className="chart-header">
            <h3>Weekly Overview</h3>
            <span>Apr 1 - Apr 7</span>
          </div>
          <div className="bar-chart">
            <div className="bar-wrapper"><div className="bar-fill" style={{height: '40%'}}></div><span>M</span></div>
            <div className="bar-wrapper"><div className="bar-fill" style={{height: '60%'}}></div><span>T</span></div>
            <div className="bar-wrapper"><div className="bar-fill" style={{height: '30%'}}></div><span>W</span></div>
            <div className="bar-wrapper"><div className="bar-fill" style={{height: '80%'}}></div><span>T</span></div>
            <div className="bar-wrapper"><div className="bar-fill active-bar" style={{height: '95%'}}></div><span>F</span></div>
            <div className="bar-wrapper"><div className="bar-fill" style={{height: '50%'}}></div><span>S</span></div>
            <div className="bar-wrapper"><div className="bar-fill" style={{height: '40%'}}></div><span>S</span></div>
          </div>
          <div className="chart-footer">
             <div className="goal-icon"><FaLightbulb /></div>
             <div>
               <h4>You're doing good!</h4>
               <p>You already reached your goal</p>
             </div>
          </div>
        </div>

        {/* Updated Table Section */}
        <div className="table-box">
          <div className="table-header">
            <h2>Expenses Report</h2>
            <button className="btn-expenses"><FaPlus /> Expenses</button>
          </div>
          <table className="report-table">
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
              {expensesData.map((item, index) => (
                <tr key={item.id}>
                  {/* Dynamic Serial No (01, 02...) */}
                  <td>{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
                  <td>{item.date}</td>
                  <td className="type-cell">
                    <FaBolt className="dim-icon" /> {item.type}
                  </td>
                  <td className="price-cell">
                    <FaArrowDown className="red-arrow" /> {item.price}
                  </td>
                  {/* Total price column fix */}
                  <td className="total-cell">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;