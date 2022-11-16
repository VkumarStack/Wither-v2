var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/authenticationController');

router.post('/', auth_controller.logIn);

router.get('/test', auth_controller.compareToken);
router.get('/test', function(req, res, next) {
    res.json({Result: "user authenticated"});
})

module.exports = router;