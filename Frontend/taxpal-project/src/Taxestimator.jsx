import { useState } from "react";
import "./Taxestimator.css";
function Taxestimator() {
  const [subscribeAlerts, setSubscribeAlerts] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    filingStatus: "",
    quarter: "",
    income: "",
    business: "",
    retirement: "",
    health: "",
    home: "",
  });
  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const isFormValid = () => {
    for (let key in formData) {
      if (formData[key] === "" || formData[key] === null) {
        return false;
      }
    }
    return true;
  };
  const calculateTaxIncomeBasedOnSlabs = (taxableIncome) => {
  let tax = 0;
  if (taxableIncome <= 400000) {
    tax = 0;
  } 
  else if (taxableIncome <= 800000) {
    tax = (taxableIncome - 400000) * 0.05;
  } 
  else if (taxableIncome <= 1200000) {
    tax =
      400000 * 0.05 +
      (taxableIncome - 800000) * 0.10;
  } 
  else if (taxableIncome <= 1600000) {
    tax =
      400000 * 0.05 +
      400000 * 0.10 +
      (taxableIncome - 1200000) * 0.15;
  } 
  else if (taxableIncome <= 2000000) {
    tax =
      400000 * 0.05 +
      400000 * 0.10 +
      400000 * 0.15 +
      (taxableIncome - 1600000) * 0.20;
  } 
  else if (taxableIncome <= 2400000) {
    tax =
      400000 * 0.05 +
      400000 * 0.10 +
      400000 * 0.15 +
      400000 * 0.20 +
      (taxableIncome - 2000000) * 0.25;
  } 
  else {
    tax =
      400000 * 0.05 +
      400000 * 0.10 +
      400000 * 0.15 +
      400000 * 0.20 +
      400000 * 0.25 +
      (taxableIncome - 2400000) * 0.30;
  }
   return Math.round(tax);
  };
  const handleCalculateTax = () => {
    if (!isFormValid()) {
      setError("Please fill all required fields before calculating tax.");
      return;
    }
    setError("");
    const income = Number(formData.income);
    const deductions =Number(formData.business) + Number(formData.retirement) + Number(formData.health) + Number(formData.home);
    const taxableIncome = Math.max(income - deductions, 0);
    const tax = calculateTaxIncomeBasedOnSlabs(taxableIncome);
    const due = new Date();
    due.setDate(due.getDate() + 10);
    const dueDate = due.toISOString().split("T")[0];
    const taxData = {
      quarter: formData.quarter,
      tax,
      dueDate,
    };
    localStorage.setItem("currentTax", JSON.stringify(taxData));
    if (subscribeAlerts) {
      const reminderDate = new Date(due);
      reminderDate.setDate(due.getDate() - 5);
      const reminders = [
        {
          title: `Reminder: ${formData.quarter} Estimated Tax Payment`,
          date: reminderDate.toISOString().split("T")[0],
          type: "reminder",
        },
        {
          title: `${formData.quarter} Estimated Tax Payment`,
          date: dueDate,
          type: "payment",
        },
      ];
      localStorage.setItem("taxReminders", JSON.stringify(reminders));
    }
    setSuccess("Estimated tax calculated successfully");
  };
  return (
    <>
      <div className="tax-estimator">
        <h2>Tax Estimator</h2>
        <p>Calculate your estimated tax obligations</p>
      </div>
      <div className="form-estimator">
        <h2>Quarterly Tax Calculator</h2>
        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}
        <div className="grid-2">
          <div className="field">
            <label>Country / Region</label>
            <input type="text" name="country" placeholder = "e.g United States " onChange={handleChange}/>
          </div>
          <div className="field">
            <label>State / Province</label>
            <input type="text" name="state" placeholder = "e.g California " onChange={handleChange}/>
          </div>
          <div className="field">
            <label>Filing Status</label>
            <input type="text" name="filingStatus" placeholder = "e.g Single " onChange={handleChange}/>
          </div>
          <div className="field">
            <label>Quarter</label>
            <input type="text" name="quarter" placeholder = "e.g Q2(45000) "onChange={handleChange}/>
          </div>
        </div>
        <div className="section">
          <label>Gross Income for Quarter</label>
          <input type="number" name="income" onChange={handleChange}/>
        </div>
        <h3 className="section-title">Deductions</h3>
        <div className="grid-2">
          <div className="field">
            <label>Business Expenses</label>
            <input type="number" name="business" onChange={handleChange}/>
          </div>
          <div className="field">
            <label>Retirement Contributions</label>
            <input type="number" name="retirement" onChange={handleChange}/>
          </div>
          <div className="field">
            <label>Health Insurance Premiums</label>
            <input type="number" name="health" onChange={handleChange}/>
          </div>
          <div className="field">
            <label>Home Office Deduction</label>
            <input type="number" name="home" onChange={handleChange}/>
          </div>
        </div>
        <div className="alert-option">
          <input type="checkbox" id="alerts" checked={subscribeAlerts} onChange={(e) => setSubscribeAlerts(e.target.checked)}/>
          <label htmlFor="alerts">Send me alerts & reminders for tax due dates</label>
        </div>
        <br />
        <button type="button" className="button-class" onClick={handleCalculateTax}>Calculate Estimated Tax</button>
      </div>
    </>
  );
}
export default Taxestimator;