/**
 * Created by zlm on 2016/12/22.
 */

var db    = {},
    util = require('../../util/Util')(),
     mysql = require('mysql');


db.settings = {
    connectionLimit: 10,
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
 * @param sql 数据查询sql
 * @param params 查询参数
 * @param callback 回调function
 */
db.query = function(sql,params, callback){
    if (!sql) {
        callback();
        return;
    }
    pool.query(sql,params,function(err, rows, fields) {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null,rows, fields);
    });
};

/**
 * 分页数据查询
 * @param tableName 表名称
 * @param params 查询参数
 * @param where 查询条件
 * @param callback 回调function
 */
db.pageQuery = function(tableName,params,where,callback){
	if (!tableName&&!params&&!where) {
        callback();
        return;
    }
	var sql = "select * from "+ tableName +" where "+ where +" "+ params.offset*params.limit +","+ params.limit;
	var sqlTotle = "select count(*) from "+tableName;
    var result = {};
	pool.query(sql,params,function(err, rows, fields) {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        pool.query(sqlTotle,params,function(err, count, fields1) {
        	if (err) {
                console.log(err);
                callback(err, null);
                return;
            }
        	callback(null,rows,count,fields);
        }
    });
};

/**
 * 数据新增
 * @param tableName 表名称
 * @param params 查询参数
 * @param callback 回调function
 */
db.insert = function(tableName,params, callback){
	if (!tableName&&!params) {
        callback();
        return;
    }

    var tableColum = "",
        tableColumCnt = "",
        tableValue = [],
        paramArr = params.param.split(",");
    params.id = util.getUuid();

    for(var colum in paramArr){
        var columValue = paramArr[colum];
        tableColum+=columValue+",";
        tableColumCnt+="?,";
        tableValue.push(params[columValue]);
    }
    tableColum = tableColum.substring(0,tableColum.length-1);
    tableColumCnt = tableColumCnt.substring(0,tableColumCnt.length-1);
    var sql = "insert into "+tableName+"("+tableColum+")values("+tableColumCnt+")";

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
 * @param tableName 表名称
 * @param params 查询参数
 * @param where 查询条件
 * @param callback 回调function
 */
db.update = function(tableName,params,where,callback){
    if (!tableName&&!params&&!where) {
        callback();
        return;
    }

    var tableColum = "",
         tableValue = [],
         paramArr = params.param.split(",");
    for(var colum in paramArr){
        var columValue = paramArr[colum];
        tableColum+=columValue+"=?,";
        tableValue.push(params[columValue]);
    }
    tableColum = tableColum.substring(0,tableColum.length-1);

    var sql = "update "+tableName+" set "+tableColum+" where "+ where ;

    pool.query(sql,tableValue,function(err, result) {
        if (err) {
            console.log(result);
            callback(err, null);
            return;
        }
        callback(null,result);
    });
};

/**
 * 数据删除
 * @param tableName 表名称
 * @param where 查询条件
 * @param callback 回调function
 */
db.delete = function(tableName,where,callback){
	if (!tableName&&!where) {
        callback();
        return;
    }

    var sql = "delete from "+tableName+" where "+ where ;

    pool.query(sql,[],function(err, result) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log(result);
        callback(null,result);
    });
};

module.exports = db;