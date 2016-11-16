var utils = require('../utils/util');
var mysql = require('../config/mysql');
var sql = require('./sqlMapping');

var data = [];
var dataList = ['weibo','event','account'];
module.exports = {
    queryAll: function(req, res, next) {
        data = [];
        mysql.lib_pool.getConnection(function(err, connection) {
            // weibo
            connection.query(sql.index.queryWeiboTop10, [], function(err, results) {
                if(err) {
                    throw err;
                    return;
                }
                data.weibo = results;
                utils.dataPrepared(data, dataList, function() {
                    res.json({'weibo': data.weibo, 'event': data.event, 'account': data.account})
                    connection.release();
                })
            })

            // event
            connection.query(sql.index.queryEventTop10, [], function(err, results) {
                if(err) {
                    throw err;
                    return;
                }
                data.event = results;
                utils.dataPrepared(data, dataList, function() {
                    res.json({'weibo': data.weibo, 'event': data.event, 'account': data.account})
                    connection.release();
                })
            })

            // account
            connection.query(sql.index.queryAccountTop10, [], function(err, results) {
                if(err) {
                    throw err;
                    return;
                }
                data.account = results;
                utils.dataPrepared(data, dataList, function() {
                    res.json({'weibo': data.weibo, 'event': data.event, 'account': data.account})
                    connection.release();
                })
            })
        })
    },
    queryByKeyword: function(req, res, next) {
        data = [];
        mysql.lib_pool.getConnection(function(err, connection) {
            // weibo
            connection.query(sql.index.queryWeiboByKeyword, [req.query.keyword], function(err, results) {
                if(err) {
                    throw err;
                    return;
                }
                data.weibo = results;
                utils.dataPrepared(data, dataList, function() {
                    res.json({'weibo': data.weibo, 'event': data.event, 'account': data.account})
                    connection.release();
                })
            })

            // event
            connection.query(sql.index.queryEventByKeyword, [req.query.keyword], function(err, results) {
                if(err) {
                    throw err;
                    return;
                }
                data.event = results;
                utils.dataPrepared(data, dataList, function() {
                    res.json({'weibo': data.weibo, 'event': data.event, 'account': data.account})
                    connection.release();
                })
            })

            // account
            connection.query(sql.index.queryAccountByKeyword, [req.query.keyword], function(err, results) {
                if(err) {
                    throw err;
                    return;
                }
                data.account = results;
                utils.dataPrepared(data, dataList, function() {
                    res.json({'weibo': data.weibo, 'event': data.event, 'account': data.account})
                    connection.release();
                })
            })
        })
    }
};
