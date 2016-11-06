var sql = {
    events: 'SELECT * FROM t_subject WHERE first_name regexp?',
    sinaAccount: 'SELECT * FROM sinaAccount WHERE screenName regexp?'
}

module.exports = sql;
