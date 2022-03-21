const User = require('../models/user');

module.exports = async (req, res, next) => {
  const user =await  User.findByPk(req.session.userID)
    if (!user) return res.redirect('/login');
    next();
};