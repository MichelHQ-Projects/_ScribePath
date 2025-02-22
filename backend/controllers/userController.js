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
    try{
        const { name, email, password} = req.body;

        // Validate user input
    if (!email || !name || !password) {
        return res.status(400).json({ message: "Email and name are required" });
      }
      if (name.length < 2 || name.length > 50) {
        return res.status(400).json({ message: "Name must be between 2 and 50 characters" });
      }

        // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user in Firebase Authentication
    const firebaseUser = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

         // Create a new user
    // Create user in MongoDB
    const user = new User({
      firebaseUID: firebaseUser.uid, // Get UID from Firebase
      email,
      name,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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