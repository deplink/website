module.exports = function (env) {

    var data = require('../../config.json');

    env.addGlobal('url', function (url) {
        return data.host + (url || '');
    });

};
