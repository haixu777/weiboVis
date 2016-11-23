var utils = require('../utils/util');
var mysql = require('../config/mysql');
var sql = require('./sqlMapping');

var responseList = ['info', 'time', 'weibo', 'link', 'repost', 'comment', 'likesnum'];
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
                        connection.query(sql.accountVis.queryInfoByKeyword, [req.query.keyword], function(err, results) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            for (var i = 0; i < results.length; i++) {
                                acc.info = {
                                        'photo': results[i].photoUrl,
                                        'name': results[i].screenName,
                                        'time': results[i].registTime,
                                        'location': results[i].location,
                                        'identification': results[i].verifiedContent,
                                        'level': null,
                                        'impact': null
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

                            if (results.length > 0) {
                                fetchTimeDataFromServer(results[0].accountId);
                                fetchWeiboDataFromServer(results[0].accountId);
                                fetchLinkDataFromServer(results[0].accountId);
                                fetchRepostDataFromServer(results[0].accountId);
                                fetchLikesnumDataFromServer(results[0].accountId);
                                fetchCommentDataFromServer(results[0].accountId);
                            } else {
                                res.json({
                                    'info': '无此用户信息'
                                })
                            }

                        });

                        //time
                        function fetchTimeDataFromServer(accountId) {
                            var repostNum = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                            var originalNum = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                            var sql_time = sql.accountVis.queryTimeByAccountId;
                            connection.query(sql_time, [accountId], function(err, results) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                // console.log(results);
                                for (var i = 0; i < results.length; i++) {
                                    if (results[i].isRepost == 0) {
                                        repostNum[parseInt(results[i].posthour)] = results[i].weiboNum;
                                    } else {
                                        originalNum[parseInt(results[i].posthour)] = results[i].weiboNum;
                                    }
                                }

                                acc.time = {
                                    '1oc_repost': repostNum[0],
                                    '1oc_original': originalNum[0],
                                    '2oc_repost': repostNum[1],
                                    '2oc_original': originalNum[1],
                                    '3oc_repost': repostNum[2],
                                    '3oc_original': originalNum[2],
                                    '4oc_repost': repostNum[3],
                                    '4oc_original': originalNum[3],
                                    '5oc_repost': repostNum[4],
                                    '5oc_original': originalNum[4],
                                    '6oc_repost': repostNum[5],
                                    '6oc_original': originalNum[5],
                                    '7oc_repost': repostNum[6],
                                    '7oc_original': originalNum[6],
                                    '8oc_repost': repostNum[7],
                                    '8oc_original': originalNum[7],
                                    '9oc_repost': repostNum[8],
                                    '9oc_original': originalNum[8],
                                    '10oc_repost': repostNum[9],
                                    '10oc_original': originalNum[9],
                                    '11oc_repost': repostNum[10],
                                    '11oc_original': originalNum[10],
                                    '12oc_repost': repostNum[11],
                                    '12oc_original': originalNum[11],
                                    '13oc_repost': repostNum[12],
                                    '13oc_original': originalNum[12],
                                    '14oc_repost': repostNum[13],
                                    '14oc_original': originalNum[13],
                                    '15oc_repost': repostNum[14],
                                    '15oc_original': originalNum[14],
                                    '16oc_repost': repostNum[15],
                                    '16oc_original': originalNum[15],
                                    '17oc_repost': repostNum[16],
                                    '17oc_original': originalNum[16],
                                    '18oc_repost': repostNum[17],
                                    '18oc_original': originalNum[17],
                                    '19oc_repost': repostNum[18],
                                    '19oc_original': originalNum[18],
                                    '20oc_repost': repostNum[19],
                                    '20oc_original': originalNum[19],
                                    '21oc_repost': repostNum[20],
                                    '21oc_original': originalNum[20],
                                    '22oc_repost': repostNum[21],
                                    '22oc_original': originalNum[21],
                                    '23oc_repost': repostNum[22],
                                    '23oc_original': originalNum[22],
                                    '24oc_repost': repostNum[23],
                                    '24oc_original': originalNum[23],
                                }

                                utils.dataPrepared(acc, responseList, function() {
                                    res.json({
                                        'info': acc.info,
                                        'time': acc.time,
                                        'weibo': acc.weibo,
                                        'link_force': acc.link,
                                        'repost': acc.repost,
                                        'comment': acc.comment,
                                        'likesnum': acc.likesum
                                    });
                                    connection.release();
                                })
                            });
                        }

                        //weibo
                        function fetchWeiboDataFromServer(accountId) {
                            var sql_weibo = sql.accountVis.queryWeiboByAccountId;
                            connection.query(sql_weibo, [accountId], function(err, results) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                var wordcloud = [];
                                var weibolist = [];
                                var nodes = [];
                                for (var i = 0; i < results.length; i++) {
                                    wordcloud[i] = {
                                        name: results[i].sample_keyword,
                                        id: results[i].keywordId,
                                        value: results[i].wval
                                    };
                                    weibolist[i] = {
                                        name: results[i].content,
                                        id: results[i].weiboId
                                    };
                                    nodes[i] = {}
                                }

                                // console.log(wordcloud);
                                acc.weibo = {
                                    "wordcloud": wordcloud,
                                    "list": {
                                        "weibolist": weibolist
                                    }
                                }
                                utils.dataPrepared(acc, responseList, function() {
                                    res.json({
                                        'info': acc.info,
                                        'time': acc.time,
                                        'weibo': acc.weibo,
                                        'link_force': acc.link,
                                        'repost': acc.repost,
                                        'comment': acc.comment,
                                        'likesnum': acc.likesum
                                    });
                                    connection.release();
                                })
                            });
                        }

                        //link
                        function fetchLinkDataFromServer(accountId) {
                            connection.query(sql.accountVis.queryLinkByAccountId, [accountId, accountId], function(err, results) {
                                if (err) {
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
                                for (var i = 0; i < results.length; i++) {
                                    if (results[i].followedAccountId == accountId) {
                                        fansnodes[m] = {
                                            name: results[i].followerName ? results[i].followerName : results[i].followerAccountId,
                                            id: results[i].followerAccountId,
                                            value: null,
                                            url: "http://weibo.com/u/" + results[i].followerAccountId,
                                            category: 1
                                        };
                                        fanslinks[m] = {
                                            source: results[i].followedName ? results[i].followedName : results[i].followedAccountId,
                                            target: results[i].followerName ? results[i].followerName : results[i].followerAccountId,
                                            weight: null
                                        };
                                        m += 1;
                                    }
                                    if (results[i].followerAccountId == accountId) {
                                        frienodes[n] = {
                                            name: results[i].followedName ? results[i].followedName : results[i].followedAccountId,
                                            id: results[i].followedAccountId,
                                            value: null,
                                            url: "http://weibo.com/u/" + results[i].followedAccountId,
                                            category: 1
                                        };
                                        frielinks[n] = {
                                            source: results[i].followerName ? results[i].followerName : results[i].followerAccountId,
                                            target: results[i].followedName ? results[i].followedName : results[i].followedAccountId,
                                            weight: null
                                        };
                                        n += 1;
                                    }

                                }

                                fansnodes[m] = {
                                    name: req.query.keyword,
                                    id: accountId,
                                    value: null,
                                    url: "http://weibo.com/u/" + accountId,
                                    category: 0
                                };

                                // console.log(wordcloud);
                                acc.link = {
                                    "fans": {
                                        "nodes": fansnodes,
                                        "links": fanslinks
                                    },
                                    "friends": {
                                        "nodes": frienodes,
                                        "links": frielinks
                                    }
                                }
                                utils.dataPrepared(acc, responseList, function() {
                                    res.json({
                                        'info': acc.info,
                                        'time': acc.time,
                                        'weibo': acc.weibo,
                                        'link_force': acc.link,
                                        'repost': acc.repost,
                                        'comment': acc.comment,
                                        'likesnum': acc.likesum
                                    });
                                    connection.release();
                                })
                            });
                        }

                        //repost
                        function fetchRepostDataFromServer(accountId) {
                            //  var sql_repost = "select originalAccountId,repostAccountId from repost where originalAccountId not in (select followedAccountId from followrelation) and originalAccountId = ? or repostAccountId = ?;";
                            connection.query(sql.accountVis.queryRepostByAccountId, [accountId, accountId], function(err, results) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                var fansnodes = [];
                                var fanslinks = [];
                                var frienodes = [];
                                var frielinks = [];
                                var m = 0;
                                var n = 0;
                                for (var i = 0; i < results.length; i++) {
                                    if (results[i].originalAccountId == accountId) {
                                        fansnodes[m] = {
                                            name: results[i].repostAccountId,
                                            value: null,
                                            url: "http://weibo.com/u/" + results[i].repostAccountId
                                        };
                                        fanslinks[m] = {
                                            source: results[i].originalAccountId,
                                            target: results[i].repostAccountId,
                                            weight: null
                                        };
                                        m += 1;
                                    }
                                    if (results[i].repostAccountId == accountId) {
                                        frienodes[n] = {
                                            name: results[i].originalAccountId,
                                            value: null,
                                            url: "http://weibo.com/u/" + results[i].originalAccountId
                                        };
                                        frielinks[n] = {
                                            source: results[i].repostAccountId,
                                            target: results[i].originalAccountId,
                                            weight: null
                                        };
                                        n += 1;
                                    }

                                }

                                // console.log(wordcloud);
                                acc.repost = {
                                    "reposted": {
                                        "nodes": fansnodes,
                                        "links": fanslinks
                                    },
                                    "repost": {
                                        "nodes": frienodes,
                                        "links": frielinks
                                    }
                                }
                                utils.dataPrepared(acc, responseList, function() {
                                    res.json({
                                        'info': acc.info,
                                        'time': acc.time,
                                        'weibo': acc.weibo,
                                        'link_force': acc.link,
                                        'repost': acc.repost,
                                        'comment': acc.comment,
                                        'likesnum': acc.likesum
                                    });
                                    connection.release();
                                })
                            });
                        }

                        //comment
                        function fetchCommentDataFromServer(accountId) {
                            connection.query(sql.accountVis.queryCommentByAccountId, [accountId, accountId], function(err, results) {
                                    if (err) {
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
                                    for (var i = 0; i < results.length; i++) {
                                        if (results[i].originalAccountId == accountId) {
                                            fansnodes[m] = {
                                                name: results[i].commentAccountId,
                                                value: null,
                                                url: "http://weibo.com/u/" + results[i].commentAccountId
                                            };
                                            fanslinks[m] = {
                                                source: results[i].originalAccountId,
                                                target: results[i].commentAccountId,
                                                weight: null
                                            };
                                            m += 1;
                                        }
                                        if (results[i].commentAccountId == accountId) {
                                            frienodes[n] = {
                                                name: results[i].originalAccountId,
                                                value: null,
                                                url: "http://weibo.com/u/" + results[i].originalAccountId
                                            };
                                            frielinks[n] = {
                                                source: results[i].commentAccountId,
                                                target: results[i].originalAccountId,
                                                weight: null
                                            };
                                            n += 1;
                                        }

                                    }
                                    acc.comment = {
                                        "commented": {
                                            "nodes": fansnodes,
                                            "links": fanslinks
                                        },
                                        "comment": {
                                            "nodes": frienodes,
                                            "links": frielinks
                                        }
                                    }
                                    utils.dataPrepared(acc, responseList, function() {
                                        res.json({
                                            'info': acc.info,
                                            'time': acc.time,
                                            'weibo': acc.weibo,
                                            'link_force': acc.link,
                                            'repost': acc.repost,
                                            'comment': acc.comment,
                                            'likesnum': acc.likesnum
                                        });
                                        connection.release();
                                    })
                                }
                                )
                        }

                            // likesnum
                            function fetchLikesnumDataFromServer(accountId) {
                                var sql_likesnum = "select originalAccountId,agreedAccountId from likesnum where  originalAccountId = ? or agreedAccountId = ?;";
                                connection.query(sql_likesnum, [accountId, accountId], function(err, results) {
                                    if (err) {
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
                                    for (var i = 0; i < results.length; i++) {
                                        if (results[i].originalAccountId == accountId) {
                                            fansnodes[m] = {
                                                name: results[i].agreedAccountId,
                                                value: null,
                                                url: "http://weibo.com/u/" + results[i].agreedAccountId
                                            };
                                            fanslinks[m] = {
                                                source: results[i].originalAccountId,
                                                target: results[i].agreedAccountId,
                                                weight: null
                                            };
                                            m += 1;
                                        }
                                        if (results[i].agreedAccountId == accountId) {
                                            frienodes[n] = {
                                                name: results[i].originalAccountId,
                                                value: null,
                                                url: "http://weibo.com/u/" + results[i].originalAccountId
                                            };
                                            frielinks[n] = {
                                                source: results[i].agreedAccountId,
                                                target: results[i].originalAccountId,
                                                weight: null
                                            };
                                            n += 1;
                                        }

                                    }

                                    // console.log(wordcloud);
                                    acc.likesnum = {
                                        "liked": {
                                            "nodes": fansnodes,
                                            "links": fanslinks
                                        },
                                        "like": {
                                            "nodes": frienodes,
                                            "links": frielinks
                                        }
                                    }
                                    utils.dataPrepared(acc, responseList, function() {
                                        res.json({
                                            'info': acc.info,
                                            'time': acc.time,
                                            'weibo': acc.weibo,
                                            'link_force': acc.link,
                                            'repost': acc.repost,
                                            'comment': acc.comment,
                                            'likesnum': acc.likesnum
                                        });
                                        connection.release();
                                    })
                                });
                            }
                        }
                        )
                    }
                }
