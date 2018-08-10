/*
 *  create by admin
 *  create date 2017-10-2 14:44:27 
 */
var conn = require("../../conf/mysql/db");

var Right = function (req,res,next){
    this.param = "id,name,menu_id,a,d,u,s,i,e";
    this.id = req.body.id||"";
    this.name = req.body.name||"";
    this.menu_id = req.body.menu_id||"";
    this.a = req.body.a||"";
    this.d = req.body.d||"";
    this.u = req.body.u||"";
    this.s = req.body.s||"";
    this.i = req.body.i||"";
    this.e = req.body.e||"";
    this.limit = req.body.limit||10;
    this.offset = req.body.offset||0;
};

var tableName = "sys_right";
/**
 * 权限管理列表获取
 * @param params
 * @param callback
 */
Right.prototype.pageQuery = function(params,callback){
    var table=tableName,
         where="1=1",
         result={};
    conn.pageQuery(table,params,where,function(err,rows,count,fields){
        if(err){
            console.log(err);
            result.msg = err;
        }else{
            result.status = "SUCCEED";
            result.total = count;
            result.rows = rows;
            callback(result);
        }
    });
};

/**
 * 权限管理新增
 * @param params
 * @param callback
 */
Right.prototype.add = function(req,params,callback){
    var table=tableName;
    conn.insert(req,table,params,function(err,rows){
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
Right.prototype.upd = function(req,params,callback){
    var table=tableName,
         where="id='"+params.id+"'";
    conn.update(req,table,params,where,function(err,rows){
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
 * 权限管理删除
 * @param params
 * @param callback
 */
Right.prototype.del = function(params,callback){
    var table=tableName,
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

module.exports = Right;