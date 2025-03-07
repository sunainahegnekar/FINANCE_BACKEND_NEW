const express = require("express");
const { setBudget, getBudget } = require("../controllers/budgetController");
const authMiddleware = require("../middlewares/authMiddleware"); // Fixed import path

const router = express.Router();

// ✅ Set or update budget (Protected)
router.post("/", authMiddleware, setBudget);

// ✅ Get budget details (Protected)
router.get("/", authMiddleware, getBudget);

module.exports = router;
