var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var log = require('./util/log/logger4j');
var controller = require('./conf/controller')();
var db = require('./conf/mysql/db');
var middleware = require('./util/middleware');

var app = express();

//添加视图引擎 修改视图后缀名
app.engine('html',ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//日志管理 trace debug info warn error fatal
log.use(app);

//app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));


//session管理
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(db.settings);

//session 配置
app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  sessionStore:sessionStore,
  resave: false,
  saveUninitialized: true
}));

//前台使用session,session定义应在中间件前使用
app.use(function(req, res, next){
  res.locals.session = req.session;
  next();
});

//中间件
app.use(middleware);

//自定义路由器位置
controller.routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('system/admin-404',err);
});

// error handler 500
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('system/admin-500');
});

module.exports = app;
