var mysql = require('../config/mysql');
var sql = require('./sqlMapping');

var data = [];
var events = [];
var account = [];

module.exports = {
    queryAll: function(req, res, next) {
        mysql.one_lib.getConnection(function(err, connection) {
            connection.query(sql.sinaAccount, function(err, results) {

            });
            connection.query(sql.events, function(err, results) {

            });
        })
    },
    queryByKeyword: function(req, res, next) {
        mysql.lib_pool.getConnection(function(err, connection) {
            connection.query(sql.sinaAccount, req.query.keyword, function(err, results) {
                if(err) throw(err);
                account = results;
            })
            connection.query(sql.events, req.query.keyword, function(err, results) {
                if(err) throw(err);
                events = results;
            })
            setTimeout(function() {
                res.json({'account': account, 'events': events});
            },1000)
        })
    }
};
