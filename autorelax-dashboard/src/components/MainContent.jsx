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
      val: "RS 25,000",
      update: "+5% since last month",
      cls: "red",
      icon: <FaShoppingCart />,
    },
    {
      label: "Total Purchase",
      val: "RS 20,000",
      update: "+24% since last month",
      cls: "green",
      icon: <FaCashRegister />,
    },
    {
      label: "Total Expenses",
      val: "RS 23,000",
      update: "+24% since last month",
      cls: "blue",
      icon: <FaMoneyBillWave />,
    },
    {
      label: "Invoice Due",
      val: "RS 23,000",
      update: "+24% since last month",
      cls: "yellow",
      icon: <FaFileInvoiceDollar />,
    },
  ];

  return (
    <main className="dashboard-main-content">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Manage and monitor your inventory efficiently.</p>
      </div>

      <div className="dashboard-stats-grid">
        {cards.map((c, i) => (
          <div key={i} className={`dashboard-card ${c.cls}`}>
            <div className="dashboard-card-top">
              <div className="dashboard-icon">{c.icon}</div>
              <span>{c.label}</span>
            </div>
            <h3>{c.val}</h3>
            <p className="dashboard-update">{c.update}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-charts">
        <div className="dashboard-chart-box">Line Chart Area</div>
        <div className="dashboard-chart-box">Donut Chart Area</div>
      </div>
    </main>
  );
};

export default MainContent;