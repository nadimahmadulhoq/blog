const express = require('express');
const router = express.Router();

const publicController = require('../controllers/publicController');
const auth = require('../config/auth');

router.get('/', publicController.home );

router.get('/register', publicController.registerForm);
router.post('/register', publicController.register);

router.get('/login', publicController.loginForm);
router.post('/login', publicController.login);
router.get('/logout', publicController.logout);

module.exports = router;