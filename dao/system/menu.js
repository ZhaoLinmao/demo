/**
 * Created by zlm on 2016/12/22.
 */
var conn = require("../../conf/mysql/db");

var Menu = function (req,res,next){
    this.param = "id,url,name,icon,pid,pName,newpage,turn";
    this.id = req.body.id||"";
    this.url = req.body.url||"";
    this.name = req.body.name||"";
    this.icon = req.body.icon||"";
    this.pid = req.body.pid||"";
    this.pName = req.body.pName||"";
    this.newpage = req.body.newpage||0;
    this.turn = req.body.turn||30;
};

/**
 * 菜单列表获取
 * @param params
 * @param callback
 */
Menu.prototype.getMenuList = function(params,callback){
    var sql = "select * from sys_menu order by turn asc";
    conn.query(sql,[params.username],function(err,rows,fileds){
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
 * 菜单新增
 * @param params
 * @param callback
 */
Menu.prototype.add = function(params,callback){
    var table="sys_menu";
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
Menu.prototype.upd = function(params,callback){
    var table="sys_menu",
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
 * 菜单删除
 * @param params
 * @param callback
 */
Menu.prototype.del = function(params,callback){
    var table="sys_menu",
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
 * 菜单检测存在子节点
 * @param params
 * @param callback
 */
Menu.prototype.check = function(params,callback){
    var table="sys_menu",
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

module.exports = Menu;