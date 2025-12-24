const express = require('express');
const router = express.Router();
const accountController = require('../controller/accountController');
const {protect} = require('../middleware/authMiddleware');

router.post('/', protect, accountController.createAccount);
router.get('/', protect, accountController.getAccounts);
router.delete('/:id', protect, accountController.deleteAccount);

module.exports = router;