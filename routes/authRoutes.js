const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getMe,
} = require("../controllers/authController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Authentication Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ User Profile Routes
router.get("/me", authMiddleware, getMe); // Protected route for logged-in users
router.get("/users/:id", authMiddleware, getUserById);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

// ✅ Admin Routes
router.get("/users", authMiddleware, adminMiddleware, getUsers);

module.exports = router;
