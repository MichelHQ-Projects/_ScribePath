const express = require("express");
const authenticateUser = require("../middlewares/authMiddleware");
const {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
} = require("../controllers/noteController");

const router = express.Router();

// ✅ Route Definitions (Ensure users can only access their own notes)
router.post("/", authenticateUser, createNote);
router.get("/", authenticateUser, getNotes);
router.get("/:id", authenticateUser, getNoteById);
router.put("/:id", authenticateUser, updateNote);
router.delete("/:id", authenticateUser, deleteNote);

module.exports = router;
