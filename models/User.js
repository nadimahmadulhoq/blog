const Sequelize = require('sequelize');
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
	
});

module.exports = User;

