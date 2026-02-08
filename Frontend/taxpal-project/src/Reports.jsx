import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Reports.css";
function Reports() {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState("");
  const [month, setMonth] = useState("");
  const [format, setFormat] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reportType && !month && !format) {
      setError("Please fill all details");
      return;
    }
    if (!reportType) {
      setError("Report Type is not filled");
      return;
    }
    if (!month) {
      setError("Month is not selected");
      return;
    }
    if (!format) {
      setError("Format is not filled");
      return;
    }
    setSuccess("Report generated successfully");
    setTimeout(() => {
      navigate(`/report-preview/${month}`);
    }, 1000);
  };
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <>
      <div className="main-reports-page">
        <div className="top-heading">
          <h2>Financial Reports</h2>
          <p>Generate and Download your financial Reports</p>
        </div>
      </div>
      <form className="reports" onSubmit={handleSubmit}>
        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}
        <h4>Report Type</h4>
        <input placeholder="e.g Income & Expense Report" value={reportType} onChange={(e) => setReportType(e.target.value)}/>
        <h4>Period</h4>
        <input type="month"  value={month} onChange={(e) => setMonth(e.target.value)}/>
        <h4>Format</h4>
        <input placeholder="e.g PDF" value={format} onChange={(e) => setFormat(e.target.value)}/>
        <button type="submit" id="button-id">Generate Report</button>
      </form>
    </>
  );
}

export default Reports;