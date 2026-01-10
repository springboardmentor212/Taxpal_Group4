import { useState } from "react";
import API from "../api/api";
import TaxCalendar from "../components/TaxCalendar";
import Sidebar from "../components/Sidebar";
import TaxSummary from "../components/TaxSummary";

const TaxEstimator = () => {
  const [form, setForm] = useState({
    country: "India",
    filing_status: "Single",
    quarter: "Q1",
    year: 2025,
    gross_income: "",
    deductions: {
      business_expenses: "",
      retirement_contributions: "",
      health_insurance_premiums: "",
      home_office_deduction: ""
    }
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("deductions.")) {
      const key = name.split(".")[1];
      setForm({
        ...form,
        deductions: {
          ...form.deductions,
          [key]: value
        }
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCalculate = async () => {
    try {
      setLoading(true);
      setResult(null);

      const response = await API.post("/tax/estimates/calculate", {
        user_id: "demo-user-id",
        country: form.country,
        filing_status: form.filing_status,
        quarter: form.quarter,
        year: form.year,
        gross_income: Number(form.gross_income)*4,
        deductions: {
          business_expenses: Number(form.deductions.business_expenses || 0),
          retirement_contributions: Number(form.deductions.retirement_contributions || 0),
          health_insurance_premiums: Number(form.deductions.health_insurance_premiums || 0),
          home_office_deduction: Number(form.deductions.home_office_deduction || 0)
        }
      });

      setResult(response.data.calculation);
    } catch (error) {
      console.error("Tax calculation failed", error);
      alert("Failed to calculate tax. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64 p-10 grid grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="col-span-2 bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-6">Tax Estimator</h2>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option>India</option>
            </select>

            <select
              name="filing_status"
              value={form.filing_status}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option>Single</option>
              <option>Married Filing Jointly</option>
              <option>Married Filing Separately</option>
              <option>Individual</option>
            </select>

            <select
              name="quarter"
              value={form.quarter}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option>Q1</option>
              <option>Q2</option>
              <option>Q3</option>
              <option>Q4</option>
            </select>

            <input
              type="number"
              name="gross_income"
              value={form.gross_income}
              onChange={handleChange}
              placeholder="Gross Income for Quarter"
              className="border p-2 rounded"
            />
          </div>

          {/* Deductions */}
          <h3 className="font-semibold mb-3">Deductions</h3>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="deductions.business_expenses"
              placeholder="Business Expenses"
              value={form.deductions.business_expenses}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="number"
              name="deductions.retirement_contributions"
              placeholder="Retirement Contributions"
              value={form.deductions.retirement_contributions}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="number"
              name="deductions.health_insurance_premiums"
              placeholder="Health Insurance Premiums"
              value={form.deductions.health_insurance_premiums}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="number"
              name="deductions.home_office_deduction"
              placeholder="Home Office Deduction"
              value={form.deductions.home_office_deduction}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <button
  onClick={handleCalculate}
  disabled={loading}
  className={`mt-6 px-6 py-2 rounded text-white font-medium
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
  `}
>
  {loading ? "Calculating..." : "Calculate Estimated Tax"}
</button>

        </div>

        {/* Summary Section */}
        <TaxSummary result={result} loading={loading} />
        <div className="col-span-3 mt-16 border-t pt-10">
  <TaxCalendar />
</div>

      </div>
    </div>
  );
};

export default TaxEstimator;
