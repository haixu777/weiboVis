var express = require('express');
var router = express.Router();
var index = require('../models/accountVis');

/* GET home page. */
router.get('/', function(req, res, next) {
    // req.query.keyword ? index.queryByKeyword(req, res, next) : index.queryAll(req, res, next);
     index.queryAll(req, res, next);
});

module.exports = router;
