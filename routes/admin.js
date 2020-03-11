const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const auth = require('../config/auth');


router.get('/dashboard', adminController.dashboard);
router.get('/posts', adminController.posts);
router.get('/add-post', adminController.addPost);
router.post('/store-post', adminController.storePost);
router.get('/edit-post/:id', adminController.editPost);
router.post('/update-post', adminController.updatPost);
router.post('/delete-post', adminController.deletePost);

module.exports = router;