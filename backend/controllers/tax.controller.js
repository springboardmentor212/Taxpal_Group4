import TaxRecord from "../models/TaxRecord.js";

export const calculateTax = async (req, res) => {
  try {
    const { userId, taxYear, regime, income, deductions = {} } = req.body;

    const totalDeductions =
      (deductions.section80C || 0) +
      (deductions.section80D || 0) +
      (deductions.homeLoanInterest || 0) +
      (deductions.otherDeductions || 0);

    const gross = income?.annualGross || 0;
    const netIncome = Math.max(gross - totalDeductions, 0);

    const taxAmount = Math.round(netIncome * 0.2);

    const record = await TaxRecord.create({
      userId,
      taxYear,
      regime,
      income,
      deductions,
      taxAmount
    });

    res.json({
      success: true,
      taxAmount,
      record
    });
  } catch (error) {
    console.error("Tax calculation failed:", error);
    res.status(500).json({ success: false, message: "Tax calculation failed" });
  }
};

export const getHistory = async (req, res) => {
  try {
    const { userId } = req.query;

    const filter = userId ? { userId } : {};

    const records = await TaxRecord.find(filter)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      records
    });
  } catch (error) {
    console.error("Failed to fetch tax history:", error);
    res.status(500).json({ success: false, message: "Failed to fetch history" });
  }
};
