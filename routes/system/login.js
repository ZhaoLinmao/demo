var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("login",{title:"这是一个实例demo."});
});

module.exports = router;
