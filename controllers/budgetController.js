const Budget = require("../models/budgetModel");

// ✅ Set Budget
exports.setBudget = async (req, res) => {
  try {
    const { monthlyBudget, yearlyBudget, savingsGoal } = req.body;

    // Validate input fields
    if (!monthlyBudget || !yearlyBudget || !savingsGoal) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if budget already exists
    const existingBudget = await Budget.findOne({ user: req.user.id });
    if (existingBudget) {
      return res.status(400).json({ message: "Budget already set. Please update instead." });
    }

    // Create and save budget
    const budget = new Budget({ user: req.user.id, monthlyBudget, yearlyBudget, savingsGoal });
    await budget.save();

    res.status(201).json({ message: "Budget set successfully", budget });
  } catch (error) {
    console.error("❌ Error setting budget:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get Budget
exports.getBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({ user: req.user.id });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found. Please set your budget first." });
    }

    res.status(200).json(budget);
  } catch (error) {
    console.error("❌ Error fetching budget:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Update Budget
exports.updateBudget = async (req, res) => {
  try {
    const { monthlyBudget, yearlyBudget, savingsGoal } = req.body;

    // Validate input fields
    if (!monthlyBudget || !yearlyBudget || !savingsGoal) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const budget = await Budget.findOneAndUpdate(
      { user: req.user.id },
      { monthlyBudget, yearlyBudget, savingsGoal },
      { new: true, runValidators: true }
    );

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json({ message: "Budget updated successfully", budget });
  } catch (error) {
    console.error("❌ Error updating budget:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete Budget
exports.deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({ user: req.user.id });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting budget:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
