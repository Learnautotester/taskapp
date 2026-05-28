const express =require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const app=express();
const authMiddleware = require("./middleware/authMiddleware");
const taskRoutes = require("./routes/taskRoutes");
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});


app.get("/api/protected", authMiddleware, (req, res) => {

  res.json({
    message: "Protected route accessed",
    user: req.user,
  });

});

module.exports = app;