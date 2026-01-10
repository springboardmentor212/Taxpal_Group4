
 //India Tax Calculation Service

const INDIA_TAX_BRACKETS = [
  { min: 0, max: 300000, rate: 0.0 },
  { min: 300000, max: 700000, rate: 0.05 },
  { min: 700000, max: 1000000, rate: 0.10 },
  { min: 1000000, max: 1200000, rate: 0.15 },
  { min: 1200000, max: 1500000, rate: 0.20 },
  { min: 1500000, max: Infinity, rate: 0.30 }
];

const STANDARD_DEDUCTION_INDIA = 50000; // Salaried taxpayers

function calculateIndiaIncomeTax(taxableIncome) {
  let tax = 0;
  let remaining = taxableIncome;

  for (const b of INDIA_TAX_BRACKETS) {
    if (remaining <= 0) break;

    const bracketSize =
      b.max === Infinity ? remaining : b.max - b.min;

    const taxableAmount = Math.min(remaining, bracketSize);

    tax += taxableAmount * b.rate;
    remaining -= taxableAmount;
  }

  // 4% Health & Education Cess
  const cess = tax * 0.04;

  return {
    base_tax: Math.round(tax * 100) / 100,
    cess: Math.round(cess * 100) / 100,
    total_tax: Math.round((tax + cess) * 100) / 100
  };
}

function calculateTotalDeductionsIndia(d = {}) {
  // New regime disallows most deductions — only standard deduction
  const standard = STANDARD_DEDUCTION_INDIA;
  return standard;
}

export function calculateEstimatedTaxIndia(params) {
  const { gross_income = 0, country = "India" } = params;

  const totalDeductions = calculateTotalDeductionsIndia(params.deductions);
  const taxableIncome = Math.max(0, gross_income - totalDeductions);

  const taxResult = calculateIndiaIncomeTax(taxableIncome);

  return {
    country,
    gross_income,
    standard_deduction: totalDeductions,
    taxable_income: Math.round(taxableIncome * 100) / 100,
    base_tax: taxResult.base_tax,
    cess: taxResult.cess,
    estimated_tax: taxResult.total_tax,
    breakdown: {
      regime: "New Tax Regime (India)",
      used_standard_deduction: true
    }
  };
}

// Quarterly advance-tax schedule (India)
export function getQuarterlyPaymentDatesIndia(year) {
  return {
    Q1: { reminder: new Date(year, 5, 1), due: new Date(year, 5, 15) },   // June 15
    Q2: { reminder: new Date(year, 8, 1), due: new Date(year, 8, 15) },   // Sept 15
    Q3: { reminder: new Date(year, 11, 1), due: new Date(year, 11, 15) }, // Dec 15
    Q4: { reminder: new Date(year + 1, 2, 1), due: new Date(year + 1, 2, 15) } // Mar 15
  };
}
