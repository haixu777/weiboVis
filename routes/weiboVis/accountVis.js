var express = require('express');
var router = express.Router();
var mysql = require('../../config/mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  mysql.lib_pool.getConnection(function(err, connection) {
        if(err) {
            console.log(err+'|||return');
            return;
        }
        //   var params = req.query;
        //   console.log(params);
        var sql = "SELECT * FROM weibo WHERE accountId =?";
        connection.query(sql,['1000106272'], function(err, results) {
            if(err) {
                return;
            }
            res.json({'content': results});
        })
  })
});

module.exports = router;
