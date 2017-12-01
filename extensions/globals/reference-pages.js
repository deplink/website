require('./functions/pages');
require('./functions/order-by');

module.exports = function (env) {

    var pages = require('./functions/pages')(env);
    var orderBy = require('./functions/order-by')(env);

    var data = orderBy(['order', 'title'], pages({layout: 'docs/reference'}));

    env.addGlobal('referencePages', data);
    return data;

};
