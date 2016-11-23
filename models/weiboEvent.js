var mysql = require('../config/mysql');
var sql = require('./sqlMapping');

module.exports = {
    query: function(req, res, next) {
        mysql.lib_pool.getConnection(function(err, connection) {
            connection.query('SELECT * FROM sinaAccount WHERE screenName=?', ['赵薇'], function(err, results) {
                req.accountId = results[0].accountId;
                res.json({'id': req.accountId})
                next();
            })
        });
    }
}
