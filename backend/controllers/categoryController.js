const Category = require('../models/Category');

/**
 * @desc Create a new category
 * @route POST /api/categories
 * @access Private
 */

const createCategory = async (req, res) => {
    try {
      const { name } = req.body;
      const userId = req.user.uid; // Firebase UID
  
      if (!name) {
        return res.status(400).json({ message: "Category name is required" });
      }
  
      // Check if category already exists
      const existingCategory = await Category.findOne({ name, userId });
      if (existingCategory) {
        return res.status(400).json({ message: "Category already exists" });
      }
  
      const category = new Category({ name, userId });
      await category.save();
  
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

/**
 * @desc Get all categories for the logged-in user
 * @route GET /api/categories
 * @access Private
 */
const getCategories = async (req, res) => {
    try {
      const userId = req.user.uid;
      const categories = await Category.find({ userId }).sort({ name: 1 });
  
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

/**
 * @desc Get a single category
 * @route GET /api/categories/:id
 * @access Private
 */
const getCategory = async (req, res) => {
    try {
      const userId = req.user.uid;
      const category = await Category.findOne({ _id: req.params.id, userId });
  
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

/**
 * @desc Update a category
 * @route PUT /api/categories/:id
 * @access Private
 */

const updateCategory = async (req, res) => {
    try {
      const { name } = req.body;
      const userId = req.user.uid;
  
      if (!name) {
        return res.status(400).json({ message: "Category name is required" });
      }
  
      const category = await Category.findOne({ _id: req.params.id, userId });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      // Check if category name already exists
      const existingCategory = await Category.findOne({ name, userId });
      if (existingCategory) {
        return res.status(400).json({ message: "Category already exists" });
      }
  
      category.name = name;
      await category.save();
  
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

/**
 * @desc Delete a category
 * @route DELETE /api/categories/:id
 * @access Private
 */ 

const deleteCategory = async (req, res) => {
    try {
      const userId = req.user.uid;
      const category = await Category.findOne({ _id: req.params.id, userId });
  
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      await category.remove();
  
      res.json({ message: "Category removed" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
};
  