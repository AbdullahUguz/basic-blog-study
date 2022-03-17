const User = require('../models/user')


exports.createUser = async(req,res) =>{
    try {
        const user = await User.create(req.body)
        res.status(201).redirect('/login');
        console.log('kayıt basarılı')
        /*
        const user =await User.create({
            username:'ali',
            email:'ali@gmail.com',
            password:'1234',
        }).then(result =>{
            console.log(result);
        })
        */
        
    } catch (error) {
        console.log('there is a problem')
        res.status(404)
    }
}
exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ where: { email: email } });
  
      if (user) {
          if (password === user.password) {
            res.status(200).send('login başarılı');
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