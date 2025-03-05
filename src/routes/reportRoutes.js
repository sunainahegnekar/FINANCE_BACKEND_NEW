const express = require("express");
const { getExpenseReport, getIncomeReport } = require("../controllers/reportController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/expenses", authMiddleware, getExpenseReport);
router.get("/incomes", authMiddleware, getIncomeReport);

module.exports = router;
