const client = require('../mqtt/mqttConnect');

exports.publish = async (req, res) => {
  try {
    const messages = req.body.message;
    const topicName = 'argebilisimtest';
    // mesaj gonderilen kısım
    client.publish(topicName, messages);
    global.msg=messages;
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

