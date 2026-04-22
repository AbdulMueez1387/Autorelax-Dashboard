import React, { useState, useEffect, useMemo } from "react";
import { FaPlus, FaTimes, FaTrash, FaEdit, FaWallet, FaChartLine, FaArrowUp, FaCalendarAlt } from "react-icons/fa";
import "./Reports.css";

const Reports = () => {
  // 1. Initial State: Load directly from localStorage to prevent empty-array overwrite
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [viewType, setViewType] = useState("weekly");
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ date: "", type: "", price: "" });

  // 2. Save to localStorage whenever 'expenses' changes
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: editId || Date.now(),
      date: formData.date,
      type: formData.type,
      price: Number(formData.price),
    };

    if (editId) {
      setExpenses((prev) => prev.map((item) => (item.id === editId ? newItem : item)));
      setEditId(null);
    } else {
      setExpenses((prev) => [...prev, newItem]);
    }
    setShowModal(false);
    setFormData({ date: "", type: "", price: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this expense?")) {
      setExpenses(expenses.filter((item) => item.id !== id));
    }
  };

  // Stats Logic
  const stats = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + Number(e.price), 0);
    const avg = expenses.length > 0 ? (total / expenses.length).toFixed(0) : 0;
    const highest = expenses.length > 0 ? Math.max(...expenses.map(e => e.price)) : 0;
    return { total, avg, highest, count: expenses.length };
  }, [expenses]);

  // Chart Logic with Proper Data Formatting
  const chartData = useMemo(() => {
    const map = {};
    expenses.forEach((item) => {
      const dateObj = new Date(item.date);
      // Week formatting
      const week = `Wk ${Math.ceil(dateObj.getDate() / 7)}`;
      const day = item.date; 
      const key = viewType === "daily" ? day : week;
      map[key] = (map[key] || 0) + Number(item.price);
    });

    // Sort data for chart
    return Object.keys(map).sort().map(key => ({
      label: key,
      value: map[key]
    }));
  }, [expenses, viewType]);

  const maxVal = Math.max(...chartData.map(d => d.value), 1);

  return (
    <div className="reports-page">
      <header className="reports-header">
        <div>
          <h2> Financial Analytics</h2>
          <p>Real-time expense tracking and insights</p>
        </div>
        <button className="add-main-btn" onClick={() => { setEditId(null); setShowModal(true); }}>
          <FaPlus /> Add Expense
        </button>
      </header>

      {/* Stats Cards */}
      <div className="reports-stats-grid">
        <div className="r-stat-card total">
          <div className="r-icon"><FaWallet /></div>
          <div className="r-info"><span>Total Spend</span><h3>Rs {stats.total.toLocaleString()}</h3></div>
        </div>
        <div className="r-stat-card avg">
          <div className="r-icon"><FaChartLine /></div>
          <div className="r-info"><span>Avg / Entry</span><h3>Rs {stats.avg}</h3></div>
        </div>
        <div className="r-stat-card high">
          <div className="r-icon"><FaArrowUp /></div>
          <div className="r-info"><span>Highest</span><h3>Rs {stats.highest}</h3></div>
        </div>
        <div className="r-stat-card count">
          <div className="r-icon"><FaCalendarAlt /></div>
          <div className="r-info"><span>Records</span><h3>{stats.count}</h3></div>
        </div>
      </div>

      <div className="reports-main-layout">
        {/* Modern Chart Section */}
        <div className="chart-section box">
          <div className="section-header">
            <h3>Spending Trends</h3>
            <div className="toggle-group">
              <button className={viewType === "weekly" ? "active" : ""} onClick={() => setViewType("weekly")}>Weekly</button>
              <button className={viewType === "daily" ? "active" : ""} onClick={() => setViewType("daily")}>Daily</button>
            </div>
          </div>

          <div className="visual-chart-container">
            {chartData.length === 0 ? (
              <div className="no-data-msg">Add expenses to see analytics</div>
            ) : (
              chartData.map((item, i) => (
                <div className="bar-wrapper" key={i}>
                  <div className="bar-value">Rs {item.value}</div>
                  <div 
                    className="bar-fill" 
                    style={{ height: `${(item.value / maxVal) * 180}px` }}
                  ></div>
                  <span className="bar-label">{item.label}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="table-section box">
          <h3>Recent History</h3>
          <div className="mini-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((item) => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td className="type-tag">{item.type}</td>
                    <td className="price-tag">Rs {item.price}</td>
                    <td className="action-cell">
                      <FaEdit className="edit-i" onClick={() => { setFormData({date: item.date, type: item.type, price: item.price}); setEditId(item.id); setShowModal(true); }} />
                      <FaTrash className="del-i" onClick={() => handleDelete(item.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal is same as before, ensures clean inputs */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
             <div className="modal-header">
                <h3>{editId ? "Update Expense" : "New Expense"}</h3>
                <FaTimes onClick={() => setShowModal(false)} className="close-btn" />
             </div>
             <form onSubmit={handleSubmit}>
                <div className="input-field">
                  <label>Date</label>
                  <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                </div>
                <div className="input-field">
                  <label>Description</label>
                  <input type="text" placeholder="Fuel, Rent, etc." required value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} />
                </div>
                <div className="input-field">
                  <label>Price (Rs)</label>
                  <input type="number" placeholder="0" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                </div>
                <button className="save-submit-btn">{editId ? "Update" : "Save Entry"}</button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;