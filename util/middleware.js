/**
 * Created by zlm on 2016/12/22.
 */
var sha1 = require('sha1');

var Middleware = function (req,res,next) {
    var reg=new RegExp("bower_components|assets");
    if(req.method=="GET"&&reg.test(req.originalUrl)){
        next();
    }else{
        if(req.method=="GET"||req.session.user==null){
            if(req.originalUrl!="/login"&&req.originalUrl!="/index"&&req.session.user!=null){
                res.render('system/admin-index', { title: '捷点科技' });
            }else if(req.originalUrl=="/login"||req.originalUrl=="/"||(req.originalUrl!="/index"&&req.session.user==null)){
                req.session.user=null;
                res.render('system/login',{title:"这是一个实例demo."});
            }else if(req.originalUrl=="/index"){
                next();
            }
        }else{
            next();
        }
    }
};

module.exports = Middleware;