# encoding=utf-8
# import DFS
import json
import sys

import MySQLdb
# import mysql.connector
import networkx as nx


def Account(nx, graph, source):
    T = nx.dfs_successors(graph, source)
    #print T
    singletemp = []
    for ii in range(0, len(T[source])):
        single = T[source][ii]
        singleaccount = {}
        singleaccount['weiName'] = single
        singleaccount['info'] = ''
        singletemp.append(singleaccount)
    return singletemp


def Path(nx, graph, source):
    T = nx.dfs_successors(graph, source)

    children = {}
    singletemp = []
    for ii in range(0, len(T[source])):
        single = T[source][ii]

        singleinfo = {}
        singleinfo['name'] = single
        singleinfo['info'] = ''
        if single in T:
            singleinfo['children'] = Path(nx, graph, single)
    return children


def SingleWeiboPath(nx, graph, source):
    #source = '2076340027'
    Response = {}
    data = {}
    Info = {}
    Info['Content'] = ''
    Info['url'] = ''
    Info['people'] = ''
    Info['time'] = ''
    Info['Influence'] = ''
    data['name'] = source
    data['info'] = ''
    data['children'] = Path(nx, G, source)
    Response['Info'] = Info
    Response['Account'] = Account(nx, G, source)
    Response['Path'] = data
    return Response

conn = MySQLdb.connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='123qwe',
        db='accountDB',
        charset='utf8'
        )
cur = conn.cursor()

# print "Connection Successful"
G = nx.DiGraph()

# 获得content
cur.execute("set sql_mode=\"\"")  #reset the sql_mode to solve only_full_group_by problem
aa = cur.execute("SELECT GROUP_CONCAT(originalWeiboId ORDER BY repostNum desc), GROUP_CONCAT(cast(repostNum as char) ORDER BY repostNum desc), GROUP_CONCAT(originalAccountId ORDER BY repostNum desc), repostAccountId, repostWeiboId FROM `repost`,(select repostNum, weiboId from weibo where source!=1 and isRepostFetched=1) AS B where repost.originalWeiboId = B.weiboId group by repostWeiboId")

# 打印表中的多少数据
info = cur.fetchmany(aa)
key_dic = {}
for ii in info:
    originalWeiboId = ii[0]
    originalAccountId = ii[2]
    repostAccountId = ii[3]
    accountId = originalAccountId.split(',')
    key_dic[originalWeiboId] = accountId[0]
    for jj in range(0, len(accountId)):
        if(jj > 0):
            G.add_node(accountId[jj-1])
            G.add_node(accountId[jj])
            G.add_edge(accountId[jj-1], accountId[jj], weiboId=originalWeiboId)
    G.add_node(repostAccountId)
    G.add_edge(accountId[jj], repostAccountId, weiboId=originalWeiboId)

Result = []
# for (key,value) in key_dic.items():
#    singleWeibo = {}
#    singleWeibo['weiboId'] = key
#    singleWeibo['Response'] = SingleWeiboPath(nx, G, value)
#    Result.append(singleWeibo)
singleWeibo = {}
value = sys.argv[1]
singleWeibo['Response'] = SingleWeiboPath(nx, G, value)
Result.append(singleWeibo)
resultJson = json.dumps(Result,sort_keys=True)
print(resultJson)
with open('Response.json', 'w') as f:
    f.write(json.dumps(Result))

cur.close()
conn.commit()
conn.close()
