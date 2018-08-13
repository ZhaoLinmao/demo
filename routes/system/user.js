/*
 *  create by admin
 *  create date 2017-10-2 14:44:27 
 */
var express = require('express'),
    User = require("../../dao/system/User"),
    router = express.Router();



/**
 *  用户管理控制界面跳转.
 *  url: /user
 */
router.post('/', function(req, res, next) {
    var result = {};
    res.render("system/admin-user",result);
});

/**
 *  用户管理获取.
 *  url: /user/list
 */
router.post('/list', function(req, res, next) {
    var user = new User(req,res);
    user.pageQuery(user,function(page){
        if(page.status=="SUCCEED"){
            res.send(page);
        }
    });
});

/**
 *  用户新增或修改.
 *  url: /user/save
 */
router.post('/save', function(req, res, next) {
    var result = {};
    var user = new User(req,res);
    var id = req.body.id;
    if(id!=null&&id!=""){
    	user.upd(req,user,function(data){
            if(data.status=="SUCCEED"){
                result.status = data.status;
                result.msg = "保存成功";
            }else{
                result.status = data.status;
                result.msg = "保存失败";
            }
            res.send(result);
        });
    }else{
    	user.add(req,user,function(data){
            if(data.status=="SUCCEED"){
                result.status = data.status;
                result.msg = "保存成功";
            }else{
                result.status = data.status;
                result.msg = "保存失败";
            }
            res.send(result);
        });
    }
});

/**
 *  用户管理删除.
 *  url: /user/del
 */
router.post('/del', function(req, res, next) {
    var result = {};
    var user = new User(req,res);
    var id = req.body.id;
    if(id!=null&&id!=""){
    	user.del(user,function(data){
            if(data.status=="success"){
                result.status = data.status;
                result.msg = "删除成功";
            }else{
                result.status = data.status;
                result.msg="删除失败";
            }
            res.send(result);
        });
    }
});

module.exports = router;
