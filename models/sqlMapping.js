var sql = {
    index: {
        events: 'SELECT id,first_name FROM t_subject WHERE first_name regexp?',
        sinaAccount: 'SELECT accountId,screenName,description FROM sinaAccount WHERE screenName regexp?',
        events_top10: 'SELECT id,first_name FROM t_subject ORDER BY id DESC LIMIT 10',
        sinaAccount_top10: 'SELECT accountId,screenName,followersCount FROM sinaAccount ORDER BY followersCount DESC LIMIT 10'
    },
    singleChat: {
        queryById: 'SELECT accountId,content,url,postTime FROM weibo WHERE weiboId =?',
        queryByAccountId: 'SELECT photoUrl,screenName,fetchTime,location,harmLevel FROM sinaAccount WHERE accountId =?'
    },
    accountVis: {
        queryInfoByKeyword: 'SELECT * FROM sinaAccount WHERE screenName =?',
        queryTimeByAccountId: 'SELECT count(*) as weiboSum, sum(commentNum) as commentSum FROM weibo WHERE accountId =? and postTime>',
        queryWeiboByAccountId: 'select weibo.keywordId,weibo.subjectId,sample_keywords.sample_keyword,weibo.content, weibo.weiboId from weibo inner join sample_keywords on weibo.keywordId = sample_keywords.id WHERE weibo.accountId = ?',
        queryLinkByAccountId: 'SELECT followedAccountId, followerAccountId from followrelation where followerAccountId = ? or followedAccountId = ?',
        queryRepostByAccountId: 'select originalAccountId,repostAccountId from repost where originalAccountId not in (select followedAccountId from followrelation) and originalAccountId = ? or repostAccountId = ?'
    }
}

module.exports = sql;
