import mongoose from "mongoose";

const taxEstimateSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true
    },

    quarter: {
      type: String,
      enum: ["Q1", "Q2", "Q3", "Q4"],
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    country: {
      type: String,
      default: "United States"
    },

    state: {
      type: String
    },

    filing_status: {
      type: String,
      enum: [
        "Single",
        "Married Filing Jointly",
        "Married Filing Separately",
        "Head of Household"
      ],
      required: true
    },

    gross_income: {
      type: Number,
      min: 0,
      required: true
    },

    deductions: {
      business_expenses: { type: Number, default: 0 },
      retirement_contributions: { type: Number, default: 0 },
      health_insurance_premiums: { type: Number, default: 0 },
      home_office_deduction: { type: Number, default: 0 }
    },

    taxable_income: {
      type: Number,
      min: 0,
      required: true
    },

    federal_tax: {
      type: Number,
      min: 0,
      required: true
    },

    state_tax: {
      type: Number,
      min: 0,
      default: 0
    },

    estimated_tax: {
      type: Number,
      min: 0,
      required: true
    }
  },
  { timestamps: true }
);

taxEstimateSchema.index({ user_id: 1, quarter: 1, year: 1 }, { unique: true });

const TaxEstimate = mongoose.model("TaxEstimate", taxEstimateSchema);

export default TaxEstimate;
