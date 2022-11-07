var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    // Dummy Implementation
    try {
        // Future: Compare encrypted password, and if valid, return an authorization token
        // Also sanitize input data possibly
        if (req.body.user === "joebruin" && req.body.password === "qwerty")
            res.json({access: true, token: "123456"});
        else
            res.json({access: false});
    } catch {
        res.json({Error: "Something went wrong"});
    }
});

module.exports = router;