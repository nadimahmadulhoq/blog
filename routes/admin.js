const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const auth = require('../config/auth');


router.get('/dashboard', auth.checkSession, adminController.dashboard);
router.get('/posts', auth.checkSession, adminController.posts);
router.get('/add-post', auth.checkSession, adminController.addPost);
router.post('/store-post', auth.checkSession, adminController.storePost);
router.get('/edit-post/:id', auth.checkSession, adminController.editPost);
router.post('/update-post', auth.checkSession, adminController.updatPost);
router.post('/delete-post', auth.checkSession, adminController.deletePost);

module.exports = router;