import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IncomeExpenseChart from "./IncomeExpenseChart";
import "./ReportPreview.css";
function ReportPreview() {
  const { month } = useParams();
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);
  const filtered = transactions.filter((t) => t.date.startsWith(month));
  return (
    <div className="report-preview-container">
      <h2>Financial Report – {month}</h2>
      <table className="report-table" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="5">No transactions for this month.</td>
            </tr>
          ) : (
            filtered.map((t, i) => (
              <tr key={i}>
                <td>{t.date}</td>
                <td>{t.description}</td>
                <td>{t.category}</td>
                <td>{t.type}</td>
                <td>{t.amount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="chart-container">
        <IncomeExpenseChart transactions={transactions} month={month} />
      </div>
      <br></br>
      <br></br>
      <button className="print-button" onClick={() => window.print()}>Download / Print PDF</button>
    </div>
  );
}
export default ReportPreview;