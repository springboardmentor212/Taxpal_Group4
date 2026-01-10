import TaxReminder from "../models/TaxReminder.js";
import { getQuarterlyPaymentDatesIndia } from "../services/taxCalculationService.js";

/* ===============================
   GET TAX CALENDAR
================================ */
export const getTaxCalendar = async (req, res) => {
  try {
    const { user_id } = req.params;
    const year = parseInt(req.query.year);

    const start = new Date(year, 0, 1);
    const end = new Date(year + 1, 0, 1);

    // 🔥 FETCH CUSTOM REMINDERS
    const existing = await TaxReminder.find({
      user_id,
      date: { $gte: start, $lt: end },
    }).sort({ date: 1 });

    const paymentDates = getQuarterlyPaymentDatesIndia(year);
    const events = [];

    // Add DB reminders
    existing.forEach((r) => {
      events.push({
        _id: r._id,
        title: r.title,
        description: r.description,
        date: r.date,
        type: r.type,
        quarter: r.quarter,
        year: r.year,
      });
    });

    // Add system reminders
    Object.keys(paymentDates).forEach((q) => {
      const dates = paymentDates[q];

      const hasReminder = existing.some(
        (r) => r.quarter === q && r.type === "reminder"
      );
      const hasPayment = existing.some(
        (r) => r.quarter === q && r.type === "payment"
      );

      if (!hasReminder) {
        events.push({
          id: `default-reminder-${q}`,
          title: `Reminder: ${q} Estimated Tax`,
          description: `Reminder for upcoming ${q} tax payment.`,
          date: dates.reminder,
          type: "reminder",
          quarter: q,
          year,
        });
      }

      if (!hasPayment) {
        events.push({
          id: `default-payment-${q}`,
          title: `${q} Estimated Tax Payment`,
          description: `${q} estimated tax payment due.`,
          date: dates.due,
          type: "payment",
          quarter: q,
          year,
        });
      }
    });

    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({ success: true, events });
  } catch (error) {
    console.error("Calendar error:", error);
    res.status(500).json({ error: "Failed to fetch calendar" });
  }
};

/* ===============================
   CREATE REMINDER (🔥 FIXED)
================================ */
export const createTaxReminder = async (req, res) => {
  try {
    const { user_id, title, description, date, quarter, year } = req.body;

    const reminder = await TaxReminder.create({
      user_id,
      title,
      description,
      date: new Date(date), // 🔥 CRITICAL FIX
      type: "reminder",
      quarter,
      year,
    });

    res.status(201).json({ success: true, reminder });
  } catch (error) {
    console.error("Create reminder error:", error);
    res.status(500).json({ error: "Failed to create reminder" });
  }
};

/* ===============================
   UPDATE REMINDER
================================ */
export const updateTaxReminder = async (req, res) => {
  try {
    const updated = await TaxReminder.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        date: new Date(req.body.date),
      },
      { new: true }
    );

    res.json({ success: true, reminder: updated });
  } catch (error) {
    console.error("Update reminder error:", error);
    res.status(500).json({ error: "Failed to update reminder" });
  }
};

/* ===============================
   DELETE REMINDER
================================ */
export const deleteTaxReminder = async (req, res) => {
  try {
    await TaxReminder.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("Delete reminder error:", error);
    res.status(500).json({ error: "Failed to delete reminder" });
  }
};

export const calculateQuarterlyTax = async (req, res) => {
  try {
    console.log("CALCULATE TAX HIT", req.body);

    // calculation logic...
    res.status(200).json({
      success: true,
      calculation: {
        taxable_income: 120000,
        base_tax: 5000,
        cess: 200,
        estimated_tax: 5200,
      },
    });
  } catch (err) {
    console.error("Error calculating quarterly tax:", err);
    res.status(500).json({ message: "Tax calculation failed" });
  }
};
