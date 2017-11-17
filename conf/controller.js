var index = require("../routes/system/index"),
     login = require("../routes/system/login"),
     customform = require("../routes/system/customform"),
     generate = require("../routes/system/generate"),
     check = require("../routes/system/check"),
     //# #{classLowerName} = require("../routes/#{path}/#{classLowerName}"),//time:#{now} #//
     menu = require("../routes/system/menu");

var Controller = function (){
    if(!(this instanceof Controller)){
        return new Controller();
    }
};

Controller.prototype.routes = function (app) {
    //# app.use('/#{classLowerName}', #{classLowerName}),//time:#{now} #//
    app.use('/index', index);
    app.use('/menu', menu);
    app.use('/customform', customform);
    app.use('/generate', generate);

    app.use('/login', login);
    app.use('/check', check);

};

module.exports = Controller;