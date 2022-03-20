const mqtt= require('mqtt');
const client = mqtt.connect('mqtt://broker.mqttdashboard.com',{
    will: {
        topic: 'argebilisimtest',
        payload: 'deneme22',
        qos: 0,
        retain: true
      }
});


client.on('connect',function(){
    console.log('connected');
})