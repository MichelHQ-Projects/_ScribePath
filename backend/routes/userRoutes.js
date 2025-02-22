const express = require("express");
const { createUser, updateUser, getUserProfile } = require("../controllers/userController");
const authenticateUser = require("../middlewares/authMiddleware");
const apiLimiter = require("../middlewares/rateLimiterMiddleware");

const router = express.Router();

// Protected Routes
router.post("/register", apiLimiter, createUser);
router.put("/update", authenticateUser, apiLimiter, updateUser);
router.get("/profile", authenticateUser, apiLimiter, getUserProfile);

module.exports = router;