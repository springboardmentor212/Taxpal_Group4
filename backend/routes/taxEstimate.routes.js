import express from "express";
import {
  calculateQuarterlyTax,
  getTaxCalendar,
  createTaxReminder,
  updateTaxReminder,
  deleteTaxReminder,
} from "../controllers/taxEstimate.controller.js";

const router = express.Router();

// 🔹 TAX CALCULATION (THIS WAS MISSING)
router.post("/calculate", calculateQuarterlyTax);

// 🔹 CALENDAR + REMINDERS
router.get("/calendar/:user_id", getTaxCalendar);
router.post("/reminders", createTaxReminder);
router.put("/reminders/:id", updateTaxReminder);
router.delete("/reminders/:id", deleteTaxReminder);

export default router;
