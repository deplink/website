module.exports = function (env) {

    var indexes = require('../../../build/compiled/indexes.json');

    /**
     * Get list of pages.
     * Results can be filtered and sorted by the user.
     *
     * Usage                                    | Notes
     * -----------------------------------------|--------------------------------------------------------------------
     * pages()                                  | All pages sorted by the title
     * pages({}, 'url')                         | All pages sorted by the url
     * pages({layout: 'guide'})                 | Pages with layout: 'guide' set in front matter
     * pages({layout: 'guide', group: 'basic'}) | Pages with layout: 'guide' and group: 'basic' set in front matter
     * pages({layout: 'guide'}, 'order')        | Pages with layout: 'guide' sorted by the front matter 'order' value
     *
     * @param {object|undefined} filters Object of key-value pairs which must match with page metadata.
     * @param {string|undefined} orderBy Key used to sort results, by default 'title' key is used.
     * @return {array}
     */
    var fn = function (filters, orderBy) {
        var results = [];

        // Default values
        filters = filters || {};
        orderBy = orderBy || "title";

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

        // Sort pages
        return results.sort(function (a, b) {
            return (a < b ? -1 : (a > b ? 1 : 0));
        });
    };

    env.addGlobal('pages', fn);

};
