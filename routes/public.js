const express = require('express');
const router = express.Router();

const publicController = require('../controllers/publicController');

router.get('/', (req, res)=>{
	res.render('admin/registration');
});