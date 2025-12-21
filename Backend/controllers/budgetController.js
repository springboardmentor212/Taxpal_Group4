const Budget = require("../models/Budget");

// GET ALL BUDGETS
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find().sort({ createdAt: -1 });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE BUDGET
exports.createBudget = async (req, res) => {
  try {
    const budget = new Budget(req.body);
    budget.status = "On Track";
    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE BUDGET
exports.deleteBudget = async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: "Budget deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE BUDGET (SPEND / EDIT)
const calculateStatus = (amount, spent) => {
  if (spent > amount) return "Over Budget";
  if (spent >= amount * 0.8) return "At Risk";
  return "On Track";
};

exports.updateBudget = async (req, res) => {
  try {
    const { amount, spentIncrement } = req.body;
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    if (amount !== undefined) {
      budget.amount = amount;
    }

    if (spentIncrement !== undefined) {
      budget.spent = (budget.spent || 0) + spentIncrement;
    }

    budget.status = calculateStatus(budget.amount, budget.spent);

    await budget.save();
    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
