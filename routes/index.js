var express = require('express'),
     router = express.Router(),
     Users = require("../dao/Users");

/**
 * 登录验证。
 * url: /index
 * type: post
 */
router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if(username==null||username==""){
        res.send({status:"error",msg:"用户名不能为空!"});
    }else if(password==null||password==""){
        res.send({status:"error",msg:"密码不能为空!"});
    }else{
        var user = new Users(req,res);
        user.login(user,function(result){
            if(result.status=="SUCCEED"){
                req.session.user = result.msg;
                res.send({status:"success",url:"/"});
            }else{
                res.send({status:"error",msg:"用户名或密码错误!"});
            }
        });
    }
});

module.exports = router;
