var express = require('express')
    ,Generate = require("../../dao/system/Generate")
    ,GeneratorCode = require("../../util/GeneratorCode")
    ,dateUtil = require("../../util/DateUtil")
    ,router = express.Router();

/**
 * 代码生成工具页面跳转.
 */
router.post('/', function(req, res, next) {
  res.render('system/admin-generate');
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
  try{
      var result = {},
          confJson = {},
          column = [],
          type = [],
          comment = [],
          className;
      className = req.body.className;
      className = className.substring(0,1).toUpperCase()+className.substring(1);

      confJson.name=req.body.name||"demo";
      confJson.username=req.session.user.username;
      confJson.now=dateUtil.getYYMMDDHHMISS;
      confJson.className=className||"demo";
      confJson.classLowerName=req.body.className||"demo";
      confJson.tableName=req.body.tableName;
      confJson.path=req.body.path||"demo";

      var generate = new Generate(req,res);
      generate.getColumnList(generate,function(data){
         if(data.status=="SUCCEED"){
            result = data.msg;
            for(var ind in result){
               if(result[ind].column_name!="updateby"&&result[ind].column_name!="createby"
                   &&result[ind].column_name!="createtime"&&result[ind].column_name!="updatetime"){
                   column.push(result[ind].column_name);
                   type.push(result[ind].data_type);
                   comment.push(result[ind].column_comment);
               }
            }
            new GeneratorCode(confJson,column);
            res.send("代码生成成功!");
         }
      });
  }catch(e){
    console.log(e);
    res.send("代码生成失败!");
  }
});

module.exports = router;
