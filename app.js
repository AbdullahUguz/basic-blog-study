const express = require('express');
const ejs = require('ejs')
const bodyParser = require('body-parser')
const methodOverride = require('method-override');

const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = require('./utility/database');
const User = require('./models/user')

const userRoute = require('./routes/userRoute');
const pageRoute = require('./routes/pageRoute');
const mqttRoute = require('./routes/mqttRoute');

const app= express();

// Global Variable
global.userIN = null;
global.msg=null;

// Template Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true }));
app.use(methodOverride('_method',{
  methods:['POST','GET']
}));

// Session
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

// Route
app.use('*',(req,res,next)=>{
  userIN = req.session.userID;
  next();
});

app.use('/',pageRoute);
app.use('/users', userRoute);
app.use('/mqtt', mqttRoute);

const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Sunucu ${PORT} portundan baslatildi`);
})
