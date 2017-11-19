/*
 *  create by admin
 *  create date 2017-10-5 22:11:9 
 */
var conn = require("../../conf/mysql/db");

var Org = function (req,res,next){
    this.param = "id,name,pid,pName,turn";
    
    this.id = req.body.id||"";
    
    this.name = req.body.name||"";
    
    this.pid = req.body.pid||"";
    
    this.pName = req.body.pName||"";
    
    this.turn = req.body.turn||"";
    
};

/**
 * 部门管理列表获取
 * @param params
 * @param callback
 */
Org.prototype.getOrgList = function(params,callback){
    var sql = "select * from sys_org";
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
 * 部门管理新增
 * @param params
 * @param callback
 */
Org.prototype.add = function(params,callback){
    var table="sys_org";
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
Org.prototype.upd = function(params,callback){
    var table="sys_org",
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
 * 部门管理删除
 * @param params
 * @param callback
 */
Org.prototype.del = function(params,callback){
    var table="sys_org",
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

module.exports = Org;