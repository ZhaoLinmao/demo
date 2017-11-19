/*
 *  create by admin
 *  create date 2017-10-5 22:11:9 
 */
var express = require('express'),
	Org = require("../../dao/system/Org"),
    router = express.Router();



/**
 *  部门管理控制界面跳转.
 *  url: /org
 */
router.post('/', function(req, res, next) {
    var result = {};
    res.render("system/org",result);
});

/**
 *  部门管理获取.
 *  url: /org/list
 */
router.post('/list', function(req, res, next) {
    var result = {};
    var org = new Org(req,res);
        org.getOrgList(org,function(data){
        if(data.status=="SUCCEED"){
            result = data.msg;
            res.send(result);
        }
    });
});

/**
 *  菜单新增或修改.
 *  url: /org/save
 */
router.post('/save', function(req, res, next) {
    var result = {};
    var org = new Org(req,res);
    var id = req.body.id;
    if(id!=null&&id!=""){
    	org.upd(org,function(data){
            if(data.status=="SUCCEED"){
                result.status = "保存成功";
            }else{
                result.status = "保存失败";
            }
            res.send(result);
        });
    }else{
    	org.add(org,function(data){
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
 *  部门管理删除.
 *  url: /org/del
 */
router.post('/del', function(req, res, next) {
    var result = {};
    var org = new Org(req,res);
    var id = req.body.id;
    if(id!=null&&id!=""){
    	org.del(org,function(data){
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
