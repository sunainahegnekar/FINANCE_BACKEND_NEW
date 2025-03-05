const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    source: { type: String, required: true }, // Keeping 'source' from the first schema
    category: {
      type: String,
      enum: ["Salary", "Freelancing", "Investments", "Other"],
      required: true,
    },
    description: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", incomeSchema);
