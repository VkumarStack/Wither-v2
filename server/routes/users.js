var express = require('express');
var router = express.Router();

<<<<<<< HEAD
/* Controller vars */
const users_controller = require("../controllers/usersController");

/* Controller Requires */
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Users home page');
});

router.get("/dummy", function (req, res) {
  res.send("Dummy user page");
=======

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('User Home Page');
});
router.get('/:id', function(req, res, next) {
  user = {username: req.params.id, bio: "Bio"}
  res.json(user);
});
/* POST users listing. */
router.post('/:id', function(req, res, next) {
  res.send('respond with a resource');
>>>>>>> d88f614cf0cab32b0bbdbf3f484e5a0007f32111
});

router.get("/:userID", users_controller.getUserID);
 // res.send(users_controller.getUserID););

module.exports = router;
