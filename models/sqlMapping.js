var sql = {
    index: {
        events: 'SELECT * FROM t_subject WHERE first_name regexp?',
        sinaAccount: 'SELECT accountId,screenName,description FROM sinaAccount WHERE screenName regexp?',
        events_top10: 'SELECT id,first_name FROM t_subject ORDER BY id DESC LIMIT 10',
        sinaAccount_top10: 'SELECT accountId,screenName,followersCount FROM sinaAccount ORDER BY followersCount DESC LIMIT 10'
    },
    singleChat: {
        queryById: 'SELECT accountId,content,url,postTime FROM weibo WHERE weiboId =?',
        queryByAccountId: 'SELECT photoUrl,screenName,fetchTime,location,harmLevel FROM sinaAccount WHERE accountId =?'
    }
}

module.exports = sql;
