var express = require('express');
var router = express.Router();
var singleChat = require('../../models/singleChat');
var exec = require('child_process').exec;

/* GET home page. */
router.get('/', function(req, res, next) {
    var pyFile = './public/tree.py '
    var cmdStr = 'python ' + pyFile + req.query.id; 
    exec(cmdStr, function(err, stdout, stderr) {
        if(err) {
            console.log('get json error!');
        } else {
          console.log(stdout);
          var astr = stdout.split('\r\n').join('');//delete the \r\n
          var obj = JSON.parse(astr);
          console.log(obj.Path);
          res.json(obj);
        }
    })
});

module.exports = router;
