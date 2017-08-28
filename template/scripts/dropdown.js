module.exports = function () {

    var animTime = 300;

    /**
     * Show dropdown menu.
     *
     * @param tag Any tag inside dropdown (including .dropdown class).
     */
    function show(tag) {
        tag = $(tag.target || tag).closest('.dropdown');

        tag.find('.dropdown-menu').stop().slideDown(animTime);
    }

    /**
     * Hide dropdown menu.
     *
     * @param tag Any tag inside dropdown (including .dropdown class).
     */
    function hide(tag) {
        tag = $(tag.target || tag).closest('.dropdown');

        tag.find('.dropdown-menu').stop().slideUp(animTime);
    }

    /**
     * Toggle dropdown menu visibility.
     *
     * @param tag Any tag inside dropdown (including .dropdown class).
     */
    function toggle(tag) {
        tag = $(tag.target || tag).closest('.dropdown');

        tag.find('.dropdown-menu').stop().slideToggle(animTime);
    }

    /**
     * Hide all dropdowns menus.
     */
    function hideAll() {
        $('.dropdown-menu').stop().slideUp(animTime);
    }

    /**
     * Hide all dropdowns menus without parents of the given tag.
     *
     * @param tag Any HTML tag.
     */
    function hideAllWithout(tag) {
        tag = $(tag.target || tag).parents('.dropdown');

        var excluded = tag.find('.dropdown-menu');
        $('.dropdown-menu').not(excluded).slideUp(animTime);
    }

    $('.dropdown-link').click(toggle);
    $(document).click(hideAllWithout);

}();
