const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

router.get('/dashboard', adminController.dashboard);
router.get('/posts', adminController.posts);
router.get('/add-post', adminController.addPost);
router.post('/store-post', adminController.submitPost);

module.exports = router;