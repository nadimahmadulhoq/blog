const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const home = (req, res) => {
	res.render('index');
}

const registerForm = (req, res) => {
	res.render('registration');
}

const register = (req, res) => {
	let {name, email, password, confirm_password} = req.body;

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
	passport.authenticate('local', {
	    successRedirect: '/admin/dashboard',
	    failureRedirect: '/login'
	  })(req, res, next);
}

const logout = (req, res) => {
	req.logout();
	res.redirect('/login');
}


module.exports = {home, registerForm, register, loginForm, login, logout}