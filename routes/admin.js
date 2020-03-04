const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

router.get('/dashboard', adminController.dashboard);

module.exports = router;