/*
 *  create by admin
 *  create date 2017-10-1 14:29:31 
 */
var express = require('express'),
    Dao = require("../../dao/system/Role"),
    router = express.Router();



/**
 *  角色管理控制界面跳转.
 *  url: /role
 */
router.post('/', function(req, res, next) {
    var result = {};
    res.render("system/admin-role",result);
});

/**
 *  角色管理获取.
 *  url: /role/list
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
 *  角色新增或修改.
 *  url: /right/save
 */
router.post('/save', function(req, res, next) {
    console.log(req.body);
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
 *  角色管理删除.
 *  url: /right/del
 */
router.post('/del', function(req, res, next) {
    var result = {};
    var dao = new Dao(req,res);
    var id = req.body.id;
    console.log(id);
    if(id!=null&&id!=""){
        dao.del(dao,function(data){
            if(data.status=="SUCCEED"){
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
