const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firebaseUID: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim:true,
        minlength: 2,
        maxlength: 50,
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;