import TaxRecord from '../models/TaxRecord.js';

export const calculateTax = async (req, res) => {
  try {
    const { userId, taxYear, regime, income, deductions } = req.body;

    // Net taxable income = annualGross - total deductions
    const totalDeductions =
      (deductions.section80C || 0) +
      (deductions.section80D || 0) +
      (deductions.homeLoanInterest || 0) +
      (deductions.otherDeductions || 0);

    const netIncome = income.annualGross - totalDeductions;

    // Simple tax logic (example: 20% flat rate for now)
    const taxAmount = netIncome * 0.2;

    const record = new TaxRecord({
      userId,
      taxYear,
      regime,
      income,
      deductions,
      taxAmount
    });

    await record.save();

    res.json({ message: 'Tax calculated successfully', record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const records = await TaxRecord.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};