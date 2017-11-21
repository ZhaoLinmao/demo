/*
 *  create by admin
 *  create date 2017-10-2 14:44:27 
 */
var express = require('express'),
	Right = require("../../dao/system/Right"),
    router = express.Router();



/**
 *  权限管理控制界面跳转.
 *  url: /right
 */
router.post('/', function(req, res, next) {
    var result = {};
    res.render("system/right",result);
});

/**
 *  权限列表信息管理.
 *  url: /right/getGrid
 */
router.post('/getGrid', function(req, res, next) {
    var result = {};
    result.columns = [];
    result.columns.push({field: 'id',checkbox: true,align: 'center',valign: 'middle',rowspan: 1,colspan: 1});
    result.columns.push({field: 'name',title: "权限名称",align: 'center',valign: 'middle',rowspan: 1,colspan: 1});
    result.columns.push({field: 'menu_id',title: "菜单选择",align: 'center',valign: 'middle',rowspan: 1,colspan: 1});
    result.columns.push({field: 'add',title: "增",align: 'center',valign: 'middle',rowspan: 1,colspan: 1});
    result.columns.push({field: 'del',title: "删",align: 'center',valign: 'middle',rowspan: 1,colspan: 1});
    result.columns.push({field: 'upd',title: "改",align: 'center',valign: 'middle',rowspan: 1,colspan: 1});
    result.columns.push({field: 'sel',title: "查",align: 'center',valign: 'middle',rowspan: 1,colspan: 1});
    result.columns.push({field: 'imp',title: "导入",align: 'center',valign: 'middle',rowspan: 1,colspan: 1});
    result.columns.push({field: 'exp',title: "导出",align: 'center',valign: 'middle',rowspan: 1,colspan: 1});
    res.send(result);
});

/**
 *  权限管理获取.
 *  url: /right/list
 */
router.post('/list', function(req, res, next) {

    var params = {};
    params.limit = req.body.limit||10;
    params.offset = req.body.offset||0;
    var right = new Right(req,res);

    right.pageQuery(right,function(page){
        if(page.status=="SUCCEED"){
            res.send(page);
        }
    });

});

/**
 *  菜单新增或修改.
 *  url: /right/save
 */
router.post('/save', function(req, res, next) {
    var result = {};
    var right = new Right(req,res);
    var id = req.body.id;
    if(id!=null&&id!=""){
    	right.upd(right,function(data){
            if(data.status=="SUCCEED"){
                result.status = "保存成功";
            }else{
                result.status = "保存失败";
            }
            res.send(result);
        });
    }else{
    	right.add(right,function(data){
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
 *  权限管理删除.
 *  url: /right/del
 */
router.post('/del', function(req, res, next) {
    var result = {};
    var right = new Right(req,res);
    var id = req.body.id;
    if(id!=null&&id!=""){
    	right.del(right,function(data){
            if(data.status=="success"){
                result.status="删除成功"
            }else{
                result.status="删除失败"
            }
            res.send(result);
        });
    }
});

/**
 *  权限管理新增或修改.
 */
router.post('/check', function(req, res, next) {
    var result = {};
    var right = new Right(req,res);
    right.check(right,function(data){
        result = data;
        res.send(result);
    });
});

module.exports = router;
