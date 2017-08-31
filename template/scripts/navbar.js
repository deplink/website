module.exports = function () {

    function toggleMenu() {
        $('.navbar-mobile').toggleClass('-visible');
    }

    $('.navbar-mobile-toggle').click(toggleMenu);

}();
