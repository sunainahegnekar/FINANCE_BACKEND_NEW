const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

dotenv.config();
const app = express();

// ✅ Configure CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Update with frontend URL
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json()); // Parse JSON requests
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static uploads

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// ✅ Example Route
app.get("/", (req, res) => {
  res.send("CORS is working!");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((error) => console.log("❌ MongoDB connection error:", error));