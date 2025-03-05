const express = require("express");
const { signup, login, getUsers, getUserById, updateUser, deleteUser } = require("../controllers/authController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// ✅ Only admin can see all users
router.get("/users", authMiddleware, adminMiddleware, getUsers);

// ✅ Normal users can get/update their own profile
router.get("/users/:id", authMiddleware, getUserById);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
