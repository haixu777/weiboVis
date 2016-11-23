var express = require('express');
var router = express.Router();
var weiboEvent = require('../models/weiboEvent');

/* GET home page. */
router.get('/', function(req, res, next) {
    weiboEvent.query(req, res, next);
});

module.exports = router;
