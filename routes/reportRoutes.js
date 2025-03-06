const express = require("express");
const { getExpenseReport, getIncomeReport, getFinancialReport } = require("../controllers/reportController");
const { authMiddleware } = require("../middleware/authMiddleware"); // Ensure this middleware is correctly implemented

const router = express.Router();

// ✅ Route to fetch expense report
router.get("/expenses", authMiddleware, getExpenseReport);

// ✅ Route to fetch income report
router.get("/incomes", authMiddleware, getIncomeReport);

// ✅ Route to fetch financial overview (income vs. expenses)
router.get("/financial", authMiddleware, getFinancialReport);

module.exports = router;
