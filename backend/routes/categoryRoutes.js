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

router.post('/', authenticateUser, createCategory);
router.get('/', authenticateUser, getCategories);
router.get('/:id', authenticateUser, getCategory);
router.put('/:id', authenticateUser, updateCategory);
router.delete('/:id', authenticateUser, deleteCategory);

module.exports = router;