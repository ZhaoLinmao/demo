/**
 * Created by zlm on 2016/12/22.
 */
var conn = require("../../conf/mysql/db");

var Users = function (req,res,next){
    this.param = "username,password";
    this.username = req.body.username||"";
    this.password = req.body.password||"";
};

/**
 * 用户登录验证
 * @param params
 * @param callback
 */
Users.prototype.login = function(params,callback){
    var sql = "select * from sys_user where username = ?";
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
            callback(result);
        }
    });
};

module.exports = Users;