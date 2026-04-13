import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import MainContent from "./components/MainContent"; // Dashboard home cards
import Inventory from "./components/Inventory"; // New Inventory page
import Reports from "./components/Reports"; // New Reports page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Parent Route */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Index route dashboard open hote hi MainContent dikhayega */}
          <Route index element={<MainContent />} /> 
          <Route path="inventory" element={<Inventory />} />
          <Route path="reports" element={<Reports />} />  
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;