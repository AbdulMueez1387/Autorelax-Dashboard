import React, { useState, useEffect, useMemo } from "react";
import "./MainContent.css";
import {
  FaShoppingCart,
  FaCashRegister,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";
// Chart.js Imports
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

const MainContent = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [timeFrame, setTimeFrame] = useState("Monthly");

  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      const parsedData = JSON.parse(savedExpenses);
      const total = parsedData.reduce((sum, item) => sum + Number(item.price || 0), 0);
      setTotalExpense(total);
    }
  }, []);

  // --- Logic for Chart Data based on timeframe ---
  const chartData = useMemo(() => {
    const labels = {
      Daily: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      Weekly: ["Week 1", "Week 2", "Week 3", "Week 4"],
      Monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      Yearly: ["2023", "2024", "2025", "2026"]
    };

    return {
      labels: labels[timeFrame],
      datasets: [
        {
          label: "Expenses",
          data: labels[timeFrame].map(() => (totalExpense / labels[timeFrame].length).toFixed(0)),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
          tension: 0.4,
          pointRadius: 3,
        }
      ],
    };
  }, [timeFrame, totalExpense]);

  const cards = [
    { label: "Total Sales", val: "RS 125,000", update: "+12.5%", isLoss: false, cls: "sales", icon: <FaShoppingCart /> },
    { label: "Total Purchase", val: "RS 45,000", update: "+2.1%", isLoss: false, cls: "purchase", icon: <FaCashRegister /> },
    { label: "Total Expenses", val: `RS ${totalExpense.toLocaleString()}`, update: "Dynamic", isLoss: true, cls: "expense", icon: <FaMoneyBillWave /> },
    { label: "Invoice Due", val: "RS 12,300", update: "-5%", isLoss: false, cls: "due", icon: <FaFileInvoiceDollar /> },
  ];

  return (
    <main className="dashboard-main-content">
      <div className="dashboard-header">
        <div className="header-text">
          <h2>Overview Dashboard</h2>
          <p>Statistics and financial summary of your business.</p>
        </div>
        <div className="header-date">
           Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="dashboard-stats-grid">
        {cards.map((c, i) => (
          <div key={i} className={`dashboard-card-pro ${c.cls}`}>
            <div className="card-inner">
              <div className="card-info">
                <span className="card-label">{c.label}</span>
                <h3 className="card-value">{c.val}</h3>
                <div className={`card-update ${c.isLoss ? 'down' : 'up'}`}>
                  {c.isLoss ? <FaArrowDown /> : <FaArrowUp />} <span>{c.update}</span>
                  <small>vs last month</small>
                </div>
              </div>
              <div className="card-icon-box">{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Actual Charts Section (Replacing Placeholders) --- */}
      <div className="dashboard-charts-layout">
        <div className="chart-box main-chart">
          <div className="chart-header">
            <h3>Revenue Growth</h3>
            <div className="chart-filters">
              {["Daily", "Weekly", "Monthly", "Yearly"].map((type) => (
                <button 
                  key={type} 
                  className={timeFrame === type ? "active-filter" : ""} 
                  onClick={() => setTimeFrame(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="chart-container">
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="chart-box side-chart">
          <div className="chart-header">
            <h3>Distribution</h3>
          </div>
          <div className="chart-container-donut">
            <Doughnut 
              data={{
                labels: ['Sales', 'Expenses', 'Due'],
                datasets: [{
                  data: [125000, totalExpense, 12300],
                  backgroundColor: ['#22c55e', '#ef4444', '#f59e0b'],
                }]
              }}
              options={{ responsive: true, maintainAspectRatio: false }} 
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;