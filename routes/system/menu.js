var express = require('express'),
     Menu = require("../../dao/system/Menu"),
     router = express.Router();

/**
 *  菜单获取.
 *  url: /menu
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
 *  菜单控制界面跳转.
 *  url: /menu
 */
router.post('/', function(req, res, next) {
    var result = {};
    res.render("system/admin-menu",result);
});

/**
 *  菜单新增或修改.
 */
router.post('/save', function(req, res, next) {
    try{
        var result = {};
        var menu = new Menu(req,res);
        var id = req.body.id;
        if(id!=null&&id!=""){
            menu.upd(req,menu,function(data){
                if(data.status=="SUCCEED"){
                    result.status = "保存成功";
                }else{
                    result.status = "保存失败";
                }
                res.send(result);
            });
        }else{
            menu.add(req,menu,function(data){
                if(data.status=="SUCCEED"){
                    result.status = "保存成功";
                }else{
                    result.status = "保存失败";
                }
                res.send(result);
            });
        }
    }catch(e){
        consoleLog(e)
    }
});

/**
 *  菜单新增或修改.
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

/**
 *  菜单新增或修改.
 */
router.post('/check', function(req, res, next) {
    var result = {};
    var menu = new Menu(req,res);
    menu.check(menu,function(data){
        result = data;
        res.send(result);
    });
});

module.exports = router;
