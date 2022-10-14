var express = require('express');
var router = express.Router();


let counter = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET consumer page. */
router.get('/consumer', function(req, res, next) {
  res.render('index2', { title: 'CONSUMER' });
});


router.get('/auth', function(req, res, next) {
  return res.status(200).json({ uniqueId: `${++counter}-UNIQUE_ID-${Math.random()}` })
});

module.exports = router;
