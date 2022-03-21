const mqtt = require('mqtt');
const client=mqtt.connect('mqtt://broker.mqttdashboard.com');

const topicName ='argebilisimtest';

client.on('connect',function(){
    console.log('connected');
    
    client.subscribe(topicName,function(err){
        if(!err){
            console.log('subscribed');        
        }  
    });
});


client.on('message',function(topic,message){
    console.log(message.toString());
    global.getMsg.push(message.toString());
});


module.exports= client;