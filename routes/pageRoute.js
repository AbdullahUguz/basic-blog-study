const express = require('express');

const pageController = require('../controllers/pageController');

const router = express.Router();

//Routes

router.route('/').get(pageController.getIndexPage);

router.route('/register').get(pageController.getRegisterPage);

router.route('/login').get(pageController.getLoginPage);

module.exports = router;