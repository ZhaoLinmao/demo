var index = require("../routes/system/index"),
     login = require("../routes/system/login"),
     fileUpload = require("../routes/system/fileUpload"),
     three = require("../routes/system/three"),
     check = require("../routes/system/check"),
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

    app.use('/login', login);
    app.use('/upload', fileUpload);
    app.use('/three', three);
    app.use('/check', check);
    
};

module.exports = Controller;