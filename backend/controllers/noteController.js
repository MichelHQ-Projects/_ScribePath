const Note = require("../models/Note");

/**
 * @desc Create a new note
 * @route POST /api/notes
 * @access Private
 */
const createNote = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.user);
        const { title, content, tags, category, imageUrl } = req.body;
        
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
            imageUrl: null, // ✅ Initialize image URL to null
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
        const { title, content, tags, category, imageUrl } = req.body;
        const existingNote = await Note.findOne({ _id: req.params.id, userId: req.user.uid });

        if (!existingNote) return res.status(404).json({ message: "Note not found" });

         // ✅ If a new image is provided, delete the old one from S3
         if (imageUrl && existingNote.imageUrl && existingNote.imageUrl !== imageUrl) {
            await deleteImageFromS3(existingNote.imageUrl);
        }

         // ✅ Update note fields
         existingNote.title = title || existingNote.title;
         existingNote.content = content || existingNote.content;
         existingNote.tags = tags || existingNote.tags;
         existingNote.category = category || existingNote.category;
         existingNote.imageUrl = imageUrl || existingNote.imageUrl;


         await existingNote.save();
         res.json(existingNote);
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
            { _id: req.params.id, userId: req.user.uid },
            { trashed: true },
            { new: true }
        );

        if (!note) return res.status(404).json({ message: "Note not found" });

        res.json({ message: "Note moved to trash" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * @desc Permanently delete a note & remove image from S3
 * @route DELETE /api/notes/permanent/:id
 * @access Private
 */
const permanentlyDeleteNote = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.user.uid });

        if (!note) return res.status(404).json({ message: "Note not found" });

        // ✅ Check if other notes by this user are using the same image URL
        if (note.imageUrl) {
            const isImageUsed = await Note.exists({ userId: req.user.uid, imageUrl: note.imageUrl, _id: { $ne: note._id } });

            if (!isImageUsed) {
                // ✅ If no other notes are using the image, delete from S3
                await deleteImageFromS3(note.imageUrl);
            }
        }

        await note.deleteOne();
        res.json({ message: "Note permanently deleted" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createNote, getNotes, getNoteById, updateNote, deleteNote, permanentlyDeleteNote };