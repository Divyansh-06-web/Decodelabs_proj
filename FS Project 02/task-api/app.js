const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

const app = express();

// --- Global middleware ---
app.use(cors());
app.use(express.json()); // parses incoming JSON request bodies

// --- Health check ---
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Task API is running",
    docs: "/api/tasks",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "success", uptime: process.uptime() });
});

// --- Routes ---
app.use("/api/tasks", taskRoutes);

// --- 404 + error handling (must be last) ---
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
