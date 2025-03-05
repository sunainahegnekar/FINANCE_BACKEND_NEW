const Expense = require("../models/expenseModel");
const Income = require("../models/incomeModel");

// ✅ Generate Expense Report
exports.getExpenseReport = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Generate Income Report
exports.getIncomeReport = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
