var express = require('express')
    ,Generate = require("../../dao/system/Generate")
    ,GeneratorCode = require("../../util/GeneratorCode")
    ,dateUtil = require("../../util/DateUtil")()
    ,router = express.Router();

/**
 * 代码生成工具页面跳转.
 */
router.post('/', function(req, res, next) {
  res.render('admin-generate');
});

/**
 * 获取数据库中所有表名称.
 */
router.post('/getTableList', function(req, res, next) {
   var result = {};
   var generate = new Generate(req,res);
   generate.getTableList(generate,function(data){
      if(data.status=="SUCCEED"){
         result = data.msg;
         res.send(result);
      }
   });
});

/**
 * 获取数据库中所有表名称.
 */
router.post('/createCode', function(req, res, next) {
  var result = {},
      confJson = {},
      column = [],
      type = [],
      comment = [];

  confJson.name=req.body.name||"demo";
  confJson.username=req.session.user.username;
  confJson.now=dateUtil.getYYMMDDHHMISS();
  confJson.className=req.body.className||"demo";
  confJson.classLowerName=req.body.className||"demo";
  confJson.tableName=req.body.tableName||"demo";
  confJson.path=req.body.className||"demo";

  var generate = new Generate(req,res);
  generate.getColumnList(generate,function(data){
     if(data.status=="SUCCEED"){
        result = data.msg;
        for(var ind in result){
           column.push(result[ind].column_name);
           type.push(result[ind].data_type);
           comment.push(result[ind].column_comment);
        }
        new GeneratorCode();
        res.send(111);
     }
  });
});

module.exports = router;
