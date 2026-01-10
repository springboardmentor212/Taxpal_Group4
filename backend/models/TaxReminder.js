import mongoose from "mongoose";

const taxReminderSchema = new mongoose.Schema(
  {
    user_id: {
      type: String, // keep STRING for demo-user-id
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    type: {
      type: String,
      enum: ["reminder", "payment"],
      default: "reminder",
    },

    quarter: {
      type: String,
      enum: ["Q1", "Q2", "Q3", "Q4"],
    },

    year: {
      type: Number,
    },

    is_completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TaxReminder", taxReminderSchema);
