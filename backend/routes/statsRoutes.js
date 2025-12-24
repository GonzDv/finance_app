const express = require('express');
const router = express.Router();
const statsController = require('../controller/statsController');

router.get('/', statsController.getDashboardStats);

module.exports = router;