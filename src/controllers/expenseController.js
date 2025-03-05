const Expense = require("../models/expenseModel");

exports.createExpense = async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const receipt = req.file ? req.file.path : null; // Get the uploaded file path if available

    const expense = await Expense.create({
      user: req.user.id,
      amount,
      category,
      description,
      receipt, // Save receipt path in DB
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense || expense.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense || expense.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Update fields if provided
    expense.amount = req.body.amount || expense.amount;
    expense.category = req.body.category || expense.category;
    expense.description = req.body.description || expense.description;
    if (req.file) {
      expense.receipt = req.file.path; // Update receipt if new file is uploaded
    }

    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense || expense.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Expense not found" });
    }
    await expense.remove();
    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
