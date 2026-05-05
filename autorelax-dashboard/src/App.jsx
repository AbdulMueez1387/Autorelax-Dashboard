import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Inventory from "./components/Inventory";
import Sidebar from "./components/Sidebar"; 
import Navbar from "./components/Navbar"; 
import Reports from "./components/Reports"; 
import AddProduct from "./components/AddProduct";
import Invoice from "./components/Invoice";
import "./App.css"; 
import FinancialReports from "./components/FinancialReports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <div className="app-layout">
              <Navbar />
              <div className="main-body">
                <Sidebar />
                <div className="content-container">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/profit-loss" element={<FinancialReports/>}/>
                    <Route path="/docs" element={<Invoice />} />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;