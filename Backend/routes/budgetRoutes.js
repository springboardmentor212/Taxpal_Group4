const express = require("express");
const router = express.Router();

const {
  getBudgets,
  createBudget,
  deleteBudget,
  updateBudget,
} = require("../controllers/budgetController");

router.get("/", getBudgets);
router.post("/", createBudget);
router.put("/:id", updateBudget);
router.delete("/:id", deleteBudget);

module.exports = router;
