var express = require('express');
var router = express.Router();
var User = require('../models/usersmod');

/* Controller vars */
const users_controller = require("../controllers/usersController");

/* Controller Requires */
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({userlist: ["joebruin123", "penguinz0", "ludwig"]});
});

router.get("/dummy", function (req, res) {
  res.send("Dummy user page");
});

router.get("/:userID", users_controller.getUserID);
 // res.send(users_controller.getUserID););

router.post("/", users_controller.encryptPassword);
router.post("/", users_controller.createUser);



module.exports = router;
