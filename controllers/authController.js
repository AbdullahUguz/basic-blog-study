const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    console.log(req.body)
    const user = await User.create(req.body);
    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    console.log('there is a problem');
    console.log(error)
    res.status(404);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (password === user.password) {
      req.session.userID = user.id;
      res.redirect('/');
    // res.redirect('/users/dashboard');                              // hata burda bak
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
    console.log('logout da', req.session.userID);
    await req.session.destroy(() => {
      res.redirect('/');
    });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

exports.getDashboardPage = async (req, res) => {
  console.log('dashboard da: ', req.session.userID);
  try {
    const user = await User.findByPk(req.session.userID);
    const users =await User.findAll();
    res.status(200).render('dashboard', {
      user,
      users,
      msg:global.msg
    });
  } catch (error) {
    console.log(error);
    res.status(400).redirect('/login');
  }
};

exports.deleteUser = async (req,res) => {
  try{
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.status(200).redirect('/users/dashboard');
  }catch(error){
    res.status(400).json({
      status: 'fail',
      error,
    });
  } 
};

exports.updateUser = async (req,res) => {
  try{
    const user = await User.findByPk(req.params.id);
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;

    await user.save();

    res.status(200).redirect('/users/dashboard');

  }catch(error){
    res.status(400).json({
      status: 'fail',
      error,
    });
  } 
}



