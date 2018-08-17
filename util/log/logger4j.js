var log4js = require('log4js');

// 目录创建完毕，才加载配置，不然会出异常
log4js.configure({
    "appenders": [
        {"type": "console"}
    ],
    "replaceConsole": true,
    //设置记录器的默认显示级别，低于这个级别的日志，不会输出。其他级别(trace、debug、info、warn、error、fatal)
    "levels":{ "log": "info"}//只需要修改这个就能改变告警级别
});

var Logger4j = log4js.getLogger('log');

// 配合express用的方法
Logger4j.use = function(app) {
    //页面请求日志, level用auto时,默认级别是WARN 相当于 log.info(":method :url");
    app.use(log4js.connectLogger(Logger4j, {level:'info', format:':method :url'}));
};

module.exports = Logger4j;