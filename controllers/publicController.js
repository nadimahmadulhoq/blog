const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

const home = (req, res) => {
	res.render('index');
}

const registerForm = (req, res) => {
	res.render('registration', {
		email: '',
		name: ''
	});
}

const register = (req, res) => {
	let { name, email, password, confirm_password } = req.body;
	const errors = validationResult(req);
	console.log(errors.array());
	if(!errors.isEmpty()){
		return res.render('registration', {
			errors: errors.array(),
			name,
			email
		});
	}
	
	bcrypt.hash(password, 10, ((err, hash) => {
			if (err) throw err;
			password = hash;
			console.log(password);
			User.create({name, email, password})
			.then(user => {
				
				res.redirect('/login')
			});
		})
	);
}

const loginForm = (req, res) => {
	res.render('login');
}

const login = (req, res, next) => {
	const {email, password} = req.body;
	let errors = validationResult(req);
	console.log(errors.array());
	if (!errors.isEmpty()) {
		return res.render('login', {
			errors: errors.array()
		});
	}

	User.findOne({where: {email: email}})
		.then(user => {
			if (user) {
				const isMatched = bcrypt.compareSync(password, user.password);
				if (!isMatched) {
					
					return res.render('login', {
						errors: [{'msg': 'Invalid passoword!'}]
					});
				}
			}else{
				return res.render('login', {
					errors: [{'msg': 'E-mail not registerd yet!'}]
				});
			}
		})
		.catch();
}

const logout = (req, res) => {
	req.logout();
	res.redirect('/login');
}


module.exports = {home, registerForm, register, loginForm, login, logout}