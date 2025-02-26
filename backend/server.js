const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const apiLimiter = require("./middlewares/rateLimiterMiddleware");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(apiLimiter); // Apply rate limiting globally

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

  // Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));

  app.get("/", (req, res) => {
  res.send("ScribePath API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});