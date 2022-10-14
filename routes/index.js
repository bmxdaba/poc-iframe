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
  const data = { uniqueId: `${++counter}-UNIQUE_ID-${Math.random()}` };
  const expireTime = 60*60*24*30;
  return res.cookie('auth-iframe-test', encodeURIComponent(JSON.stringify(data)), { sameSite: 'none', secure: true, maxAge: expireTime }).status(200).json(data)
});

module.exports = router;
