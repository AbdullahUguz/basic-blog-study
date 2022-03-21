const client = require('../mqtt/mqttConnect');

exports.publish = async (req, res) => {
  try {
    const messages = req.body.message;
    const topicName = 'argebilisimtest';

    // mesaj gonderilen kısım
    client.publish(topicName, messages);
    global.msg.push(messages.toString());

    req.flash('success', 'Your message sended!');
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', 'Your message did not send!');
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

