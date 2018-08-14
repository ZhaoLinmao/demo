/*
 *  create by admin
 *  create date 2017-10-2 14:44:27 
 */
var express = require('express'),
	Dao = require("../../dao/system/Right"),
    router = express.Router();



/**
 *  权限管理控制界面跳转.
 *  url: /right
 */
router.post('/', function(req, res, next) {
    var result = {};
    res.render("system/admin-right",result);
});

/**
 *  权限管理获取.
 *  url: /right/list
 */
router.post('/list', function(req, res, next) {
    var dao = new Dao(req,res);
    dao.pageQuery(dao,function(page){
        if(page.status=="SUCCEED"){
            res.send(page);
        }
    });
});

/**
 *  权限新增或修改.
 *  url: /right/save
 */
router.post('/save', function(req, res, next) {
    var result = {};
    var dao = new Dao(req,res);
    var id = req.body.id;
    if(id!=null&&id!=""){
    	dao.upd(req,dao,function(data){
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
    	dao.add(req,dao,function(data){
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
 *  权限管理删除.
 *  url: /right/del
 */
router.post('/del', function(req, res, next) {
    var result = {};
    var dao = new Dao(req,res);
    var id = req.body.id;
    if(id!=null&&id!=""){
    	dao.del(dao,function(data){
            result.status = data.status;
            if(data.status=="SUCCEED"){
                result.msg = "删除成功";
            }else{
                result.msg="删除失败";
            }
            res.send(result);
        });
    }
});

module.exports = router;
