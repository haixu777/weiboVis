var utils = require('../utils/util');
var mysql = require('../config/mysql');
var sql = require('./sqlMapping');

var responseList = ['account','events'];
var data = [];
module.exports = {
    queryAll: function(req, res, next) {
        mysql.lib_pool.getConnection(function(err, connection) {
            data = [];
            connection.query(sql.index.sinaAccount_top10, function(err, results) {
                if(err) {
                    throw err;
                    return;
                }
                data.account = results;
                utils.dataPrepared(data, responseList, function() {
                    res.json({'account': data.account, 'events': data.events});
                    connection.release();
                })
            });
            connection.query(sql.index.events_top10, function(err, results) {
                if(err) {
                    throw err;
                    return;
                }
                data.events = results;
                utils.dataPrepared(data, responseList, function() {
                    res.json({'account': data.account, 'events': data.events});
                    connection.release();
                })
            });
        })
    },
    queryByKeyword: function(req, res, next) {
        mysql.lib_pool.getConnection(function(err, connection) {
            data = [];
            connection.query(sql.index.sinaAccount, req.query.keyword, function(err, results) {
                if(err) {
                    throw err;
                    return;
                }
                data.account = results;
                utils.dataPrepared(data, responseList, function() {
                    res.json({'account': data.account, 'events': data.events});
                    connection.release();
                })
            })
            connection.query(sql.index.events, req.query.keyword, function(err, results) {
                if(err) {
                    throw err;
                    return;
                }
                data.events = results;
                utils.dataPrepared(data, responseList, function() {
                    res.json({'account': data.account, 'events': data.events});
                    connection.release();
                })
            })
        })
    }
};
