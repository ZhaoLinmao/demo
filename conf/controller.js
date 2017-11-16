var index = require("../routes/system/index"),
     login = require("../routes/system/login"),
     customform = require("../routes/system/customform"),
     generate = require("../routes/system/generate"),
     check = require("../routes/system/check"),
     org = require("../routes/system/org"),
     //# #{classLowerName} = require("../routes/#{path}/#{classLowerName}")//#{now} #//;
     menu = require("../routes/system/menu");

var Controller = function (){
    if(!(this instanceof Controller)){
        return new Controller();
    }
};

Controller.prototype.routes = function (app) {
    //# app.use('/#{classLowerName}', #{classLowerName})//#{now} #//;
    app.use('/index', index);
    app.use('/menu', menu);
    app.use('/customform', customform);
    app.use('/generate', generate);
    app.use('/org', org);

    app.use('/login', login);
    app.use('/check', check);
    
};

module.exports = Controller;