const Note = require("../models/Note");

/**
 * @desc Create a new note
 * @route POST /api/notes
 * @access Private
 */

const createNote = async (req, res) => {
    try {
    const { title, content, tags, category } = req.body;
    const userId = req.user._id;

    // Validate user input
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Create a new note
    const note = new Note({
      title,
      content,
      user: req.user._id,
      tags,
      category,
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

/**
 * @desc Get all notes for the logged-in user
 * @route GET /api/notes
 * @access Private
 */

const getNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const notes = await Note.find({ user: userId, trashed: false });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Get a single note by ID
 * @route GET /api/notes/:id
 * @access Private
 */

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note || note.user.toString() !== req.user._id.toString()) {
      res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
    } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * @desc Update a note
 * @route PUT /api/notes/:id
 * @access Private
 */
const updateNote = async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
  
      if (!note || note.user.toString() !== req.user._id.toString()) {
        return res.status(404).json({ message: "Note not found" });
      }
  
      note.title = req.body.title || note.title;
      note.content = req.body.content || note.content;
      note.category = req.body.category || note.category;
      note.tags = req.body.tags || note.tags;
  
      await note.save();
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
      const note = await Note.findById(req.params.id);
  
      if (!note || note.user.toString() !== req.user._id.toString()) {
        return res.status(404).json({ message: "Note not found" });
      }
  
      note.trashed = true;
      await note.save();
  
      res.json({ message: "Note moved to trash" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  module.exports = { createNote, getNotes, getNoteById, updateNote, deleteNote };