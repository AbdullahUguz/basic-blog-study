const User = require('../models/user');

const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    const errors = validationResult(req);

    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', `${errors.array()[i].msg} `);
    }
    res.status(404).redirect('/register');
  }
};

exports.getDashboardPage = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.userID);
    const users = await User.findAll();
    res.status(200).render('dashboard', {
      user,
      users,
      msg:global.msg,
      getMsg: global.getMsg
    });
  } catch (error) {
    console.log(error);
    res.status(400).redirect('/login');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (user) {
      if (password === user.password) {
        req.session.userID = user.id;
        res.status(200).redirect('/users/dashboard');
      } else {
        req.flash('error', 'Your password is not correct!');
        res.status(400).redirect('/login');
      }
    } else {
      req.flash('error', 'User is not exist!');
      res.status(400).redirect('/login');
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    await req.session.destroy(() => {
      res.redirect('/');
    });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    req.flash('success', `${user.username} has been removed succesfully!`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;

    await user.save();
    req.flash('success', `${user.username} has been updated succesfully!`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    const errors = validationResult(req);
    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', `${errors.array()[i].msg} `);
    }
    res.status(404).redirect('/users/dashboard');
  }
};

exports.adminCreateUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    req.flash('success', `${user.username} added`);
    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    const errors = validationResult(req);

    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', `${errors.array()[i].msg} `);
    }
    res.status(404).redirect('/users/dashboard');
  }
};
