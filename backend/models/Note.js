const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: {
        type: String,
        required: true,
        },
        content: {
        type: String,
        required: true,
        },
        userId: { type: String, 
        required: true
        },
        tags: {
        type: [String],
        },
        category: {
        type: String,
        enum: ["Reminders", "Work", "Personal", "Others"],
        default: "Others",
        },
        trashed: {
        type: Boolean,
        default: false,
        },
    },
    {
        timestamps: true,
    }
    );

    const Note = mongoose.model("Note", noteSchema);
    module.exports = Note;