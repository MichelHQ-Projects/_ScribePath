const User = require("../models/User");
const admin = require("../firebaseAdmin");

/**
 * @desc Get the logged-in user's profile
 * @route GET /api/users/profile
 * @access Private (Authenticated users only)
 */

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUID: req.user.uid });

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * @desc Create a user profile
 * @route POST /api/users/register
 * @access Private (Authenticated users only)
 */

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate user input
    if (!email || !name || !password) {
      return res.status(400).json({ message: "Email, name, and password are required" });
    }
    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({ message: "Name must be between 2 and 50 characters" });
    }

    // 2. Check if user already exists in MongoDB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Create user in Firebase Authentication
    const firebaseUser = await admin.auth().createUser({
      email,
      password,
      displayName: name,
      emailVerified: false, // Ensure users start unverified
    });

    // 4. Generate email verification link
    const verificationLink = await admin.auth().generateEmailVerificationLink(email);

    // 5. Save user in MongoDB (after successful Firebase registration)
    const user = new User({
      firebaseUID: firebaseUser.uid, // Store Firebase UID
      email,
      name,
    });
    await user.save();

    // 6. Send final success response (ONLY ONE)
    res.status(201).json({
      message: "User registered successfully. Please verify your email.",
      userId: firebaseUser.uid,
    });

  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createUser };

/**
 * @desc Update a user profile
 * @route POST /api/users/update
 * @access Private (Authenticated users only)
 */

const updateUser = async (req, res) => {
    try {
        const {name} = req.body;
        const firebaseUID = req.user.uid;

        // Validate input
    if (name && (name.length < 2 || name.length > 50)) {
        return res.status(400).json({ message: "Name must be between 2 and 50 characters" });
      }
  
      // Find the user
      let user = await User.findOne({ firebaseUID });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update fields securely
      if (name) user.name = name;  
      await user.save();
  
      res.json({ message: "User profile updated", user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

module.exports = { getUserProfile, createUser, updateUser };