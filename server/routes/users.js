var express = require('express');
var router = express.Router();


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
});

module.exports = router;
