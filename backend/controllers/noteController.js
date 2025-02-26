const Note = require("../models/Note");

/**
 * @desc Create a new note
 * @route POST /api/notes
 * @access Private
 */
const createNote = async (req, res) => {
    try {
        const { title, content, tags, category } = req.body;
        
        // Validate input
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        // ✅ Create a new note & assign ownership using Firebase UID
        const note = new Note({
            title,
            content,
            userId: req.user.uid, // ✅ Store Firebase UID (not MongoDB _id)
            tags,
            category,
        });

        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * @desc Get all notes for the logged-in user
 * @route GET /api/notes
 * @access Private
 */
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.uid, trashed: false }); // ✅ Only return user's notes
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * @desc Get a single note by ID (only if owned by the user)
 * @route GET /api/notes/:id
 * @access Private
 */
const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.user.uid }); // ✅ Ensure ownership
        if (!note) return res.status(404).json({ message: "Note not found" });

        res.json(note);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * @desc Update a note (Only if user owns it)
 * @route PUT /api/notes/:id
 * @access Private
 */
const updateNote = async (req, res) => {
    try {
        const { title, content, tags, category } = req.body;

        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.uid }, // ✅ Ensure ownership
            { title, content, tags, category },
            { new: true }
        );

        if (!note) return res.status(404).json({ message: "Note not found" });

        res.json(note);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * @desc Delete a note (Soft delete - move to trash)
 * @route DELETE /api/notes/:id
 * @access Private
 */
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.uid }, // ✅ Ensure ownership
            { trashed: true },
            { new: true }
        );

        if (!note) return res.status(404).json({ message: "Note not found" });

        res.json({ message: "Note moved to trash" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createNote, getNotes, getNoteById, updateNote, deleteNote };
