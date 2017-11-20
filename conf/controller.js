var index = require("../routes/system/index"),
     customform = require("../routes/system/customform"),
     generate = require("../routes/system/generate"),
     //# #{classLowerName} = require("../routes/#{path}/#{classLowerName}"),//time:#{now}  #//
     role = require("../routes/system/role"),//time:2017-10-1 14:29:31
     org = require("../routes/system/org"),//time:2017-10-5 22:11:9
     menu = require("../routes/system/menu");

var Controller = function (){
    if(!(this instanceof Controller)){
        return new Controller();
    }
};

Controller.prototype.routes = function (app) {
     //# app.use('/#{classLowerName}', #{classLowerName}),//time:#{now} #//
     app.use('/role', role),//time:2017-10-1 14:29:31
     app.use('/org', org),//time:2017-10-5 22:11:9
     app.use('/index', index);
     app.use('/menu', menu);
     app.use('/customform', customform);
     app.use('/generate', generate);


};

module.exports = Controller;