const express = require("express");
const { getExpenseReport, getIncomeReport, getFinancialReport } = require("../controllers/reportController");
const authMiddleware = require("../middlewares/authMiddleware"); // Fixed import path

const router = express.Router();

// ✅ Fetch expense report (Protected)
router.get("/expenses", authMiddleware, getExpenseReport);

// ✅ Fetch income report (Protected)
router.get("/incomes", authMiddleware, getIncomeReport);

// ✅ Fetch financial overview report (Protected)
router.get("/financial", authMiddleware, getFinancialReport);

module.exports = router;
