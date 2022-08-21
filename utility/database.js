const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'basic-blog-db',                             // database name
    'root',                            // root         
    '12345',                           // password
    {
        dialect:'mysql',
        host:'localhost'
    }
);

module.exports = sequelize;

