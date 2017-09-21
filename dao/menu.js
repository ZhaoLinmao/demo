/**
 * Created by zlm on 2016/12/22.
 */
var conn = require("../conf/mysql/db");

var Menu = function (req,res,next){
    this.id = req.body.id||"";
    this.url = req.body.url||"";
    this.name = req.body.name||"";
    this.icon = req.body.icon||"";
    this.parentId = req.body.parentId||"";
};

/**
 * 菜单列表获取
 * @param params
 * @param callback
 */
Menu.prototype.getMenuList = function(params,callback){
    var sql = "select * from sys_menu";
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

module.exports = Menu;