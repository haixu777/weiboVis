var sql = {
    index: {
        events: 'SELECT * FROM t_subject WHERE first_name regexp?',
        sinaAccount: 'SELECT accountId,screenName,description FROM sinaAccount WHERE screenName regexp?',
        events_top10: 'SELECT * FROM t_subject ORDER BY rand() LIMIT 10',
        sinaAccount_top10: 'SELECT accountId,screenName,followersCount FROM sinaAccount ORDER BY followersCount DESC LIMIT 10'
    },
    singleChat: {
        queryById: 'SELECT * FROM weibo WHERE weiboId =?'
    }
}

module.exports = sql;
