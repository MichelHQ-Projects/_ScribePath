const Task = require("../models/Task");

/**
 * @desc Create a new task
 * @route POST /api/tasks
 * @access Private
 */
const createTask = async (req, res) => {
    try {
        console.log("🔹 Received Task Data:", req.body);
        console.log("🔹 Authenticated User:", req.user);

        const { title, content, category, tags, dueDate, priority, imageUrl } = req.body;

        // ✅ Check Required Fields
        if (!title || !content || !category || !dueDate) {
            return res.status(400).json({ message: "Title, Content, Category, and Due Date are required." });
        }

        // ✅ Check if User Exists
        if (!req.user || !req.user.uid) {
            return res.status(401).json({ message: "Unauthorized: No valid user" });
        }

        // ✅ Create Task
        const task = new Task({
            title,
            content,
            userId: req.user.uid,
            category,
            tags,
            dueDate,
            priority,
            imageUrl
        });

        console.log("✅ Saving Task:", task);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error("🚨 Error Creating Task:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * @desc Get all tasks for the logged-in user
 * @route GET /api/tasks
 * @access Private
 */
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.uid }).sort({ dueDate: 1 });
        res.json(tasks);
    } catch (error) {
        console.error("🚨 Error Fetching Tasks:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * @desc Get a single task by ID
 * @route GET /api/tasks/:id
 * @access Private
 */
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.uid });

        if (!task) return res.status(404).json({ message: "Task not found" });

        res.json(task);
    } catch (error) {
        console.error("🚨 Error Fetching Task:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * @desc Update a task
 * @route PUT /api/tasks/:id
 * @access Private
 */
const updateTask = async (req, res) => {
    try {
        const { title, content, category, tags, dueDate, priority, completed, imageUrl } = req.body;

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.uid },
            { title, content, category, tags, dueDate, priority, completed, imageUrl },
            { new: true }
        );

        if (!task) return res.status(404).json({ message: "Task not found" });

        res.json(task);
    } catch (error) {
        console.error("🚨 Error Updating Task:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * @desc Delete a task
 * @route DELETE /api/tasks/:id
 * @access Private
 */
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.uid });

        if (!task) return res.status(404).json({ message: "Task not found" });

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("🚨 Error Deleting Task:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };