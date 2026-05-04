import React, { useState, useEffect, useMemo } from "react";
import "./MainContent.css";
import {
  FaShoppingCart,
  FaCashRegister,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

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
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
);

const MainContent = () => {
  // ================= STATES =================
  const [totalExpense, setTotalExpense] = useState(0);
  const [timeFrame, setTimeFrame] = useState("Monthly");
  const [orders, setOrders] = useState([]);

  // ================= LOAD ORDERS (FIXED) =================
  useEffect(() => {
    const loadOrders = () => {
      try {
        const saved = localStorage.getItem("orders");

        if (saved) {
          setOrders(JSON.parse(saved));
        } else {
          setOrders([
            {
              id: 1,
              orderId: "ORD-001",
              fullName: "Ali Khan",
              city: "Lahore",
              postalCode: "54000",
              phone: "03001234567",
              address: null,
              apartment: null,
              status: "Pending",
            },
          ]);
        }
      } catch (err) {
        console.log("Order error:", err);
        setOrders([]);
      }
    };

    loadOrders();
  }, []);

  // ================= SAVE ORDERS =================
  useEffect(() => {
    if (orders.length === 0) return;
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ================= STATUS UPDATE =================
  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order,
      ),
    );
  };

  // ================= EXPENSES (FIXED WARNING) =================
  useEffect(() => {
    const loadExpenses = () => {
      const savedExpenses = localStorage.getItem("expenses");

      if (!savedExpenses) return;

      try {
        const parsed = JSON.parse(savedExpenses);

        const total = parsed.reduce(
          (sum, item) => sum + Number(item.price || 0),
          0,
        );

        setTimeout(() => {
          setTotalExpense(total);
        }, 0);
      } catch (err) {
        console.log("Expense error:", err);
      }
    };

    loadExpenses();
  }, []);

  // ================= CHART =================
  const chartData = useMemo(() => {
    const labels = {
      Daily: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      Weekly: ["Week 1", "Week 2", "Week 3", "Week 4"],
      Monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      Yearly: ["2023", "2024", "2025", "2026"],
    };

    return {
      labels: labels[timeFrame],
      datasets: [
        {
          label: "Expenses",
          data: labels[timeFrame].map(() =>
            (totalExpense / labels[timeFrame].length).toFixed(0),
          ),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [timeFrame, totalExpense]);

  // ================= CARDS =================
  const cards = [
    {
      label: "Total Sales",
      val: "RS 125,000",
      update: "+12.5%",
      isLoss: false,
      icon: <FaShoppingCart />,
    },
    {
      label: "Total Purchase",
      val: "RS 45,000",
      update: "+2.1%",
      isLoss: false,
      icon: <FaCashRegister />,
    },
    {
      label: "Total Expenses",
      val: `RS ${totalExpense.toLocaleString()}`,
      update: "Dynamic",
      isLoss: true,
      icon: <FaMoneyBillWave />,
    },
    {
      label: "Invoice Due",
      val: "RS 12,300",
      update: "-5%",
      isLoss: false,
      icon: <FaFileInvoiceDollar />,
    },
  ];

  return (
    <main className="dashboard-main-content">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h2>Overview Dashboard</h2>
          <p>Statistics and financial summary</p>
        </div>

        <div className="header-date">{new Date().toLocaleDateString()}</div>
      </div>

      {/* ================= CARDS ================= */}
      <div className="dashboard-stats-grid">
        {cards.map((c, i) => (
          <div key={i} className="dashboard-card-pro">
            <div className="card-inner">
              <div>
                <span className="card-label">{c.label}</span>
                <h3 className="card-value">{c.val}</h3>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  {c.isLoss ? <FaArrowDown /> : <FaArrowUp />}
                  <span>{c.update}</span>
                </div>
              </div>

              <div className="card-icon-box">{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= CHARTS ================= */}
      <div className="dashboard-charts-layout">
        <div className="chart-box">
          <h3>Revenue</h3>

          {["Daily", "Weekly", "Monthly", "Yearly"].map((type) => (
            <button
              key={type}
              onClick={() => setTimeFrame(type)}
              className={timeFrame === type ? "active" : ""}
            >
              {type}
            </button>
          ))}

          <Line data={chartData} />
        </div>

        <div className="chart-box">
          <h3>Distribution</h3>

          <Doughnut
            data={{
              labels: ["Sales", "Expenses", "Due"],
              datasets: [
                {
                  data: [125000, totalExpense, 12300],
                  backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"],
                },
              ],
            }}
          />
        </div>
      </div>

      {/* ================= ORDERS ================= */}
      <div className="orders-section">
        <h3>Orders</h3>

        <div className="table-wrapper">
  <table className="orders-table">
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Name</th>
        <th>City</th>
        <th>Postal Code</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Apartment</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {orders.map((order) => {
        const statusClass = order.status.toLowerCase().replace(/\s+/g, "-");

        return (
          <tr key={order.id}>
            <td>{order.orderId}</td>
            <td>{order.fullName}</td>
            <td>{order.city}</td>
            <td>{order.postalCode}</td>
            <td>{order.phone}</td>
            <td>{order.address ?? "N/A"}</td>
            <td>{order.apartment ?? "N/A"}</td>

            {/* STATUS DROPDOWN */}
            <td>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
                className={`status-select status ${statusClass}`}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
              </select>
            </td>

            {/* ACTION */}
            <td>
              {order.status === "Pending" && (
                <>
                  <button className="primary" onClick={() => updateStatus(order.id, "In Progress")}>
                    Start
                  </button>
                  <button className="danger" onClick={() => updateStatus(order.id, "Canceled")}>
                    Cancel
                  </button>
                </>
              )}

              {order.status === "In Progress" && (
                <>
                  <button className="success" onClick={() => updateStatus(order.id, "Completed")}>
                    Complete
                  </button>
                  <button className="danger" onClick={() => updateStatus(order.id, "Canceled")}>
                    Cancel
                  </button>
                </>
              )}

              {order.status === "Completed" && <span className="done">✔ Done</span>}

              {order.status === "Canceled" && <span className="cancel">✖ Canceled</span>}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
      </div>
    </main>
  );
};

export default MainContent;
