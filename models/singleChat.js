var utils = require('../utils/util');
var mysql = require('../config/mysql');
var sql = require('./sqlMapping');

var responseList = ['Info','Account','Path','Forwarding','Comment'];
var data = [];
module.exports = {
    queryById: function(req, res, next) {
        mysql.lib_pool.getConnection(function(err, connection) {
            data = [];
            connection.query(sql.singleChat.queryById, [req.query.id], function(err, results) {
                if(err) {
                    throw err;
                    return;
                }
                data.info = results;

                if(data.info.length) {
                    queryByAccountId(data.info[0].accountId);
                } else {
                    res.json({'info': data.info});
                    connection.release();
                }
            })
            function queryByAccountId(id) {
                console.log(id);
                connection.query(sql.singleChat.queryByAccountId, [id], function(err, results) {
                    if(err) {
                        throw err;
                        return;
                    }
                    data.account = results;
                    res.json({'info': data.info, 'account': [{'weiName': null, 'info': data.account}]})
                    connection.release();
                })
            }
        })
    }
};
