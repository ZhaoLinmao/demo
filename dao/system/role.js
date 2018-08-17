/*
 *  create by admin
 *  create date 2017-10-1 14:29:31 
 */
var conn = require("../../conf/mysql/db");

var Role = function (req,res,next){
    this.param = "id,name,right,rightName";
    this.id = req.body.id||"";
    this.name = req.body.name||"";
    this.right = req.body.right||"";
    this.rightName = req.body.rightName||"";
    this.roleName = req.body.roleName||"";
    this.searchRight = req.body.searchRight||"";
    this.searchRightName = req.body.searchRightName||"";
    this.limit = req.body.limit||10;
    this.offset = req.body.offset||0;
};

var tableName = "sys_role";


/**
 * 角色信息管理列表获取
 * @param params
 * @param callback
 */
Role.prototype.getRoleList = function(params,callback){
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
 * 角色管理列表获取
 * @param params
 * @param callback
 */
Role.prototype.pageQuery = function(params,callback){
    var ids = "";
    if(params.searchRight!=""&&params.searchRight!=undefined){
        var rightIdArr = params.searchRight.split(",",-1);
        for(var r in rightIdArr){
            ids += " and `right` like '%"+rightIdArr[r]+"%' ";
        }
    }
    var table=tableName,
        where="1=1 and `name` like '%"+params.roleName+"%' "+ids+" ",
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
 * 角色管理新增
 * @param params
 * @param callback
 */
Role.prototype.add = function(req,params,callback){
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
 * 角色修改
 * @param params
 * @param callback
 */
Role.prototype.upd = function(req,params,callback){
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
 * 角色管理删除
 * @param params
 * @param callback
 */
Role.prototype.del = function(params,callback){
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

module.exports = Role;