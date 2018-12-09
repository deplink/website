module.exports = function () {

    function showMenu() {
        $('.navbar-mobile').addClass('-visible');
    }

    function hideMenu() {
        $('.navbar-mobile').removeClass('-visible');
    }

    function toggleMenu() {
        $('.navbar-mobile').toggleClass('-visible');
    }

    var hammertime = new Hammer(document);
    hammertime.on('swipeleft', hideMenu);
    hammertime.on('swiperight', showMenu);

    $('.navbar-mobile-toggle').click(toggleMenu);

}();
