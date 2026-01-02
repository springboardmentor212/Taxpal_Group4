import mongoose from 'mongoose';

const taxRecordSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  taxYear: {
    type: String,
    required: true
  },
  regime: {
    type: String,
    enum: ['old', 'new'],
    required: true
  },
  income: {
    annualGross: {
      type: Number,
      required: true
    }
  },
  deductions: {
    section80C: { type: Number, default: 0 },
    section80D: { type: Number, default: 0 },
    homeLoanInterest: { type: Number, default: 0 },
    otherDeductions: { type: Number, default: 0 }
  },
  taxAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const TaxRecord = mongoose.model('TaxRecord', taxRecordSchema);

export default TaxRecord;