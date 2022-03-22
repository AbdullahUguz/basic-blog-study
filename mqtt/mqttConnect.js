const mqtt = require('mqtt');
const client=mqtt.connect('mqtt://broker.mqttdashboard.com');

const topicName ='argebilisimtest';

client.on('connect',function(){
    console.log(`Connected  MQTT`);
    
    client.subscribe(topicName,function(err){
        if(!err){
            console.log(`Subscribed ${topicName}`);        
        }  
    });
});


client.on('message',function(topic,message){
    global.getMsg.push(message.toString());
});


module.exports= client;