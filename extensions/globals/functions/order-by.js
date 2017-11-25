module.exports = function (env) {

    var fn = function (keys, data) {
        // Allow user to pass one and many keys:
        // - orderBy('title', [...])
        // - orderBy(['order', 'title'], [...])
        if(!Array.isArray(keys)) {
            keys = [keys];
        }

        function cmp(a, b, ab_keys) {
            if(ab_keys.length === 0) {
                return 0;
            }

            var key = ab_keys.shift();
            var kA = a[key] || Number.MAX_SAFE_INTEGER;
            var kB = b[key] || Number.MAX_SAFE_INTEGER;

            return kA < kB ? -1 : (kA > kB ? 1 : cmp(a, b, ab_keys));
        }

        return data.sort(function (a, b) {
            return cmp(a, b, keys.slice());
        });
    };

    env.addGlobal('orderBy', fn);
    return fn;

};
