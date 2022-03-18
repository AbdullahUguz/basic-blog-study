const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    console.log('there is a problem');
    res.status(404);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (user) {
      if (password === user.password) {

        // user session
        console.log(user.id);

        req.session.userID = user.id;
        res.status(200).redirect('/users/dashboard'); 

      } else {
        res.status(400).redirect('/login');
      }
    } else {
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

exports.getDashboardPage = async (req, res) => {

  try {
    console.log(req.session.userID);

    const user = await User.findByPk(req.session.userID);

    console.log('user role: ',user.role);
    console.log('user id: ',user.id)

    res.status(200).render('/dashboard', {
      user,
    });

  } catch (error) {
    console.log(error)
    res.status(400).redirect('/login')
  }
};