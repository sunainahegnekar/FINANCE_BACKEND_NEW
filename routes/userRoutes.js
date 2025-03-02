const express = require("express");
const { registerUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/register", registerUser);

// Example of a protected route
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
