const express = require('express');
const ejs = require('ejs')

const sequelize = require('./utility/database');
const User = require('./models/user')

const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const userRoute = require('./routes/userRoute');
const pageRoute = require('./routes/pageRoute');

const app= express();

app.use(
  session({
    secret: "keyboard cat",
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false, 
    proxy: true, 
  })
);

sequelize.sync();

app.set('view engine', 'ejs');

// Global Variable
global.userIN = null;

// Middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }));

// Route
app.use('*',(req,res,next)=>{
  userIN = req.session.userID;
  next();
});

app.use('/',pageRoute);
app.use('/users', userRoute);


const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Sunucu ${PORT} portundan başilatıldı `);
})
