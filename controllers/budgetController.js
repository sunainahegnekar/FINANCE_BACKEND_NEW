const Budget = require("../models/budgetModel");
const Expense = require("../models/expenseModel");

// ✅ Set Budget
exports.setBudget = async (req, res) => {
  try {
    const { monthlyBudget, yearlyBudget, savingsGoal } = req.body;
    const budget = new Budget({ user: req.user.id, monthlyBudget, yearlyBudget, savingsGoal });
    await budget.save();

    res.status(201).json({ message: "Budget set successfully", budget });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get Budget
exports.getBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({ user: req.user.id });
    if (!budget) return res.status(404).json({ message: "Budget not set" });

    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
