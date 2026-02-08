import "./Dashboard.css";
import Form from "./Form.jsx";
import FinancialDashboard from "./FinancialDashboard.jsx";
import TaxpalAI from "./TaxpalAI.jsx";
import Reports from "./Reports.jsx";
import Taxestimator from "./Taxestimator.jsx";
import Taxcalender from "./Taxcalender.jsx";
import Settings from "./Settings.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  const loginRedirect = () => {
     navigate("http://localhost:5173/signup");
  }
  const [activePage, setActivePage] = useState("dashboard");
  return (
    <div className="main-dashboard-class">
      <div className="left-panel">
        <div className="sidebar">
          <h2>TaxPal</h2>
          <div className="input-text-elements">
            <i className="fa-solid fa-house"></i>
            <button onClick={() => setActivePage("dashboard")}>Dashboard</button>
          </div>
          <div className="input-text-elements">
            <i className="fa-solid fa-arrow-rotate-left"></i>
            <button onClick={() => setActivePage("Taxcalender")}>Tax Calender</button>
          </div>
          <div className="input-text-elements">
            <i className="fa-regular fa-clock"></i>
            <button onClick={() => setActivePage("budgets")}>Budgets</button>
          </div>
          <div className="input-text-elements">
            <i className="fa-solid fa-calculator"></i>
            <button onClick={()=> setActivePage("Taxestimator")}>Tax Estimator</button>
          </div>
          <div className="input-text-elements">
            <i className="fa-solid fa-message"></i>
            <button onClick={() => setActivePage("taxpalAI")}>TaxPal AI</button>
          </div>
          <div className="input-text-elements">
            <i className="fa-regular fa-file-lines"></i>
            <button onClick={() => setActivePage("Reports")}>Reports</button>
          </div>
        </div>
        <div className="footer-nav-bar">
          <h2>TaxPal</h2>
          <div className="nav-bar-content">
            <div className="nav-item">
              <button onClick={() => setActivePage("Settings")}><i className="fa-solid fa-ellipsis"></i>  Settings</button>
            </div>
            <div className="nav-item">
              <button onClick={loginRedirect}><i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out</button>
            </div>
          </div>
        </div>
      </div>
      <div className="content-area">
        {activePage === "dashboard" && <FinancialDashboard />}
        {activePage === "budgets" && <Form />}
        {activePage === "taxpalAI" && <TaxpalAI />}
        {activePage === "Reports" && <Reports />}
        {activePage === "Taxestimator" && <Taxestimator />}
        {activePage === "Taxcalender" && <Taxcalender />}
        {activePage === "Settings" && <Settings />}
      </div>
    </div>
  );
}
export default Dashboard;