/*
 *  create by #{username}
 *  create date #{now} 
 */
var conn = require("../conf/mysql/db");

var #{className} = function (req,res,next){
    this.param = "#{{list}}#{value},#{{/list}}";
    #{{list}}
    this.#{value} = req.body.#{value}||"";
    #{{/list}}
};

/**
 * #{name}列表获取
 * @param params
 * @param callback
 */
#{className}.prototype.get#{className}List = function(params,callback){
    var sql = "select * from #{tableName}";
    conn.query(sql,[],function(err,rows,fileds){
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
 * #{name}新增
 * @param params
 * @param callback
 */
#{className}.prototype.add = function(params,callback){
    var table="#{tableName}";
    conn.insert(table,params,function(err,rows){
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
 * 菜单修改
 * @param params
 * @param callback
 */
#{className}.prototype.upd = function(params,callback){
    var table="#{tableName}",
         where="id='"+params.id+"'";
    conn.update(table,params,where,function(err,rows){
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
 * #{name}删除
 * @param params
 * @param callback
 */
#{className}.prototype.del = function(params,callback){
    var table="#{tableName}",
        where="id='"+params.id+"'";
    conn.delete(table,where,function(err,result){

        result.status = "FAILURE";
        if(err){
            console.log(err);
            result.msg = err;
        }else{
            result.status = "SUCCEED";
            callback(result);
        }
    });
};

module.exports = #{className};