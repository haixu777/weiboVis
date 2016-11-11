function dataPrepared(obj, items, cb) {
    var result = items.every(function(item) {
        return obj.hasOwnProperty(item);
    })
    if(result) cb();
}

function getLastMonth(){
    var now = new Date();
    var year = now.getFullYear();      
    var month = now.getMonth()-1; 
    var day = now.getDate();   
    var hh = now.getHours();  
    var mm = now.getMinutes();
    var ss = now.getSeconds();   
    var date = year+"-"+month+"-"+day+" "+hh+":"+mm+":"+ss;
    return date;
}

exports.dataPrepared = dataPrepared;
exports.getLastMonth = getLastMonth;
