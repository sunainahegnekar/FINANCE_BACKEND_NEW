const Expense = require("../models/expenseModel");
const Income = require("../models/incomeModel");

// ✅ Generate Expense Report
const getExpenseReport = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const expenses = await Expense.find({ user: req.user.id });

    if (!expenses.length) {
      return res.status(404).json({ message: "No expenses found" });
    }

    const totalAmount = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);

    res.status(200).json({ totalExpenses: expenses.length, totalAmount });
  } catch (error) {
    console.error("❌ Error generating expense report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Generate Income Report
const getIncomeReport = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const incomes = await Income.find({ user: req.user.id });

    if (!incomes.length) {
      return res.status(404).json({ message: "No income records found" });
    }

    const totalAmount = incomes.reduce((sum, income) => sum + (income.amount || 0), 0);

    res.status(200).json({ totalIncomes: incomes.length, totalAmount });
  } catch (error) {
    console.error("❌ Error generating income report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Generate Financial Overview Report (Income vs Expenses)
const getFinancialReport = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const incomes = await Income.find({ user: req.user.id });
    const expenses = await Expense.find({ user: req.user.id });

    if (!incomes.length && !expenses.length) {
      return res.status(404).json({ message: "No financial data available" });
    }

    // Aggregate data by month
    const reportData = { incomes: {}, expenses: {} };

    incomes.forEach((income) => {
      if (!income.date) return;
      const month = income.date.toISOString().slice(0, 7); // Format: YYYY-MM
      reportData.incomes[month] = (reportData.incomes[month] || 0) + (income.amount || 0);
    });

    expenses.forEach((expense) => {
      if (!expense.date) return;
      const month = expense.date.toISOString().slice(0, 7);
      reportData.expenses[month] = (reportData.expenses[month] || 0) + (expense.amount || 0);
    });

    res.status(200).json(reportData);
  } catch (error) {
    console.error("❌ Error generating financial report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getExpenseReport,
  getIncomeReport,
  getFinancialReport,
};
