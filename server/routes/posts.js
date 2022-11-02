var express = require('express');
var router = express.Router();

/* GET post listing. */
router.get('/', function(req, res, next) {
  res.send('Posts home page');
});

router.get('/:postsID', function(req, res, next) {
    res.send('Posts home page');
  });
module.exports = router;
