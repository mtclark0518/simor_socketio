const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatcontroller.js');


router.route('/')
    .get(chatController.launch);

router.route('/room')
    .get(chatController.joinRoom);



module.exports = router;