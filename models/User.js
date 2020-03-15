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
	instanceMethods: {
		validPassword: function (password) {
			return bcrypt.compareSync(password, this.password);
		}
	}
});

	User.associate = models => {
		User.hasMany(models.Post, { foreignKey: 'userId' });
		User.hasMany(models.Tag, { foreignKey: 'userId'});
		User.hasMany(models.Category, { foreignKey: 'userId'});
	}

module.exports = User;

