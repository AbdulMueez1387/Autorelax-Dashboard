import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom"; // Outlet import karein
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />
        {/* MainContent ki jagah Outlet aayega taake pages switch ho sakein */}
        <div className="dashboard-content-area">
           <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;