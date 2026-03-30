import "./MainContent.css";
import {
  FaShoppingCart,
  FaCashRegister,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
} from "react-icons/fa";
const MainContent = () => {
  const cards = [
    {
      label: "Total Sales",
      val: "$25,000",
      update: "+5% since last month",
      cls: "red",
      icon: <FaShoppingCart />,
    },
    {
      label: "Total Purchase",
      val: "$20,000",
      update: "+24% since last month",
      cls: "green",
      icon: <FaCashRegister />,
    },
    {
      label: "Total Expenses",
      val: "$23,000",
      update: "+24% since last month",
      cls: "blue",
      icon: <FaMoneyBillWave />,
    },
    {
      label: "Invoice Due",
      val: "$23,000",
      update: "+24% since last month",
      cls: "yellow",
      icon: <FaFileInvoiceDollar />,
    },
  ];

  return (
    <main className="main-content">
      <div className="header-text">
        <h2>Dashboard</h2>
        <p>Your main content goes here...</p>
      </div>

      <div className="stats-grid">
        {cards.map((c, i) => (
          <div key={i} className={`stat-card ${c.cls}`}>
            <div className="card-top">
              <div className="icon-placeholder">{c.icon}</div>
              <span>{c.label}</span>
            </div>
            <h3>{c.val}</h3>
            <p className="update">{c.update}</p>
          </div>
        ))}
      </div>

      <div className="charts-area">
        <div className="chart-box main-chart">Line Chart Area</div>
        <div className="chart-box side-chart">Donut Chart Area</div>
      </div>
    </main>
  );
};

export default MainContent;
