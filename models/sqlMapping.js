var sql = {
    events: 'SELECT * FROM t_subject WHERE first_name regexp?',
    sinaAccount: 'SELECT accountId,screenName,description FROM sinaAccount WHERE screenName regexp?',
    events_top10: 'SELECT * FROM t_subject order by rand() limit 10',
    sinaAccount_top10: 'select accountId,screenName,followersCount FROM sinaAccount order by followersCount desc limit 10'
}

module.exports = sql;
