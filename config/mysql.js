var mysql = require('mysql');
var config = require('./db');

var lib_pool = mysql.createPool(config.lib);
exports.lib_pool = lib_pool;
