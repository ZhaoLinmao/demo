var express = require('express'),
     Menu = require("../dao/Menu"),
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
    res.render("admin-menu",result);
});

module.exports = router;
