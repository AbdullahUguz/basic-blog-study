const mqtt = require('mqtt');
const client=mqtt.connect('mqtt://broker.mqttdashboard.com');

const topicName ='argebilisimtest';

client.on('connect',function(){
    console.log('connected');
    
    client.subscribe(topicName,function(err){
        if(!err){
            console.log('subscribed');        
        }  
    })  
})


module.exports= client;