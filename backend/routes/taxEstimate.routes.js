import express from "express";
import {
  calculateQuarterlyTax,
  getUserTaxEstimates,
  getTaxEstimateById,
  getTaxCalendar,
  createTaxReminder,
  updateTaxReminder,
  deleteTaxReminder
} from "../controllers/taxEstimate.controller.js";

const router = express.Router();

// Quarterly tax estimation
router.post("/calculate", calculateQuarterlyTax);

// Get estimates for a user
router.get("/user/:user_id", getUserTaxEstimates);

// Get estimate by record id
router.get("/:id", getTaxEstimateById);

// Tax calendar and reminders
router.get("/calendar/:user_id", getTaxCalendar);
router.post("/reminders", createTaxReminder);
router.put("/reminders/:id", updateTaxReminder);
router.delete("/reminders/:id", deleteTaxReminder);

export default router;
