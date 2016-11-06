var utils = require('../utils/util');
var mysql = require('../config/mysql');
var sql = require('./sqlMapping');

var responseList = ['account','events'];

module.exports = {
    queryAll: function(req, res, next) {
        mysql.lib_pool.getConnection(function(err, connection) {
            var data = [];
            connection.query(sql.sinaAccount_top10, function(err, results) {
                if(err) {
                    console.log(err);
                    return;
                }
                data.account = results;
                if(utils.dataPrepared(data, responseList)) res.json({'account': data.account, 'events': data.events});
            });
            connection.query(sql.events_top10, function(err, results) {
                if(err) {
                    console.log(err);
                    return;
                }
                data.events = results;
                if(utils.dataPrepared(data, responseList)) res.json({'account': data.account, 'events': data.events});
            });
        })
    },
    queryByKeyword: function(req, res, next) {
        mysql.lib_pool.getConnection(function(err, connection) {
            var data = [];
            connection.query(sql.sinaAccount, req.query.keyword, function(err, results) {
                if(err) {
                    console.log(err);
                    return;
                }
                data.account = results;
                if(utils.dataPrepared(data, responseList)) res.json({'account': data.account, 'events': data.events});
            })
            connection.query(sql.events, req.query.keyword, function(err, results) {
                if(err) {
                    console.log(err);
                    return;
                }
                data.events = results;
                if(utils.dataPrepared(data, responseList)) res.json({'account': data.account, 'events': data.events});
            })
        })
    }
};
