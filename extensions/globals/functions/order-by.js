module.exports = function (env) {

    var fn = function (keys, data) {
        // Allow user to pass one and many keys:
        // - orderBy('title', [...])
        // - orderBy(['order', 'title'], [...])
        if(!Array.isArray(keys)) {
            keys = [keys];
        }

        function cmp(a, b, keys) {
            if(keys.length === 0) {
                return 0;
            }

            var key = keys.shift();
            var diff = a[key] - b[key];

            return diff < 0 ? -1 : (diff > 0 ? 1 : cmp(a, b, keys));
        }

        return data.sort(function (a, b) {
            return cmp(a, b, keys);
        });
    };

    env.addGlobal('orderBy', fn);
    return fn;

};
