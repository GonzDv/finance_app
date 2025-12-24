const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const {protect} = require('../middleware/authMiddleware');

router.post('/', protect, categoryController.createCategory);
router.get('/', protect, categoryController.getCategories);
router.delete('/:id', protect, categoryController.deleteCategory);
module.exports = router;
