var express = require('express');
var router = express.Router();
var indexcontroller = require('../controllers/index.controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/fancy/:eventid/:marketid', indexcontroller.apirequest);

module.exports = router;
