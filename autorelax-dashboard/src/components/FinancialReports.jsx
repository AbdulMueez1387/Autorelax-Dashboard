import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaChartLine } from "react-icons/fa";
import "./FinancialReports.css";

const FinancialReports = () => {
  const [showYearly, setShowYearly] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const generateData = () =>
    months.map((m) => ({
      month: m,
      profit: Math.floor(Math.random() * 5000) + 1000,
      loss: Math.floor(Math.random() * 2500) + 500,
    }));

  const data = generateData();

  return (
    <div className="reports-wrapper">
      <div className="reports-header-section">
        <h2 className="main-title">Financial Performance - {selectedYear}</h2>
        <div className="year-controls">
          <button
            className="y-btn"
            onClick={() => setSelectedYear((prev) => prev - 1)}
          >
            ←
          </button>
          <span className="display-year">{selectedYear}</span>
          <button
            className="y-btn"
            onClick={() => setSelectedYear((prev) => prev + 1)}
          >
            →
          </button>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-card profit-border">
          <div className="chart-header">
            <h3>Monthly Profit</h3>
            <span className="profit-tag">Bar Chart</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ left: -20, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" interval={0} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip cursor={{ fill: "#f0fdf4" }} />
              <Bar dataKey="profit" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card loss-border">
          <div className="chart-header">
            <h3>Monthly Loss</h3>
            <span className="loss-tag">Bar Chart</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ left: -20, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" interval={0} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip cursor={{ fill: "#fef2f2" }} />
              <Bar dataKey="loss" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="toggle-container">
        <button
          className="toggle-reports-btn"
          onClick={() => setShowYearly(!showYearly)}
        >
          <FaChartLine />{" "}
          {showYearly ? "Hide Yearly Trends" : "Show Yearly Trends"}
        </button>
      </div>

      {showYearly && (
        <div className="chart-section animate-slide-down">
          <div className="chart-card profit-border">
            <h3>Profit Trend (Yearly View)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ left: -20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="month" interval={0} tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card loss-border">
            <h3>Loss Trend (Yearly View)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ left: -20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="month" interval={0} tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="loss"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialReports;
