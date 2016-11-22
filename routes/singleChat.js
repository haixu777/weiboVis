var express = require('express');
var router = express.Router();
var singleChat = require('../models/singleChat');

/* GET home page. */
router.get('/', function(req, res, next) {
    singleChat.queryById(req, res, next)
});

module.exports = router;
