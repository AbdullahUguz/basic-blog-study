const express = require('express');
const ejs = require('ejs')
const bodyParser = require('body-parser')
const methodOverride = require('method-override');

const session = require('express-session');
const flash = require('connect-flash');

const sequelize = require('./utility/database');
const User = require('./models/user')

const userRoute = require('./routes/userRoute');
const pageRoute = require('./routes/pageRoute');
const mqttRoute = require('./routes/mqttRoute');

const app= express();

// Global Variable
global.userIN = null;
global.msg=[];
global.getMsg=[];


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
    resave: false,  
  })
);

// Flash Message
app.use(flash());
app.use((req,res,next) => {
  res.locals.flashMessages = req.flash();
  next();
});

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
    console.log(`Server start port : ${PORT}`);
})
