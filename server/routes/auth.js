var express = require('express');
var router = express.Router();
var User = require('../models/usersmod');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.post('/', async function(req, res, next) {
    try {
        const user = await User.findOne({a_username: req.body.username.toLowerCase()});
        if (user === null)
        {
            res.json({access: false});
            return;
        }
        if (await bcrypt.compare(req.body.password, user.a_password))
        {
            const token = jwt.sign({username: req.body.username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" });
            console.log(token);
            res.json({access: true, token: token, user: req.body.username});
            return;
        }
        else
        {
            res.json({access: false});
            return;
        }
    } catch {
        res.json({Error: "Failed to log in"});
        return;
    }
});

module.exports = router;