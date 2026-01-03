import TaxEstimate from "../models/TaxEstimate.js";
import TaxReminder from "../models/TaxReminder.js";
import {
  calculateEstimatedTax,
  getQuarterlyPaymentDates
} from "../services/taxCalculationService.js";

export const calculateQuarterlyTax = async (req, res) => {
  try {
    const {
      user_id,
      quarter,
      year,
      country = "United States",
      state = null,
      filing_status,
      gross_income,
      deductions = {}
    } = req.body;

    if (!user_id || !quarter || !year || !filing_status || gross_income == null) {
      return res.status(400).json({
        error: "Missing required fields: user_id, quarter, year, filing_status, gross_income"
      });
    }

    if (!["Q1", "Q2", "Q3", "Q4"].includes(quarter)) {
      return res.status(400).json({ error: "Invalid quarter" });
    }

    const calc = calculateEstimatedTax({
      gross_income: Math.max(gross_income, 0),
      deductions,
      filing_status,
      country,
      state
    });

    const taxEstimate = await TaxEstimate.findOneAndUpdate(
      { user_id, quarter, year },
      {
        user_id,
        quarter,
        year,
        country,
        state,
        filing_status,
        gross_income,
        deductions,
        taxable_income: calc.taxable_income,
        federal_tax: calc.federal_tax,
        state_tax: calc.state_tax,
        estimated_tax: calc.estimated_tax
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      taxEstimate,
      calculation: calc
    });
  } catch (error) {
    console.error("Error calculating quarterly tax:", error);
    res.status(500).json({ error: "Failed to calculate tax estimate" });
  }
};

export const getUserTaxEstimates = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { year, quarter } = req.query;

    const query = { user_id };
    if (year) query.year = parseInt(year);
    if (quarter) query.quarter = quarter;

    const estimates = await TaxEstimate.find(query)
      .sort({ year: -1, quarter: -1 })
      .lean();

    res.json({
      success: true,
      count: estimates.length,
      estimates
    });
  } catch (error) {
    console.error("Error fetching tax estimates:", error);
    res.status(500).json({ error: "Failed to fetch tax estimates" });
  }
};

export const getTaxEstimateById = async (req, res) => {
  try {
    const estimate = await TaxEstimate.findById(req.params.id);

    if (!estimate) {
      return res.status(404).json({ error: "Tax estimate not found" });
    }

    res.json(estimate);
  } catch (error) {
    console.error("Error fetching tax estimate:", error);
    res.status(500).json({ error: "Failed to fetch tax estimate" });
  }
};

export const getTaxCalendar = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { year } = req.query;

    const currentYear = year ? parseInt(year) : new Date().getFullYear();

    const existing = await TaxReminder.find({
      user_id,
      date: {
        $gte: new Date(currentYear, 0, 1),
        $lt: new Date(currentYear + 1, 0, 1)
      }
    }).sort({ date: 1 });

    const paymentDates = getQuarterlyPaymentDates(currentYear);
    const events = [];

    existing.forEach(r => {
      events.push({
        id: r._id,
        title: r.title,
        description: r.description,
        date: r.date,
        type: r.type,
        quarter: r.quarter,
        year: r.year,
        is_completed: r.is_completed
      });
    });

    Object.keys(paymentDates).forEach(q => {
      const dates = paymentDates[q];

      const hasReminder = existing.some(r => r.quarter === q && r.type === "reminder");
      const hasPayment = existing.some(r => r.quarter === q && r.type === "payment");

      if (!hasReminder) {
        events.push({
          id: `default-reminder-${q}`,
          title: `Reminder: ${q} Estimated Tax Payment`,
          description: `Reminder for upcoming ${q} estimated tax payment.`,
          date: dates.reminder,
          type: "reminder",
          quarter: q,
          year: currentYear,
          is_completed: false
        });
      }

      if (!hasPayment) {
        events.push({
          id: `default-payment-${q}`,
          title: `${q} Estimated Tax Payment`,
          description: `${q} estimated tax payment due`,
          date: dates.due,
          type: "payment",
          quarter: q,
          year: currentYear,
          is_completed: false
        });
      }
    });

    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({
      success: true,
      year: currentYear,
      events
    });
  } catch (error) {
    console.error("Error fetching tax calendar:", error);
    res.status(500).json({ error: "Failed to fetch tax calendar" });
  }
};

export const createTaxReminder = async (req, res) => {
  try {
    const { user_id, title, description, date, type, quarter, year } = req.body;

    if (!user_id || !title || !description || !date) {
      return res.status(400).json({
        error: "Missing required fields: user_id, title, description, date"
      });
    }

    const reminder = await TaxReminder.create({
      user_id,
      title,
      description,
      date: new Date(date),
      type: type || "reminder",
      quarter: quarter || null,
      year: year || null,
      is_completed: false
    });

    res.status(201).json({
      success: true,
      reminder
    });
  } catch (error) {
    console.error("Error creating tax reminder:", error);
    res.status(500).json({ error: "Failed to create tax reminder" });
  }
};

export const updateTaxReminder = async (req, res) => {
  try {
    const reminder = await TaxReminder.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!reminder) {
      return res.status(404).json({ error: "Tax reminder not found" });
    }

    res.json({
      success: true,
      reminder
    });
  } catch (error) {
    console.error("Error updating tax reminder:", error);
    res.status(500).json({ error: "Failed to update tax reminder" });
  }
};

export const deleteTaxReminder = async (req, res) => {
  try {
    const reminder = await TaxReminder.findByIdAndDelete(req.params.id);

    if (!reminder) {
      return res.status(404).json({ error: "Tax reminder not found" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting tax reminder:", error);
    res.status(500).json({ error: "Failed to delete tax reminder" });
  }
};
