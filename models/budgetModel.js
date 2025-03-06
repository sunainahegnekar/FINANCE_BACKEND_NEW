const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  monthlyBudget: { type: Number, required: true },
  yearlyBudget: { type: Number, required: true },
  savingsGoal: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Budget", budgetSchema);
