const Sequelize = require('sequelize');
const db = require('../config/db');

const Model = db.define('posts', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		notNull: true,
		primaryKey: true
	},
	title: {
		type: Sequelize.STRING,
		notNull: true
	},
	description: {
		type: Sequelize.TEXT,
		notNull: true
	},
	author: {
		type: Sequelize.STRING,
		notNull: true
	}
	
});

module.exports = Model;

