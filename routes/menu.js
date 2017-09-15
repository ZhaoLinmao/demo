var express = require('express'),
     router = express.Router();

/**
 *  菜单控制.
 *  url: /menu
 */
router.post('/', function(req, res, next) {
    var result = {};
    res.send(result);
});

module.exports = router;
