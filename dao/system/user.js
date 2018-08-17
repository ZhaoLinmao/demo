/*
 *  create by admin
 *  create date 2018年8月16日 09:47:48
 */
var conn = require("../../conf/mysql/db");

var User = function (req,res,next){
    this.param = "id,username,password,nick,photo,email,phone,qq,weixin,openid,position,org_id,org_name,role,role_name";
    this.id = req.body.id||"";
    this.username = req.body.username||"";
    this.password = req.body.password||"";
    this.nick = req.body.nick||"";
    this.photo = req.body.photo||"";
    this.email = req.body.email||"";
    this.phone = req.body.phone||"";
    this.qq = req.body.qq||"";
    this.weixin = req.body.weixin||"";
    this.openid = req.body.openid||"";
    this.position = req.body.position||"";
    this.org_id = req.body.org_id||"";
    this.org_name = req.body.org_name||"";
    this.role = req.body.role||"";
    this.role_name = req.body.role_name||"";
    this.name = req.body.name||"";
    this.searchRole = req.body.searchRole||"";
    this.searchRoleName = req.body.searchRoleName||"";
    this.userOrg_id = req.body.userOrg_id||"";
    this.userOrg_name = req.body.userOrg_name||"";
    this.limit = req.body.limit||10;
    this.offset = req.body.offset||0;
};

var tableName = "sys_user";
/**
 * 用户管理列表获取
 * @param params
 * @param callback
 */
User.prototype.getUserList = function(params,callback){
    var sql = "select * from "+tableName;
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
 * 用户管理列表获取
 * @param params
 * @param callback
 */
User.prototype.pageQuery = function(params,callback){
    var role_ids = "",org_id="";
    if(params.searchRole!=""&&params.searchRole!=undefined){
        var userRoleIdArr = params.searchRole.split(",",-1);
        for(var r in userRoleIdArr){
            role_ids += " and role_id like '%"+userRoleIdArr[r]+"%' ";
        }
    }
    if(params.userOrg_id!=""&&params.userOrg_id!=undefined){
        org_id += " and org_id = '"+params.userOrg_id+"' ";
    }
    var table=tableName,
        where="1=1 and username like '%"+params.name+"%' "+role_ids+" "+org_id+" ",
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
 * 用户管理新增
 * @param params
 * @param callback
 */
User.prototype.add = function(req,params,callback){
    var table=tableName;
    params.password="111111";
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
 * 用户修改
 * @param params
 * @param callback
 */
User.prototype.upd = function(req,params,callback){
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
 * 用户管理删除
 * @param params
 * @param callback
 */
User.prototype.del = function(params,callback){
    var table=tableName,
        where="id in ('"+params.id+"')";
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

module.exports = User;