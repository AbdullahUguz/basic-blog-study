const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'argerf-db',                             // database ismi
    'root',                            // root         
    '12345',                           // password
    {
        dialect:'mysql',
        host:'localhost'
    }
);

module.exports = sequelize;

