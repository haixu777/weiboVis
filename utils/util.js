function dataPrepared(obj, items) {
    var result = items.every(function(item) {
        return obj.hasOwnProperty(item);
    })
    return result;
}

exports.dataPrepared = dataPrepared;
