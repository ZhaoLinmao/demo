/*
 *  create by admin
 *  create date 2018年8月16日 09:46:16
 */
var express = require('express'),
    Dao = require("../../dao/system/User"),
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
 *  url: /user/slist
 */
router.post('/slist', function(req, res, next) {
    var dao = new Dao(req,res);
    dao.getUserList(dao,function(page){
        if(page.status=="SUCCEED"){
            res.send(page);
        }
    });
});

/**
 *  用户管理获取.
 *  url: /user/list
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
 *  用户新增或修改.
 *  url: /user/save
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
 *  用户管理删除.
 *  url: /user/del
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
