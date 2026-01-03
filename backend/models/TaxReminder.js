import mongoose from "mongoose";

const taxReminderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    type: {
      type: String,
      enum: ["reminder", "payment"],
      default: "reminder"
    },

    quarter: {
      type: String,
      enum: ["Q1", "Q2", "Q3", "Q4"]
    },

    year: {
      type: Number
    },

    is_completed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

taxReminderSchema.index({ user_id: 1, date: 1 });

const TaxReminder = mongoose.model("TaxReminder", taxReminderSchema);

export default TaxReminder;
