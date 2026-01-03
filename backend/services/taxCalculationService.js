/**
 * Tax Calculation Service
 * Handles estimated tax calculations and quarterly schedules
 */

// Federal brackets (US – 2024)
const FEDERAL_TAX_BRACKETS = {
  Single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 }
  ],

  "Married Filing Jointly": [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 }
  ],

  "Married Filing Separately": [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 365600, rate: 0.35 },
    { min: 365600, max: Infinity, rate: 0.37 }
  ],

  "Head of Household": [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191950, rate: 0.24 },
    { min: 191950, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 }
  ]
};

const STANDARD_DEDUCTIONS = {
  Single: 14600,
  "Married Filing Jointly": 29200,
  "Married Filing Separately": 14600,
  "Head of Household": 21900
};

// Simplified flat/state rates
const STATE_TAX_RATES = {
  California: { rate: 0.013, type: "progressive" },
  "New York": { rate: 0.083, type: "progressive" },
  Texas: { rate: 0, type: "none" },
  Florida: { rate: 0, type: "none" },
  Illinois: { rate: 0.0495, type: "flat" },
  Pennsylvania: { rate: 0.0307, type: "flat" },
  Ohio: { rate: 0.0345, type: "progressive" },
  Georgia: { rate: 0.0575, type: "progressive" },
  "North Carolina": { rate: 0.0499, type: "flat" },
  Michigan: { rate: 0.0425, type: "flat" }
};

function calculateFederalTax(taxableIncome, filingStatus) {
  const brackets = FEDERAL_TAX_BRACKETS[filingStatus];
  if (!brackets) throw new Error(`Invalid filing status: ${filingStatus}`);

  let tax = 0;
  let remaining = taxableIncome;

  for (const b of brackets) {
    if (remaining <= 0) break;

    const bracketSize =
      b.max === Infinity ? remaining : b.max - b.min;

    const taxableAmount = Math.min(remaining, bracketSize);

    tax += taxableAmount * b.rate;
    remaining -= taxableAmount;
  }

  return Math.round(tax * 100) / 100;
}

function calculateStateTax(taxableIncome, state) {
  if (!state || !STATE_TAX_RATES[state]) return 0;

  const info = STATE_TAX_RATES[state];
  if (info.type === "none" || info.rate === 0) return 0;

  const tax = taxableIncome * info.rate;
  return Math.round(tax * 100) / 100;
}

function calculateTotalDeductions(d) {
  return (
    (d.business_expenses || 0) +
    (d.retirement_contributions || 0) +
    (d.health_insurance_premiums || 0) +
    (d.home_office_deduction || 0)
  );
}

export function calculateEstimatedTax(params) {
  const {
    gross_income,
    deductions = {},
    filing_status,
    country = "United States",
    state = null
  } = params;

  const itemized = calculateTotalDeductions(deductions);
  const standard = STANDARD_DEDUCTIONS[filing_status] || 14600;

  const totalDeductions = Math.max(standard, itemized);
  const taxableIncome = Math.max(0, gross_income - totalDeductions);

  const federalTax = calculateFederalTax(taxableIncome, filing_status);
  const stateTax = calculateStateTax(taxableIncome, state);

  const estimatedTax = federalTax + stateTax;

  return {
    gross_income,
    total_deductions: totalDeductions,
    itemized_deductions: itemized,
    standard_deduction: standard,
    taxable_income: Math.round(taxableIncome * 100) / 100,
    federal_tax: federalTax,
    state_tax: stateTax,
    estimated_tax: Math.round(estimatedTax * 100) / 100,
    breakdown: {
      used_standard_deduction: totalDeductions === standard
    }
  };
}

export function getQuarterlyPaymentDates(year) {
  return {
    Q1: { reminder: new Date(year, 2, 1), due: new Date(year, 3, 15) },
    Q2: { reminder: new Date(year, 5, 1), due: new Date(year, 5, 15) },
    Q3: { reminder: new Date(year, 8, 1), due: new Date(year, 8, 15) },
    Q4: { reminder: new Date(year, 11, 1), due: new Date(year + 1, 0, 15) }
  };
}
