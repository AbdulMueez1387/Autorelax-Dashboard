import Navbar from "./Navbar";
import MainContent from "./MainContent";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-body">
        {/* <Sidebar /> */}
        <MainContent />
      </div>
    </div>
  );
};
export default Dashboard;
