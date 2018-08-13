/*
 *  create by admin
 *  create date 2017-10-2 14:44:27 
 */
var express = require('express'),
	Right = require("../../dao/system/User"),
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
    var right = new Right(req,res);
    right.pageQuery(right,function(page){
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
    var right = new Right(req,res);
    var id = req.body.id;
    if(id!=null&&id!=""){
    	right.upd(req,right,function(data){
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
    	right.add(req,right,function(data){
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
    var right = new Right(req,res);
    var id = req.body.id;
    if(id!=null&&id!=""){
    	right.del(right,function(data){
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
