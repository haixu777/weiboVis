var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {
    console.log(__dirname + __filename);
    fs.stat('./public/socialNetwork.gexf',function(err, stat){
        if(stat&&stat.isFile()){
            console.log('file found');
            res.send('True');
        }
    
        else{
            console.log('file not found');
            res.send('False');
        }
    });
});

module.exports = router;
