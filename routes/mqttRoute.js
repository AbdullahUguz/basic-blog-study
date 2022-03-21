const express = require('express');

const mqttController = require('../controllers/mqttController');

const router = express.Router();

router.route('/publish').post(mqttController.publish);

module.exports = router;