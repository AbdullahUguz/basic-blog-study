const express = require('express');

const authController = require('../controllers/authController');

const User = require('../models/user');

const { body } =require('express-validator');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/adminCreating').get(authController.adminCreating);

router.route('/signup').post(userValidation(),authController.createUser);
router.route('/admin/createUser').post(userValidation(),authController.adminCreateUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware,authController.getDashboardPage);
router.route('/:id').delete(authController.deleteUser);
router.route('/:id').put(userValidation(),authController.updateUser);

function userValidation(){
  return [
    body('email').isEmail().withMessage('Please Enter Valid Email')
    .custom( async (userEmail) => {
        const user = await User.findOne({ where: { email: userEmail } });
        if(user){
            return Promise.reject('Email is already exists!');
        }
    }),
];
}
module.exports = router;