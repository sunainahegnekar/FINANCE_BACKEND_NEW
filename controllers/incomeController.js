const Income = require("../models/incomeModel");

// ✅ Create Income
exports.createIncome = async (req, res) => {
  try {
    const { amount, category, source, description, date } = req.body;
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Incomes (Sorted by date)
exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get Single Income by ID
exports.getIncomeById = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income || income.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Income
exports.updateIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income || income.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Income not found" });
    }
    
    Object.assign(income, req.body);
    await income.save();

    res.status(200).json({ message: "Income updated successfully", income });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete Income
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income || income.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Income not found" });
    }

    await income.deleteOne();
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
