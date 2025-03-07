const Expense = require("../models/expenseModel");

// ✅ Create Expense
exports.createExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;

    if (!title || !amount || !category || !date) {
      return res.status(400).json({ message: "All fields (title, amount, category, date) are required" });
    }

    const receipt = req.file ? req.file.path : null;

    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      description,
      date,
      receipt,
    });

    res.status(201).json({ message: "Expense created successfully", expense });
  } catch (error) {
    console.error("❌ Error creating expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get All Expenses for User
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });

    if (!expenses.length) {
      return res.status(404).json({ message: "No expenses found" });
    }

    res.status(200).json(expenses);
  } catch (error) {
    console.error("❌ Error fetching expenses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get Single Expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: You cannot access this expense" });
    }

    res.status(200).json(expense);
  } catch (error) {
    console.error("❌ Error fetching expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Update Expense
exports.updateExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: You cannot update this expense" });
    }

    if (title) expense.title = title;
    if (amount) expense.amount = amount;
    if (category) expense.category = category;
    if (description) expense.description = description;
    if (date) expense.date = date;
    if (req.file) {
      expense.receipt = req.file.path;
    }

    await expense.save();
    res.status(200).json({ message: "Expense updated successfully", expense });
  } catch (error) {
    console.error("❌ Error updating expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: You cannot delete this expense" });
    }

    await expense.deleteOne();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Add New Expense (Redundant, Same as createExpense)
exports.addExpense = exports.createExpense;

// ✅ Correct Export
// ✅ Correct Export
module.exports = {
  createExpense: exports.createExpense,  // Ensures createExpense is properly referenced
  getExpenses: exports.getExpenses,
  getExpenseById: exports.getExpenseById,
  updateExpense: exports.updateExpense,
  deleteExpense: exports.deleteExpense
};
