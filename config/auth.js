module.exports = {
	ensureAuthenticated: (req, res, next) =>{
		if (req.isAuthenticated()) {
			return next();
		}

		res.redirect('/login');
	},

	forwardAuthenticated: (req, res, next) => {
		if (!req.isAuthenticated) {
			return next();
		}

		res.redirect('/admin/dashboard');
	},

	checkSession: (req, res, next) => {
		if (req.session.user) {
			next();
		}
		res.redirect('/login')
	},

	checkSessionIF: (req, res, next) => {
		if (!req.session.user) {
			res.redirect('/login');
		}

		next();
	}


}