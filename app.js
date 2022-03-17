const express = require('express');
const ejs = require('ejs')
const sequelize = require('./utility/database');
const User = require('./models/user')

const userRoute = require('./routes/userRoute');
const pageRoute = require('./routes/pageRoute');


const app= express();

sequelize.sync();

app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }));

// Route
app.use('/',pageRoute);
app.use('/users', userRoute);






const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Sunucu ${PORT} portundan başilatıldı `);
})



/*
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  sequelize.sync()
    .then(result => {
    console.log(result)
    })
    .catch(err =>{
    console.log(err);
    });
*/