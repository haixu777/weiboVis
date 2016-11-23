var sql = {
    index: {
        queryWeiboTop10: 'SELECT weiboId AS Id, content FROM weibo WHERE source=2 OR source=3 ORDER BY repostNum DESC LIMIT 10',
        queryEventTop10: 'SELECT id AS Id, first_name AS content FROM t_subject ORDER BY id DESC LIMIT 10',
        queryAccountTop10: 'SELECT accountId AS Id, screenName AS content FROM sinaAccount ORDER BY harmScore DESC LIMIT 10',
        queryKeywordTop10: 'SELECT id AS Id, sample_keyword AS content FROM sample_keywords ORDER BY id DESC LIMIT 10',
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
        queryTimeByAccountId: 'SELECT DATE_FORMAT(postTime,"%k") posthour, isRepost, count(weiboId) as weiboNum, weiboId, content from weibo where accountId =? GROUP BY posthour,isRepost ORDER BY field(posthour,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24)',
        queryWeiboByAccountId: 'select weibo.keywordId,weibo.subjectId,sample_keywords.sample_keyword,weibo.content, weibo.weiboId, count(weibo.keywordId) as wval from weibo inner join sample_keywords on weibo.keywordId = sample_keywords.id WHERE weibo.accountId =? group by keywordId',
        queryLinkByAccountId: 'SELECT followedAccountId, followedName, followerAccountId, followerName from followrelation where followerAccountId = ? or followedAccountId = ?',
        queryRepostByAccountId: 'select originalAccountId,repostAccountId from repost where originalAccountId = ? or repostAccountId = ?',
        queryCommentByAccountId: 'select originalAccountId,commentAccountId from comment where  originalAccountId = ? or commentAccountId = ?',
        queryLikesnumByAccountId: 'select originalAccountId,agreedAccountId from likesnum where  originalAccountId = ? or agreedAccountId = ?'
    }
}

module.exports = sql;
