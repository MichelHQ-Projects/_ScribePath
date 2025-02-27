const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: {
        type: String,
        required: true,
        },
        content: {
            raw: { type: Object, required: true },  // ✅ Full Draft.js raw data
            text: { type: String, required: true }  // ✅ Plain text version
          },
        userId: { type: String, 
        required: true
        },
        tags: {
        type: [String],
        },
        category: {
        type: String,
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