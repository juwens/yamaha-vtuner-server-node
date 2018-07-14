var express = require('express');
const firebase = require('../modules/firebase')
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const stations = await firebase.getStations()
  res.render('index', { title: 'Express', stations});
});

module.exports = router;
