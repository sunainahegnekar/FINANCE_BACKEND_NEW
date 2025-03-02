const Income = require('../models/Income');

const addIncome = async (req, res) => {
    try {
        const { source, amount } = req.body;
        const income = await Income.create({ user: req.user.id, source, amount });
        res.json(income);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getIncome = async (req, res) => {
    try {
        const income = await Income.find({ user: req.user.id });
        res.json(income);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { addIncome, getIncome };
