const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Using 'user' instead of 'userId' for consistency
    amount: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Salary", "Freelancing", "Investments", "Other"], // Keeping enum validation
      required: true,
    },
    source: { type: String, required: false }, // Optional, in case 'source' is sometimes undefined
    description: { type: String },
    date: { type: Date, default: Date.now, required: true }, // Ensuring date is required
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", incomeSchema);
