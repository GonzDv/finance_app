const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');
const {protect} = require('../middleware/authMiddleware');

router.post('/', protect, transactionController.createTransaction);
router.post('/transfer', protect, transactionController.createTransfer);
router.get('/', protect, transactionController.getTransactions);
module.exports = router;
