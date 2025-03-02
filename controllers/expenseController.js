const Expense = require('../models/Expense');

const addExpense = async (req, res) => {
    try {
        const { title, amount, category } = req.body;
        const expense = await Expense.create({ user: req.user.id, title, amount, category });
        res.json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id });
        res.json(expenses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { addExpense, getExpenses };
