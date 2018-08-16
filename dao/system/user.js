/*
 *  create by admin
 *  create date 2018年8月16日 09:47:48
 */
var conn = require("../../conf/mysql/db");

var User = function (req,res,next){
    this.param = "id,username,password,nick,photo,email,phone,qq,weixin,openid,position";
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
    this.limit = req.body.limit||10;
    this.offset = req.body.offset||0;
};

var tableName = "sys_user";
/**
 * 权限管理列表获取
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
 * 权限管理列表获取
 * @param params
 * @param callback
 */
User.prototype.pageQuery = function(params,callback){
    var menu_ids = "";
    if(params.rightMenuId!=""&&params.rightMenuId!=undefined){
        var rightMenuIdArr = params.rightMenuId.split(",",-1);
        for(var r in rightMenuIdArr){
            menu_ids += " and org_id like '%"+rightMenuIdArr[r]+"%' ";
        }
    }
    var table=tableName,
        where="1=1 and username like '%"+params.rightName+"%' "+menu_ids+" ",
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
User.prototype.add = function(req,params,callback){
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
 * 权限修改
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
 * 权限管理删除
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