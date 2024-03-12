const express = require('express');
const router = express.Router();
const notificationController = require('../../../controllers/notificationController');

/////////  '/messages/*'  /////////

router.route('/twilio').post(notificationController.sendMessage);

module.exports = router;
