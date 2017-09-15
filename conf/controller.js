var index = require("../routes/index"),
     login = require("../routes/login"),
     fileUpload = require("../routes/fileUpload"),
     three = require("../routes/three"),
     check = require("../routes/check"),
     menu = require("../routes/menu");

var Controller = function (){
    if(!(this instanceof Controller)){
        return new Controller();
    }
};

Controller.prototype.routes = function (app) {
    app.use('/index', index);
    app.use('/menu', menu);

    app.use('/login', login);
    app.use('/upload', fileUpload);
    app.use('/three', three);
    app.use('/check', check);
};

module.exports = Controller;