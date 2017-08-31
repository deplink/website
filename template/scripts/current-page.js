module.exports = function () {

    var url = window.location.href;
    var uri = window.location.pathname;
    var uri2 = window.location.pathname.substring(1);

    $('a[href="'+ url +'"], a[href="'+ uri +'"], a[href="'+ uri2 +'"]').addClass('is-current');

}();

