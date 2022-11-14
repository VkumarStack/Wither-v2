const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usersmod');

exports.encryptPassword = async function encryptPassword(req, res, next) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
      next();
    } catch {
      res.json({Error: "Something went wrong with registering"});
    }
}

exports.logIn = async function logIn(req, res, next) {
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
}

// Copy and Paste implementation from createPost later
exports.createToken = async function createToken(req, res, next) {

}

exports.compareToken = async function compareToken(req, res, next) {
    const auth = req.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    if (token === null) {
        res.json({Error: "No token provided"});
        return;
    }
    else {
        try {
            const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (req.body.username.toLowerCase() === payload.username.toLowerCase())
                next();
            else
            {
                res.json({Error: "Invalid user matching"});
            }
        } catch {
            res.json({Error: "Invalid token"});
            return;
        }
    }
}