const express = require("express");
const {
  createIncome,
  getIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomeController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createIncome);
router.get("/", authMiddleware, getIncomes);
router.get("/:id", authMiddleware, getIncomeById);
router.put("/:id", authMiddleware, updateIncome);
router.delete("/:id", authMiddleware, deleteIncome);

module.exports = router;
