/**
 * Created by zlm on 2016/12/22.
 */
var conn = require("../../conf/mysql/db");

var Generate = function (req,res,next){
    this.param = "tableName";
    this.tableName = req.body.tableName||"";
};

/**
 * 获取 数据库表信息
 * @param params
 * @param callback
 */
Generate.prototype.getTableList = function(params,callback){
    var sql = " select table_name from information_schema.tables where table_schema = 'demo' and table_type = 'base table' ";
    conn.query(sql,{},function(err,rows,fileds){
        var result = {};
        result.status = "FAILURE";
        if(err){
            console.log(err);
            result.msg = err;
        }else{
            result.status = "SUCCEED";
            result.msg = rows;
            callback(result);
        }
    });
};

/**
 * 获取 表中所有表头信息
 * @param params
 * @param callback
 */
Generate.prototype.getColumnList = function(params,callback){
    var sql = "select column_name,data_type,column_comment from information_schema.columns " +
        "where table_schema = 'demo' AND table_name = '"+params.tableName+"'";
    conn.query(sql,{},function(err,rows,fileds){
        var result = {};
        result.status = "FAILURE";
        if(err){
            console.log(err);
            result.msg = err;
        }else{
            result.status = "SUCCEED";
            result.msg = rows;
            callback(result);
        }
    });
};

module.exports = Generate;