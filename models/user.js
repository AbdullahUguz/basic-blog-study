const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },

  role: {
    type: Sequelize.ENUM,
    values: ['admin', 'user'],
    defaultValue: 'user',
  }
});

module.exports = User;
