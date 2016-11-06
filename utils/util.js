function dataPrepared(obj, items, cb) {
    var result = items.every(function(item) {
        return obj.hasOwnProperty(item);
    })
    if(result) cb();
}

exports.dataPrepared = dataPrepared;
