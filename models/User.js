const Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
const db = require('../config/db');

const User = db.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		notNull: true,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		notNull: true
	},
	email: {
		type: Sequelize.STRING,
		notNull: true
	},
	password: {
		type: Sequelize.STRING,
		notNull: true
	}
	
}, {
	hooks: {
		beforeCreate: (user) => {
			user.password = bcrypt.hashSync(user.password, 10);
		}
	},
	instanceMethods: {
		validPassword: function (password) {
			return bcrypt.compareSync(password, this.password);
		}
	}
});

module.exports = User;

