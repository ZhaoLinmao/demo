/**
 * Created by zlm on 2016/12/22.
 */

var db    = {},
    util = require('../../util/Util')(),
    dateUtil = require('../../util/DateUtil')(),
    mysql = require('mysql');
var log = require('../../util/log/logger4j');

db.settings = {
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password : 'jadite',
    port: '3366',
    database: 'demo',
    checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds.
    expiration: 86400000,// The maximum age of a valid session; milliseconds.
    createDatabaseTable: true,// Whether or not to create the sessions database table, if one does not already exist.
    connectionLimit: 1,// Number of connections when creating a connection pool
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};

db.conf = {
    connectionLimit : 100,
    host            : 'localhost',
    user            : 'root',
    password        : 'jadite',
    port        : '3366',
    database        : 'demo'
};
var pool  = mysql.createPool(db.conf);

/**
 * 数据查询
 * @param sql 查询sql
 * @param params 查询参数
 * @param callback 回调函数function
 */
db.query = function(sql,params, callback){
    if (!sql) {
        callback();
        return;
    }
    log.info(sql);
    pool.query(sql,params,function(err, rows, fields) {
        if (err) {
            console.error(err);
            callback(err, null);
            return;
        }
        callback(null,rows, fields);
    });
};

/**
 * 数据查询
 * @param sql 查询sql
 * @param params 查询参数
 * @param callback 回调函数function
 */
db.checkSize = function(tableName,params,where,callback){
    if (!where) {
        callback();
        return;
    }
    var sql = " select count(*) as cnt from "+tableName+" where "+where;
    log.info(sql);
    pool.query(sql,{},function(err, count, fields) {
        if (err) {
            console.error(err);
            callback(err, null);
            return;
        }
        callback(null,count[0].cnt, fields);
    });
};

/**
 * 分页数据查询
 * @param tableName 查询表名
 * @param params 查询参数
 * @param where 查询条件
 * @param callback 回调函数function
 */
db.pageQuery = function(tableName,params,where,callback){
	if (!tableName&&!params&&!where) {
        callback();
        return;
    }
	var sql = "select * from "+ tableName +" where "+ where +" limit "+ params.offset +","+ params.limit;
	var sqlTotle = "select count(*) as cnt from "+tableName;
    log.info(sql);
	pool.query(sql,params,function(err, rows, fields) {
        if (err) {
            log.error(err);
            callback(err, null);
            return;
        }
        pool.query(sqlTotle,params,function(err, count, fields1) {
        	if (err) {
                log.error(err);
                callback(err, null);
                return;
            }
        	callback(null,rows,count[0].cnt,fields);
        })
    });
};

/**
 * 数据新增
 * @param tableName 查询表名
 * @param params 查询参数
 * @param callback 回调函数function
 */
db.insert = function(req,tableName,params, callback){
	if (!tableName&&!params) {
        callback();
        return;
    }

    var tableColum = "",
        tableColumCnt = "",
        tableValue = [],
        paramArr = [];
        if(params.param!=undefined){
            paramArr = params.param.split(",",-1);
        }
        paramArr.push("createby");
        paramArr.push("createtime");
    params.id = util.getUuid();
    params.createby = req.session.user.username;
    params.createtime = dateUtil.getYYMMDDHHMISS();
    for(var colum in paramArr){
        var columValue = paramArr[colum];
        tableColum+="`"+columValue+"`,";
        tableColumCnt+="?,";
        tableValue.push(params[columValue]);
    }
    tableColum = tableColum.substring(0,tableColum.length-1);
    tableColumCnt = tableColumCnt.substring(0,tableColumCnt.length-1);
    var sql = "insert into "+tableName+"("+tableColum+")values("+tableColumCnt+")";
    log.info(sql);
    pool.query(sql,tableValue,function(err, result) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null,result);
    });
};

/**
 * 数据更新
 * @param tableName 查询表名
 * @param params 查询参数
 * @param where 查询条件
 * @param callback 回调函数function
 */
db.update = function(req,tableName,params,where,callback){
    if (!tableName&&!params&&!where) {
        callback();
        return;
    }

    var tableColum = "",
         tableValue = [],
         paramArr = [];
    if(params.param){
        paramArr = params.param.split(",",-1);
    }
    paramArr.push("updateby");
    paramArr.push("updatetime");
    params.updateby = req.session.user.username;
    params.updatetime = dateUtil.getYYMMDDHHMISS();

    for(var colum in paramArr){
        var columValue = paramArr[colum];
        tableColum+="`"+columValue+"`=?,";
        tableValue.push(params[columValue]);
    }
    tableColum = tableColum.substring(0,tableColum.length-1);

    var sql = "update "+tableName+" set "+tableColum+" where "+ where ;
    log.info(sql);
    pool.query(sql,tableValue,function(err, result) {
        if (err) {
            log.error(result);
            callback(err, null);
            return;
        }
        callback(null,result);
    });
};

/**
 * 数据删除
 * @param tableName 查询表名
 * @param where 查询条件
 * @param callback 回调函数function
 */
db.delete = function(tableName,where,callback){
	if (!tableName&&!where) {
        callback();
        return;
    }

    var sql = "delete from "+tableName+" where "+ where ;
    log.info(sql);
    pool.query(sql,[],function(err, result) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null,result);
    });
};

module.exports = db;