module.exports = function () {

    var animTime = 200;
    var animDelay = 40;

    var keys = {
        F2: 113,
        Esc: 27
    };

    var isVisible = false;
    var quickAccess = $('.quick-access');
    var quickAccessField = quickAccess.find('.quick-access-field');
    var quickAccessMenu = quickAccess.find('.quick-access-menu');

    /**
     * Show Quick Access menu visibility.
     */
    function show() {
        isVisible = true;
        $('.dropdown').trigger('hide');

        var delay = animTime;
        var items = quickAccessMenu.find('.quick-access-menu-item');

        quickAccessField.stop(true).slideDown(animTime);
        quickAccessField.select();

        $.each(items, function(i, item) {
            $(item).stop(true).delay(delay).slideDown(animTime);
            delay += animDelay;
        });
    }

    /**
     * Hide Quick Access menu visibility.
     */
    function hide() {
        isVisible = false;

        var delay = 0;
        var items = quickAccessMenu.find('.quick-access-menu-item').get().reverse();

        $.each(items, function(i, item) {
            $(item).stop(true).delay(delay).slideUp(animTime / 2);
            delay += animDelay / 2;
        });

        quickAccessField.stop(true).delay(delay + animTime / 2).slideUp(animTime / 2);
    }

    /**
     * Toggle Quick Access menu visibility.
     */
    function toggle() {
        if(isVisible) {
            return hide();
        }

        return show();
    }

    /**
     * Remove previous search results and set new.
     *
     * @param {array} items Each object in array should contain name, description and url key.
     */
    function setItems(items) {
        // ...
    }

    function showLoader() {
        // ...
    }

    function hideLoader() {
        // ...
    }

    function onKeyDown(e) {
        var key = e.which || e.key;

        if(key === keys.F2) {
            toggle();
        }

        if(isVisible && key === keys.Esc) {
            hide()
        }

        // TODO: Selecting menu item using arrow keys and enter key handler
    }

    function onClick(e) {
        var clickedOutsideQuickAccess = $(e.target).closest(quickAccess).length <= 0;
        if(isVisible && clickedOutsideQuickAccess) {
            hide();
        }
    }

    quickAccess.focusout(hide);
    $(window).keydown(onKeyDown);
    $(document).click(onClick);

}();
