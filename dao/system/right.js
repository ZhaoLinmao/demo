/*
 *  create by admin
 *  create date 2017-10-0 20:11:30 
 */
var conn = require("../../conf/mysql/db");

var Right = function (req,res,next){
    this.param = "id,url,name,icon,pid,pName,turn,newpage";
    
    this.id = req.body.id||"";
    
    this.url = req.body.url||"";
    
    this.name = req.body.name||"";
    
    this.icon = req.body.icon||"";
    
    this.pid = req.body.pid||"";
    
    this.pName = req.body.pName||"";
    
    this.turn = req.body.turn||"";
    
    this.newpage = req.body.newpage||"";
    
};

/**
 * 权限管理列表获取
 * @param params
 * @param callback
 */
Right.prototype.getRightList = function(params,callback){
    var sql = "select * from sys_right";
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
 * 权限管理新增
 * @param params
 * @param callback
 */
Right.prototype.add = function(params,callback){
    var table="sys_right";
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
    var table="sys_right",
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
    var table="sys_right",
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