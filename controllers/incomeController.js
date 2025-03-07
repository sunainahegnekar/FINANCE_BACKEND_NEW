const Income = require("../models/incomeModel");

// ✅ Create Income
exports.createIncome = async (req, res) => {
  try {
    const { amount, category, source, description, date } = req.body;

    // Validate input fields
    if (!amount || !category || !source || !date) {
      return res.status(400).json({ message: "Amount, category, source, and date are required" });
    }

    const newIncome = new Income({
      user: req.user.id,
      amount,
      category,
      source,
      description,
      date,
    });

    await newIncome.save();
    res.status(201).json({ message: "Income added successfully", income: newIncome });
  } catch (error) {
    console.error("❌ Error creating income:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get All Incomes (Sorted by Date)
exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).sort({ date: -1 });

    if (!incomes.length) {
      return res.status(404).json({ message: "No income records found" });
    }

    res.status(200).json(incomes);
  } catch (error) {
    console.error("❌ Error fetching incomes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get Single Income by ID
exports.getIncomeById = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    if (income.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: You cannot access this income" });
    }

    res.status(200).json(income);
  } catch (error) {
    console.error("❌ Error fetching income:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Update Income
exports.updateIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    if (income.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: You cannot update this income" });
    }

    // Update only provided fields
    if (req.body.amount) income.amount = req.body.amount;
    if (req.body.category) income.category = req.body.category;
    if (req.body.source) income.source = req.body.source;
    if (req.body.description) income.description = req.body.description;
    if (req.body.date) income.date = req.body.date;

    await income.save();
    res.status(200).json({ message: "Income updated successfully", income });
  } catch (error) {
    console.error("❌ Error updating income:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete Income
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    if (income.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: You cannot delete this income" });
    }

    await income.deleteOne();
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting income:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
