var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/principal', function(req, res, next) {
  res.render('main', { title: 'UNL' });
});

module.exports = router;
