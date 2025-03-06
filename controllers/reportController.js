const Expense = require("../models/expenseModel");
const Income = require("../models/incomeModel");

// ✅ Generate Expense Report
const getExpenseReport = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }); 
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    res.json({ totalExpenses: expenses.length, totalAmount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Generate Income Report
const getIncomeReport = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Generate Financial Overview Report (Income vs Expenses)
const getFinancialReport = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id });
    const expenses = await Expense.find({ userId: req.user.id });

    // Aggregate data by month
    const reportData = { incomes: {}, expenses: {} };

    incomes.forEach((income) => {
      const month = income.date.toISOString().slice(0, 7); // Format: YYYY-MM
      reportData.incomes[month] = (reportData.incomes[month] || 0) + income.amount;
    });

    expenses.forEach((expense) => {
      const month = expense.date.toISOString().slice(0, 7);
      reportData.expenses[month] = (reportData.expenses[month] || 0) + expense.amount;
    });

    res.status(200).json(reportData);
  } catch (error) {
    res.status(500).json({ message: "Error generating report", error });
  }
};

module.exports = {
  getExpenseReport,
  getIncomeReport,
  getFinancialReport,
};
