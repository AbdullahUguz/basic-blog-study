const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'basic-blog-db',                             // database name
    'root',                            // root         
    '',                           //your db password
    {
        dialect:'mysql',
        host:'localhost'
    }
);

module.exports = sequelize;

