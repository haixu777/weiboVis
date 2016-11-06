var sql = {
    events: 'SELECT * FROM t_subject WHERE first_name regexp?',
    sinaAccount: 'SELECT * FROM sinaAccount WHERE screenName regexp?',
    events_top10: 'SELECT * FROM t_subject order by rand() limit 10',
    sinaAccount_top10: 'select max(followersCount) from sinaAccount limit 10'
}

module.exports = sql;
