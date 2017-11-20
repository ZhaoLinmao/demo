/*
 *  create by admin
 *  create date 2017-10-1 14:29:31 
 */
var express = require('express'),
	Role = require("../../dao/system/Role"),
    router = express.Router();



/**
 *  角色管理控制界面跳转.
 *  url: /role
 */
router.post('/', function(req, res, next) {
    var result = {};
    res.render("system/role",result);
});

/**
 *  角色管理获取.
 *  url: /role/list
 */
router.post('/list', function(req, res, next) {
    var result = {};
    var role = new Role(req,res);
        role.getRoleList(role,function(data){
        if(data.status=="SUCCEED"){
            result = data.msg;
            res.send(result);
        }
    });
});

/**
 *  菜单新增或修改.
 *  url: /role/save
 */
router.post('/save', function(req, res, next) {
    var result = {};
    var role = new Role(req,res);
    var id = req.body.id;
    if(id!=null&&id!=""){
    	role.upd(role,function(data){
            if(data.status=="SUCCEED"){
                result.status = "保存成功";
            }else{
                result.status = "保存失败";
            }
            res.send(result);
        });
    }else{
    	role.add(role,function(data){
            if(data.status=="SUCCEED"){
                result.status = "保存成功";
            }else{
                result.status = "保存失败";
            }
            res.send(result);
        });
    }
});

/**
 *  角色管理删除.
 *  url: /role/del
 */
router.post('/del', function(req, res, next) {
    var result = {};
    var role = new Role(req,res);
    var id = req.body.id;
    if(id!=null&&id!=""){
    	role.del(role,function(data){
            if(data.status=="success"){
                result.status="删除成功"
            }else{
                result.status="删除失败"
            }
            res.send(result);
        });
    }
});


module.exports = router;
