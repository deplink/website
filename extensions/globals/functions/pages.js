module.exports = function (env) {

    var indexes = require('../../../build/compiled/indexes.json');

    /**
     * Get list of pages. Results can be filtered by the user.
     *
     * Usage                                    | Notes
     * -----------------------------------------|--------------------------------------------------------------------
     * pages()                                  | All pages sorted by the title
     * pages({layout: 'guide'})                 | Pages with layout: 'guide' set in front matter
     * pages({layout: 'guide', group: 'basic'}) | Pages with layout: 'guide' and group: 'basic' set in front matter
     *
     * @param {object|undefined} filters Object of key-value pairs which must match with page metadata.
     * @return {array}
     */
    var fn = function (filters) {
        var results = [];

        // Default values
        filters = filters || {};

        // Filter pages
        var pages = Object.values(indexes);
        pages.forEach(function (item) {
            for (var key in filters) {
                if (item[key] !== filters[key]) {
                    return; // Go to the next item
                }
            }

            results.push(item);
        });

        return results;
    };

    env.addGlobal('pages', fn);
    return fn;

};
