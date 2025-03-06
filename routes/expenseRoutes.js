const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Multer Configuration (Uploads folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// ✅ Create an expense (with optional receipt upload)
router.post("/", authMiddleware, upload.single("receipt"), createExpense);

// ✅ Get all expenses
router.get("/", authMiddleware, getExpenses);

// ✅ Get a single expense by ID
router.get("/:id", authMiddleware, getExpenseById);

// ✅ Update an expense by ID
router.put("/:id", authMiddleware, updateExpense);

// ✅ Delete an expense by ID
router.delete("/:id", authMiddleware, deleteExpense);

module.exports = router;
