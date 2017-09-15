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
Menu.prototype.getListByInfo = function(params,callback){
    var sql = "select * from menu";
    conn.query(sql,[params.username],function(err,rows,fileds){
        var result = {};
        result.status = "FAILURE";
        if(err){
            console.log(err);
            result.msg = err;
        }else{
            if(rows.length===0){
                result.msg = "该用户不存在!";
            }else if(params.password!=rows[0].password){
                result.msg = "密码错误!"
            }else{
                result.status = "SUCCEED";
                result.msg = rows[0];
            }
            console.log(result);
            callback(result);
        }
    });
};

module.exports = Menu;