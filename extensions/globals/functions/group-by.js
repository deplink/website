module.exports = function (env) {

    var fn = function (key, data) {
        results = {};

        data.forEach(function (item) {
            var keyVal = item[key];
            results[keyVal] = results[keyVal] || [];
            results[keyVal].push(item);
        });

        return results;
    };

    env.addGlobal('groupBy', fn);
    return fn;

};
