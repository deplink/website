module.exports = function (env) {

    var data = require('../../../app.json');

    /**
     * Mount global available 'url([url])' method.
     * Using 'host' property from the 'app.json' file.
     *
     * Usage                     | Return value                      | Notes
     * --------------------------|-----------------------------------|--------------------------
     * url()                     | https://example.com/current/url   | Current url
     * url('/')                  | https://example.com               | Homepage
     * url('relative/path')      | https://example.com/relative/path | Resolve absolute path
     * url('/relative/path')     | https://example.com/relative/path | Resolve absolute path
     * url('https://google.com') | https://google.com                | Don't change absolute urls
     *
     * @param {string|undefined} url
     * @return {string}
     */
    var fn = function (url) {
        url = url || '';

        if(url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }

        url = data.host +'/'+ url;
        return url.replace(/\/+/, '/');
    };

    env.addGlobal('url', fn);

};
