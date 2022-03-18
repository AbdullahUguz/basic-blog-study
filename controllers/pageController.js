exports.getRegisterPage = (req, res) => {
  res.status(200).render('register');
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login');
};

exports.getIndexPage = (req, res) => {
  console.log("page de ındex de: ",req.session.userID);
  res.status(200).render('index');
};


