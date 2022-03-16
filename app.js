const express = require('express');



const app= express();


app.get('/',(req,res) =>{
    res.send('Merhaba')
})


const PORT=3000;


app.listen(PORT,()=>{
    console.log(`Sunucu ${PORT} portundan başilatıldı `);
})
