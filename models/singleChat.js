var utils = require('../utils/util');
var mysql = require('../config/mysql');
var sql = require('./sqlMapping');

var responseList = ['Info','Account','Path','Forwarding','Comment'];
var data = [];
module.exports = {
    queryById: function(req, res, next) {
        mysql.lib_pool.getConnection(function(err, connection) {
            data = [];
            connection.query(sql.singleChat.queryById, [req.query.weiboId], function(err, results) {
                if(err) {
                    console.log(err);
                    return;
                }
                data.account = results;
                // utils.dataPrepared(data, responseList, function() {
                //     res.json({'account': data.account, 'events': data.events});
                //     connection.release();
                // })
                res.json({'info': data.account})
            })
            // connection.query(sql.events, req.query.keyword, function(err, results) {
            //     if(err) {
            //         console.log(err);
            //         return;
            //     }
            //     data.events = results;
            //     utils.dataPrepared(data, responseList, function() {
            //         res.json({'account': data.account, 'events': data.events});
            //         connection.release();
            //     })
            // })
        })
    }
};
