const express = require('express');
const authenticateUser = require('../middlewares/authMiddleware');

const {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

const router = express.Router();

router.post('/categories', authenticateUser, createCategory);
router.get('/categories', authenticateUser, getCategories);
router.get('/categories/:id', authenticateUser, getCategory);
router.put('/categories/:id', authenticateUser, updateCategory);
router.delete('/categories/:id', authenticateUser, deleteCategory);

module.exports = router;