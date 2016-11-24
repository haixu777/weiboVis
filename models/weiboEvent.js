var mysql = require('../config/mysql');
var sql = require('./sqlMapping');

module.exports = {
    query: function(req, res, next) {
        mysql.lib_pool.getConnection(function(err, connection) {
            connection.query(sql.weiboEvent.queryDataByEventid, [req.query.eventId, req.query.eventId, req.query.eventId], function(err, results) {
                let data = {
                    "Info": [],
                    "Account": [],
                    "Keyword": [],
                    "PeopleNum": [],
                    "weiboNum": []
                };
                data.PeopleNum.length = 30;
                data.weiboNum.length = 30;


                for(let i=0,len=results[0].length; i<len; i++) {
                    // Info
                    if(i==0) {
                        data.Info.push({
                            "Detail": results[0][i].Detail,
                            "Time": results[0][i].Time,
                            "People": results[0][i].People,
                            "Link": 'weibo.com/'+results[0][i].accountId+'/'+results[0][i].Link,
                            "Influence": results[0][i].harmScore
                        });
                    } else {
                        // Account
                        data.Account.push({
                            "weiName": results[0][i].People,
                            "info": {
                                "Detail": results[0][i].Detail,
                                "Time": results[0][i].Time,
                                "People": results[0][i].People,
                                "Link": 'weibo.com/'+results[0][i].accountId+'/'+results[0][i].Link,
                                "Influence": results[0][i].harmScore
                            }
                        });
                    }
                }

                // keyword
                results[1].forEach(function(item) {
                    data.Keyword.push({
                        "Word": item.Word,
                        "Id": item.Id,
                        "Value": item.Id/100000 // 权重以小数的形式返回
                    });
                });

                // PeopleNum & WeiboNum
                let date_now = (new Date()).getDate();
                for(let i=0,len=data.PeopleNum.length; i<len; i++) {
                    for(let j=0; j<results[2].length; j++) {
                        if((date_now-i-1+30)%30 == results[2][j].Date) {
                            data.PeopleNum[i] = { // PeopleNum
                                "date": results[2][j].Date,
                                "Release": results[2][j].ReleaseNum,
                                "Comment": results[2][j].CommentNum,
                                "Repost": results[2][j].RepostNum
                            }
                            data.weiboNum[i] = { // WeiboNum
                                "date": results[2][j].Date,
                                "count": results[2][j].ReleaseNum + results[2][j].CommentNum + results[2][j].RepostNum + results[2][j].likesNum
                            }
                        }
                    }
                }


                res.json(data);
            })
        });
    }
}
