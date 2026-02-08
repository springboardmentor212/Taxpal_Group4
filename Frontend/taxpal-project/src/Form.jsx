import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./Form.css";
function Form() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const newBudget = {
      category,
      amount,
      description,
    };
    if(!category || !amount ){
      setError("Please Fill all the required Fields");
      return;
    }
    if(!category){
      setError("Category Field is Missing");
      return;
    }
    if(!amount){
      setError("Amount is Missing");
      return;
    }
    setBudgets([...budgets, newBudget]);
    setSuccess("Budget created successfully");
    setCategory("");
    setAmount("");
    setDescription("");
    setTimeout(() => {
      setSuccess("");
    }, 1500);
  };
  return (
    <>
      <div className="form-class">
        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="header">
            <h3>Create New Budget</h3>
          </div>
          <div className="row">
            <div className="field">
              <label>Category</label>
              <input type="text" placeholder="Select a category" value={category} onChange={(e) => setCategory(e.target.value)}/>
            </div>
            <div className="field">
              <label>Budget Amount</label>
              <input type="number" placeholder="$0.00" id="budget-id" value={amount} onChange={(e) => setAmount(e.target.value)}/>
            </div>
          </div>
          <div className="input-wrapper">
            <label>Month</label>
            <input type="Date" placeholder="Enter Month"/>
          </div>
          <div className="field-description">
            <label>Description (optional)</label>
            <br></br>
            <br></br>
            <textarea placeholder="Enter additional details..." value={description} onChange={(e) => setDescription(e.target.value)}/>
          </div>
          <div className="buttons">
            <button id="button-id" type="submit">Create Budget</button>
          </div>
        </form>
      </div>
      <div className="reports">
        <div className="inner-bar">
          <p>Sno</p>
          <p>Category</p>
          <p>Budget</p>
          <p>Spent</p>
          <p>Remaining</p>
          <p>Status</p>
        </div>
        {budgets.map((item, index) => (
          <div className="inner-bar" key={index}>
            <p>{index + 1}</p>
            <p>{item.category}</p>
            <p>${item.amount}</p>
            <p>$0</p>
            <p>${item.amount}</p>
            <p>Active</p>
          </div>
        ))}
      </div>
    </>
  );
}
export default Form;