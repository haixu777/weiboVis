var sql = {
    index: {
        queryWeiboTop10: 'SELECT weiboId AS Id, content FROM weibo ORDER BY repostNum DESC LIMIT 10',
        queryEventTop10: 'SELECT id AS Id, sample_keyword AS content FROM sample_keywords ORDER BY id DESC LIMIT 10',
        queryAccountTop10: 'SELECT accountId AS Id, screenName AS content FROM sinaAccount ORDER BY followersCount DESC LIMIT 10',
        queryWeiboByKeyword: 'SELECT weiboId AS Id, content FROM weibo WHERE content regexp?',
        queryEventByKeyword: 'SELECT id AS Id, sample_keyword AS content FROM sample_keywords WHERE sample_keyword regexp?',
        queryAccountByKeyword: 'SELECT accountId AS Id, screenName AS content FROM sinaAccount WHERE screenName regexp?'
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
