module.exports = function (env) {

    var pages = require('./functions/pages')(env);
    var orderBy = require('./functions/order-by')(env);

    var data = orderBy(['order', 'title'], pages({layout: 'documentation/guide'}));

    env.addGlobal('guidePages', data);
    return data;

};
