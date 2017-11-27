module.exports = function () {

    /**
     * Remove chars after the "#" symbol
     *
     * @param {string} s
     * @returns {string}
     */
    function removeAnchor(s) {
        var n = s.indexOf('#');
        return s.substring(0, n !== -1 ? n : s.length);
    }

    var url = removeAnchor(window.location.href);
    var uri = removeAnchor(window.location.pathname);
    var uri2 = removeAnchor(window.location.pathname.substring(1));

    $('a[href="'+ url +'"], a[href="'+ uri +'"], a[href="'+ uri2 +'"]').addClass('is-current');

}();

