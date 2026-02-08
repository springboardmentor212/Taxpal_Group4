import { useState } from "react";
import "./ExpenseForm.css";
function ExpensesForm({ onSave, closeForm }) {
  const [value, setValue] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      description: value,
      amount: Number(amount),
      category: category,
      date: date,
      type: "Expense",
    };
    if(!amount || !category || !date){
      setError("Please fill all the required fields");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }
    onSave(newTransaction);
    setSuccess("Your Details have been Saved");
    setTimeout(() => {
      closeForm();
    }, 1200);
  };

  return (
    <div className="expense-modal-overlay">
      <form className="expense-form-wrapper" onSubmit={handleSubmit}>
        <div className="expense-form-card">
          <h1 className="expense-form-title">Record New Expense</h1>
          <p className="expense-form-subtitle">Add details about your expense to track your spending better</p>
          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}
          <div className="expense-form-grid">
            <div className="expense-field">
              <p className="expense-label">Description</p>
              <input className="expense-input" type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. Rent"/>
            </div>
            <div className="expense-field">
              <p className="expense-label">Amount</p>
              <input className="expense-input" type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="$ 0.00"/>
            </div>
          </div>
          <div className="expense-form-grid">
            <div className="expense-field">
              <p className="expense-label">Category</p>
              <input className="expense-input" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Select a Category"/>
            </div>
            <div className="expense-field">
              <p className="expense-label">Date</p>
              <input className="expense-input" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
          </div>
          <p className="expense-label">Notes (Optional)</p>
          <textarea className="expense-textarea" placeholder="Add any additional details"></textarea>
          <div className="expense-form-buttons">
            <button type="button" className="expense-btn cancel" onClick={closeForm}>Cancel</button>
            <button type="submit" className="expense-btn save">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default ExpensesForm;