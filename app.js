const express = require('express');
const ejs = require('ejs')
const connection =require('./utility/database');

const app= express();

app.set('view engine', 'ejs');
app.use(express.static('public'))



connection.execute('Select * from users')
        .then((result) => {
            console.log(result[0])

        }).catch((err)=>{
            console.log(err)
        })


app.get('/login',(req,res) =>{
    res.render('login')
})




const PORT=3000;


app.listen(PORT,()=>{
    console.log(`Sunucu ${PORT} portundan başilatıldı `);
})
