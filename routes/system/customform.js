var express = require('express'),
     Menu = require("../../dao/system/Customform"),
     router = express.Router();

/**
 *  自定义表单.
 *  url: /menu/list
 */
router.post('/list', function(req, res, next) {
    var result = {};
    var menu = new Menu(req,res);
    menu.getMenuList(menu,function(data){
        if(data.status=="SUCCEED"){
            result = data.msg;
            res.send(result);
        }
    });
});

/**
 *  自定义表单 控制界面跳转.
 *  url: /customform
 */
router.post('/', function(req, res, next) {
    var result = {};
    res.render("system/admin-customform",result);
});

/**
 *  自定义表单 新增或修改.
 */
router.post('/save', function(req, res, next) {
    var result = {};
    var menu = new Menu(req,res);
    var id = req.body.id;
    if(id!=null&&id!=""){
        menu.upd(menu,function(data){
            if(data.status=="SUCCEED"){
                result.status = "保存成功";
            }else{
                result.status = "保存失败";
            }
            res.send(result);
        });
    }else{
        menu.add(menu,function(data){
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
 *  自定义表单 删除.
 */
router.post('/del', function(req, res, next) {
    var result = {};
    var menu = new Menu(req,res);
    var id = req.body.id;
    if(id!=null&&id!=""){
        menu.del(menu,function(data){
            if(data.status=="SUCCEED"){
                result.status="删除成功"
            }else{
                result.status="删除失败"
            }
            res.send(result);
        });
    }
});


module.exports = router;
