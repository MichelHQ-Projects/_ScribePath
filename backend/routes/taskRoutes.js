const express = require("express");
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require("../controllers/taskController");
const authenticateUser = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Protected Routes (Require Authentication)
router.post("/", authenticateUser, createTask);
router.get("/", authenticateUser, getTasks);
router.get("/:id", authenticateUser, getTaskById);
router.put("/:id", authenticateUser, updateTask);
router.delete("/:id", authenticateUser, deleteTask);

module.exports = router;