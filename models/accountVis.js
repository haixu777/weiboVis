var utils = require('../utils/util');
var mysql = require('../config/mysql');
var sql = require('./sqlMapping');

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
            // var sql_info  = "SELECT * FROM sinaAccount WHERE accountId =?";
            connection.query(sql.accountVis.queryInfoByKeyword,[req.query.keyword], function(err, results) {
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
                // utils.dataPrepared(acc, responseList, function() {
                //     res.json({
                //         'info': acc.info,
                //         'time': acc.time,
                //         'weibo': acc.weibo,
                //         'link_force': acc.link,
                //         'repost': acc.repost
                //     });
                //     connection.release();
                // })

                if(results.length > 0) {
                    fetchTimeDataFromServer(results[0].accountId);
                    fetchWeiboDataFromServer(results[0].accountId);
                    fetchLinkDataFromServer(results[0].accountId);
                    fetchRepostDataFromServer(results[0].accountId);
                } else {
                    res.json({'info': '无此用户信息'})
                }

            });

            //time
            function fetchTimeDataFromServer (accountId) {
                var lastmonth = utils.getLastMonth();
                var sql_time  = sql.accountVis.queryTimeByAccountId+"\'"+lastmonth+"\'";
                connection.query(sql_time,[accountId], function(err, results) {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    console.log(results);
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
            }

            //weibo
            function fetchWeiboDataFromServer(accountId) {
                var sql_weibo = sql.accountVis.queryWeiboByAccountId;
                connection.query(sql_weibo,[accountId], function(err, results) {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    // console.log(results);
                    var wordcloud = [];
                    var weibolist =[];
                    var nodes = [];
                    for(var i = 0; i < results.length; i++){
                        wordcloud[i] = {name: results[i].sample_keyword, id: results[i].keywordId, value: null};
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
            }

            //link
            function fetchLinkDataFromServer(accountId) {
                connection.query(sql.accountVis.queryLinkByAccountId,[ accountId, accountId], function(err, results) {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    // console.log(results);
                    var fansnodes = [];
                    var fanslinks = [];
                    var frienodes = [];
                    var frielinks = [];
                    var m = 0;
                    var n = 0;
                    for(var i = 0; i < results.length; i++){
                        if (results[i].followedAccountId == accountId) {
                            fansnodes[m] = {name: results[i].followerAccountId, value: null, url: "http://weibo.com/u/"+results[i].followerAccountId};
                            fanslinks[m] = {source: results[i].followedAccountId, target: results[i].followerAccountId, weight: null};
                            m+=1;
                        }
                        if (results[i].followerAccountId == accountId) {
                            frienodes[n] = {name: results[i].followedAccountId, value: null, url: "http://weibo.com/u/"+results[i].followedAccountId};
                            frielinks[n] = {source: results[i].followerAccountId, target: results[i].followedAccountId, weight: null};
                            n+=1;
                        }

                    }

                    fansnodes[m] = {name: accountId, value: null, url: "http://weibo.com/u/" + accountId};

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
            }

            //repost
            function fetchRepostDataFromServer (accountId) {
                //  var sql_repost = "select originalAccountId,repostAccountId from repost where originalAccountId not in (select followedAccountId from followrelation) and originalAccountId = ? or repostAccountId = ?;";
                connection.query(sql.accountVis.queryRepostByAccountId,[accountId, accountId], function(err, results) {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    // console.log(results);
                    var fansnodes = [];
                    var fanslinks = [];
                    var frienodes = [];
                    var frielinks = [];
                    var m = 0;
                    var n = 0;
                    for(var i = 0; i < results.length; i++){
                        if (results[i].originalAccountId == accountId) {
                            fansnodes[m] = {name: results[i].repostAccountId, value: null, url: "http://weibo.com/u/"+results[i].repostAccountId};
                            fanslinks[m] = {source: results[i].originalAccountId, target: results[i].repostAccountId, weight: null};
                            m+=1;
                        }
                        if (results[i].repostAccountId == accountId) {
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
            }
        })
    },
};
