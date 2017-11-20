/*
 *  create by admin
 *  create date 2017-10-1 14:29:31 
 */
var conn = require("../../conf/mysql/db");

var Role = function (req,res,next){
    this.param = "id,right_id,add,del,upd,sel,imp,exp";
    
    this.id = req.body.id||"";
    
    this.right_id = req.body.right_id||"";
    
    this.add = req.body.add||"";
    
    this.del = req.body.del||"";
    
    this.upd = req.body.upd||"";
    
    this.sel = req.body.sel||"";
    
    this.imp = req.body.imp||"";
    
    this.exp = req.body.exp||"";
    
};

/**
 * 角色管理列表获取
 * @param params
 * @param callback
 */
Role.prototype.getRoleList = function(params,callback){
    var sql = "select * from sys_role";
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
 * 角色管理新增
 * @param params
 * @param callback
 */
Role.prototype.add = function(params,callback){
    var table="sys_role";
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
Role.prototype.upd = function(params,callback){
    var table="sys_role",
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
 * 角色管理删除
 * @param params
 * @param callback
 */
Role.prototype.del = function(params,callback){
    var table="sys_role",
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

module.exports = Role;