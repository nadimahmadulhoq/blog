const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const publicController = require('../controllers/publicController');
const auth = require('../config/auth');
const User = require('../models/User');

router.get('/', publicController.home );

router.get('/register', publicController.registerForm);
router.post('/register', [
    check('name').isAlphanumeric().withMessage('Your name should contain only characters and numbers')
    .isLength({min: 6}).withMessage('Your name should have at least 6 characters.'),
    check('email').isEmail().withMessage('Please enter a valid e-mail.').custom((value, { req }) => {
        return User.findOne({where: {email: value}})
            .then(user => {
                if(user){
                    return Promise.reject('E-mail already in use, try another one.')
                }
            });
    }),
    check('password').isLength({min: 5}).withMessage('Your password should have minimum 6 characters.'),
    check('confirm_password').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Password confirmation does not match.');
        }
        return true;
    })
], publicController.register);

router.get('/login', publicController.loginForm);
router.post('/login', [
        check('email').isEmail().withMessage('Enter valid email.'),
        check('password').isLength({min: 1}).withMessage('Password is reqired.')
    ], publicController.login);
router.get('/logout', publicController.logout);

module.exports = router;