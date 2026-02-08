import { useState } from "react";
import "./IncomeForm.css";
function IncomeForm({ onSave, closeForm }) {
  const [value, setValue] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  if (!isVisible) {
    return null;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      description: value,
      amount: Number(amount),
      category: category,
      date: date,
      type: "Income",
    };
    if (!value || !amount || !category || !date){
      setError("Please Fill all the required Fields");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }
    onSave(newTransaction);
    setSuccess("Your Details have been Saved");
    setTimeout(() => {
      setIsVisible(false);
      closeForm();
    }, 1200);
  };
  return (
    <div className="income-modal-overlay">
      <form className="income-form-wrapper" onSubmit={handleSubmit} noValidate>
        <div className="income-form-card">
          <h1 className="income-form-title">Record New Income</h1>
          <p className="income-form-subtitle">Add details about your income to track your spending better</p>
          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}
          <div className="income-form-grid">
            <div className="income-field">
              <p className="income-label">Description</p>
              <input className="income-input" type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. Web Design Project"/>
            </div>
            <div className="income-field">
              <p className="income-label">Amount</p>
              <input className="income-input" type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="$ 0.00"/>
            </div>
          </div>
          <div className="income-form-grid">
            <div className="income-field">
              <p className="income-label">Category</p>
              <input className="income-input" type="text"  value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Select a Category"/>
            </div>
            <div className="income-field">
              <p className="income-label">Date</p>
              <input className="income-input" type="date"  value={date}  onChange={(e) => setDate(e.target.value)}/>
            </div>
          </div>
          <p className="income-label">Notes (Optional)</p>
          <textarea className="income-textarea" placeholder="Add any additional details"></textarea>
          <div className="income-form-buttons">
            <button type="button" className="income-btn cancel" onClick={closeForm}>Cancel</button>
            <button type="submit" className="income-btn save">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default IncomeForm;