import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change if your backend port is different
});

// GET all budgets
export const getBudgets = () => API.get("/budgets");

// CREATE new budget
export const createBudget = (data) => API.post("/budgets", data);

// DELETE budget
export const deleteBudget = (id) => API.delete(`/budgets/${id}`);

// UPDATE budget
export const updateBudget = (id, data) =>
  API.put(`/budgets/${id}`, data);

export const addExpense = (id, amount) =>
  API.post(`/budgets/${id}/expense`, { amount });

