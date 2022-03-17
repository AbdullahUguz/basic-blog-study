exports.getRegisterPage = (req, res) => {
  res.status(200).render('register');
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login');
};
