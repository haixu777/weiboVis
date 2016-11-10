var utils = require('../utils/util');
var mysql = require('../config/mysql');
// var sql = require('./sqlMapping');

var responseList = ['info','time','weibo','link','repost'];
var acc = [];

// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   mysql.lib_pool.getConnection(function(err, connection) {
//         if(err) {
//             console.log(err+'|||return');
//             return;
//         }
//         //   var params = req.query;
//         //   console.log(params);
//         var sql = "SELECT * FROM weibo WHERE accountId =?";
//         connection.query(sql,['1000106272'], function(err, results) {
//             if(err) {
//                 return;
//             }
//             res.json({'content': results});
//         })
//   })
// });

module.exports = {
    queryAll: function(req, res, next) {
        mysql.lib_pool.getConnection(function(err, connection) {
            acc = [];

            //info
            var sql_info  = "SELECT * FROM sinaAccount WHERE accountId =?";
            connection.query(sql_info,['1000208203'], function(err, results) {
                if(err) {
                    console.log(err);
                    return;
                }
                for(var i = 0; i < results.length; i++){
                    acc.info = {
                        'photo':results[i].photoUrl,
                        'name':results[i].screenName,
                        'time':results[i].registTime,
                        'location':results[i].location,
                        'identification':results[i].verifiedContent,
                        'level':null,
                        'impact':null
                    }
                    // res.json({
                    //     'info':acc.info,
                    //     'time':acc.time
                    // });
                }
                utils.dataPrepared(acc, responseList, function() {
                    res.json({
                        'info': acc.info, 
                        'time': acc.time,
                        'weibo': acc.weibo,
                        'link_force': acc.link,
                        'repost': acc.repost
                    });
                    connection.release();
                })
            });

            //time
            var lastmonth = utils.getLastMonth();
            var sql_time  = "SELECT count(*) as weiboSum, sum(commentNum) as commentSum FROM weibo WHERE accountId =? and postTime>\'"+lastmonth+"\'";
            connection.query(sql_time,['1408233421'], function(err, results) {
                if(err) {
                    console.log(err);
                    return;
                }
                // console.log(results);
                for(var i = 0; i < results.length; i++){
                    acc.time = {
                     'comment':results[i].commentSum,
                     'release':results[i].weiboSum
                    }
                }
                utils.dataPrepared(acc, responseList, function() {
                    res.json({
                        'info': acc.info, 
                        'time': acc.time,
                        'weibo': acc.weibo,
                        'link_force': acc.link,
                        'repost': acc.repost
                    });
                    connection.release();
                    })
            });

            //weibo
            var sql_weibo = "select weibo.keywordId,weibo.subjectId,sample_keywords.sample_keyword,weibo.content, weibo.weiboId from weibo inner join sample_keywords on weibo.keywordId = sample_keywords.id WHERE weibo.accountId = ?";
            connection.query(sql_weibo,['1408233421'], function(err, results) {
                if(err) {
                    console.log(err);
                    return;
                }
                // console.log(results);
                var wordcloud = [];
                var weibolist =[];
                var nodes = [];
                for(var i = 0; i < results.length; i++){
                    wordcloud[i] = {word: results[i].sample_keyword, id: results[i].keywordId, value: null};
                    weibolist[i] = {name: results[i].content, id: results[i].weiboId};
                    nodes[i] = {}
                }

                // console.log(wordcloud);
                acc.weibo = {
                    "wordcloud":wordcloud,
                    "list":{
                        "weibolist":weibolist
                    }
                }
                utils.dataPrepared(acc, responseList, function() {
                    res.json({
                        'info': acc.info, 
                        'time': acc.time,
                        'weibo': acc.weibo,
                        'link_force': acc.link,
                        'repost': acc.repost
                    });
                    connection.release();
                    })
            });

            //link
             var sql_link = "SELECT followedAccountId, followerAccountId from followrelation where followerAccountId = ? or followedAccountId = ?;";
            connection.query(sql_link,['1304194202','1304194202'], function(err, results) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log(results);
                var fansnodes = [];
                var fanslinks = [];
                var frienodes = [];
                var frielinks = [];
                var m = 0;
                var n = 0;
                for(var i = 0; i < results.length; i++){
                    if (results[i].followedAccountId == '1304194202') { 
                        fansnodes[m] = {name: results[i].followerAccountId, value: null, url: "http://weibo.com/u/"+results[i].followerAccountId};
                        fanslinks[m] = {source: results[i].followedAccountId, target: results[i].followerAccountId, weight: null};
                        m+=1;
                    }
                    if (results[i].followerAccountId == '1304194202') { 
                        frienodes[n] = {name: results[i].followedAccountId, value: null, url: "http://weibo.com/u/"+results[i].followedAccountId};
                        frielinks[n] = {source: results[i].followerAccountId, target: results[i].followedAccountId, weight: null};
                        n+=1;
                    }
                    
                }

                // console.log(wordcloud);
                acc.link = {
                    "fans":{
                        "nodes":fansnodes,
                        "links":fanslinks
                    },
                    "friends":{
                        "nodes":frienodes,
                        "links":frielinks
                    }
                }
                utils.dataPrepared(acc, responseList, function() {
                    res.json({
                        'info': acc.info, 
                        'time': acc.time,
                        'weibo': acc.weibo,
                        'link_force': acc.link,
                        'repost': acc.repost
                    });
                    connection.release();
                    })
            });

            //repost
             var sql_repost = "select originalAccountId,repostAccountId from repost where originalAccountId not in (select followedAccountId from followrelation) and originalAccountId = ? or repostAccountId = ?;";
            connection.query(sql_repost,['1007901991','1007901991'], function(err, results) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log(results);
                var fansnodes = [];
                var fanslinks = [];
                var frienodes = [];
                var frielinks = [];
                var m = 0;
                var n = 0;
                for(var i = 0; i < results.length; i++){
                    if (results[i].originalAccountId == '1007901991') { 
                        fansnodes[m] = {name: results[i].repostAccountId, value: null, url: "http://weibo.com/u/"+results[i].repostAccountId};
                        fanslinks[m] = {source: results[i].originalAccountId, target: results[i].repostAccountId, weight: null};
                        m+=1;
                    }
                    if (results[i].repostAccountId == '1007901991') { 
                        frienodes[n] = {name: results[i].originalAccountId, value: null, url: "http://weibo.com/u/"+results[i].originalAccountId};
                        frielinks[n] = {source: results[i].repostAccountId, target: results[i].originalAccountId, weight: null};
                        n+=1;
                    }
                    
                }

                // console.log(wordcloud);
                acc.repost = {
                    "reposted":{
                        "nodes":fansnodes,
                        "links":fanslinks
                    },
                    "repost":{
                        "nodes":frienodes,
                        "links":frielinks
                    }
                }
                utils.dataPrepared(acc, responseList, function() {
                    res.json({
                        'info': acc.info, 
                        'time': acc.time,
                        'weibo': acc.weibo,
                        'link_force': acc.link,
                        'repost': acc.repost
                    });
                    connection.release();
                    })
            });
        })
    },
};
