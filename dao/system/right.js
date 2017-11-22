/*
 *  create by admin
 *  create date 2017-10-2 14:44:27 
 */
var conn = require("../../conf/mysql/db");

var Right = function (req,res,next){
    this.param = "id,menu_id,add,del,upd,sel,imp,exp";
    this.id = req.body.id||"";
    this.menu_id = req.body.menu_id||"";
    this.add = req.body.add||"";
    this.del = req.body.del||"";
    this.upd = req.body.upd||"";
    this.sel = req.body.sel||"";
    this.imp = req.body.imp||"";
    this.exp = req.body.exp||"";
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
Right.prototype.add = function(params,callback){
    var table=tableName;
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
Right.prototype.upd = function(params,callback){
    var table=tableName,
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

/**
 * 权限管理检测存在子节点
 * @param params
 * @param callback
 */
Right.prototype.check = function(params,callback){
    var table=tableName,
        where="pid='"+params.id+"'";
    conn.checkSize(table,params,where,function(err,count){
        var result = {};
        result.status = "FAILURE";
        if(err){
            console.log(err);
            result.msg = err;
        }else{
            result.status = "SUCCEED";
            result.msg = count;
            callback(result);
        }
    });
};

module.exports = Right;