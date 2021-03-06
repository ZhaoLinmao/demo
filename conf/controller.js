//系统管理controller
var index = require("../routes/system/index"),
     customform = require("../routes/system/customform"),
     generate = require("../routes/system/generate"),
     //#  #{classLowerName} = require("../routes/#{path}/#{classLowerName}"),//time:#{now}   #//
     right = require("../routes/system/right"),//time:2017-10-2 14:44:27  
     role = require("../routes/system/role"),//time:2017-10-1 14:29:31
     org = require("../routes/system/org"),//time:2017-10-5 22:11:9
     user = require("../routes/system/user"),//time:2018年8月14日 08:46:09
     menu = require("../routes/system/menu");

var Controller = function (){
    if(!(this instanceof Controller)){
        return new Controller();
    }
};

Controller.prototype.routes = function (app) {
     //#  app.use('/#{classLowerName}', #{classLowerName}),//time:#{now}  #//
     app.use('/right', right),//time:2017-10-2 14:44:27 
     app.use('/role', role),//time:2017-10-1 14:29:31
     app.use('/org', org),//time:2017-10-5 22:11:9
     app.use('/index', index);
     app.use('/menu', menu);
     app.use('/customform', customform);
     app.use('/generate', generate);
     app.use('/user', user);//time:2018年8月14日 08:46:09


};

module.exports = Controller;