/*
 *  create by #{username}
 *  create date #{now} 
 */
var express = require('express'),
	#{className} = require("../../dao/#{path}/#{className}"),
    router = express.Router();



/**
 *  #{name}控制界面跳转.
 *  url: /#{classLowerName}
 */
router.post('/', function(req, res, next) {
    var result = {};
    res.render("#{path}/#{classLowerName}",result);
});

/**
 *  #{name}获取.
 *  url: /#{classLowerName}/list
 */
router.post('/list', function(req, res, next) {
    var result = {};
    var #{classLowerName} = new #{className}(req,res);
        #{classLowerName}.get#{className}List(#{classLowerName},function(data){
        if(data.status=="SUCCEED"){
            result = data.msg;
            res.send(result);
        }
    });
});

/**
 *  菜单新增或修改.
 *  url: /#{classLowerName}/save
 */
router.post('/save', function(req, res, next) {
    var result = {};
    var #{classLowerName} = new #{className}(req,res);
    var id = req.body.id;
    if(id!=null&&id!=""){
    	#{classLowerName}.upd(#{classLowerName},function(data){
            if(data.status=="SUCCEED"){
                result.status = "保存成功";
            }else{
                result.status = "保存失败";
            }
            res.send(result);
        });
    }else{
    	#{classLowerName}.add(#{classLowerName},function(data){
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
 *  #{name}删除.
 *  url: /#{classLowerName}/del
 */
router.post('/del', function(req, res, next) {
    var result = {};
    var #{classLowerName} = new #{className}(req,res);
    var id = req.body.id;
    if(id!=null&&id!=""){
    	#{classLowerName}.del(#{classLowerName},function(data){
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
 *  #{name}新增或修改.
 */
router.post('/check', function(req, res, next) {
    var result = {};
    var #{classLowerName} = new #{className}(req,res);
    #{classLowerName}.check(#{classLowerName},function(data){
        result = data;
        res.send(result);
    });
});

module.exports = router;
