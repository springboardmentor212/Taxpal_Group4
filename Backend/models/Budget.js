const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    month: { type: String, required: true },
    description: String,
    spent: { type: Number, default: 0 },
    status: { type: String, default: "On Track" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema);
