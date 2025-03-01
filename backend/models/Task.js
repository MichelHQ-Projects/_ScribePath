const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        raw: { 
            type: Object, 
            required: true },  // ✅ Full Draft.js raw data
        text: { 
            type: String, 
            required: true }  // ✅ Plain text version
    },
    userId: {
        type: String,
        required: true
    },
    //project: {
    //    name: String,
    //    required: true
    //},
    dueDate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },
    completed: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        default: "Others",
    },
    tags: {
        type: [String],
        default: []
    },
    imageUrl: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Task", TaskSchema);