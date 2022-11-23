var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/authenticationController');

router.post('/', auth_controller.logIn);

module.exports = router;