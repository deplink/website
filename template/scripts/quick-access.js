module.exports = function () {

    var animTime = 200;
    var animDelay = 40;
    var fuseOptions = {
        shouldSort: true,
        findAllMatches: true,
        includeMatches: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        keys: [{
            name: 'title',
            weight: 0.5
        }, {
            name: 'description',
            weight: 0.2
        }, {
            name: 'url',
            weight: 0.3
        }]
    };

    var keys = {
        F2: 113,
        Esc: 27
    };

    var fuse = null;
    var isVisible = false;
    var quickAccess = $('.quick-access');
    var quickAccessField = quickAccess.find('.quick-access-field');
    var quickAccessMenu = quickAccess.find('.quick-access-menu');

    function init() {
        $.getJSON('compiled/indexes.json', function(json) {
            var indexes = [];
            for(key in json) {
                indexes.push(json[key]);
            }

            for(key in window.app.indexes) {
                indexes.push(window.app.indexes[key]);
            }

            // Write indexes at once to prevent searching
            // only in partially loaded indexes.
            fuse = new Fuse(indexes, fuseOptions);

            // Start searching, in some cases user could
            // write search text before indexes was loaded.
            search();
        });
    }

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

        $.each(items, function (i, item) {
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

        $.each(items, function (i, item) {
            $(item).stop(true).delay(delay).slideUp(animTime / 2);
            delay += animDelay / 2;
        });

        quickAccessField.stop(true).delay(delay + animTime / 2).slideUp(animTime / 2);
    }

    /**
     * Toggle Quick Access menu visibility.
     */
    function toggle() {
        if (isVisible) {
            return hide();
        }

        return show();
    }

    /**
     * Remove previous search results and set new.
     *
     * @param {array} items See sample result of the Fuse.js library.
     * @link http://fusejs.io
     */
    function setItems(items) {
        // Remove previous search results
        quickAccessMenu.find('.quick-access-menu-item').remove();

        $.each(items, function(i, item) {
            var matches = item['matches'];
            var data = item['item'] || item;

            var menuItem = $(
                '<div class="quick-access-menu-item" data-url="' + data.url + '">' +
                '   <p>'+ data.title +'</p>' +
                '   <small>'+ (data.description || '') +'</small>' +
                '   <small>'+ data.url +'</small>' +
                '</div>'
            );

            quickAccessMenu.append(menuItem);
            menuItem.slideDown(0);
        });
    }

    function showLoader() {
        // ...
    }

    function hideLoader() {
        // ...
    }

    function search() {
        var q = quickAccessField.val();

        // Empty value, stop searching
        if(q.length <= 0) {
            return hideLoader();
        }

        showLoader();
        if(fuse === null) {
            // Stop searching because indexes was not found
            // (still show loader, results will show after indexing).
            return;
        }

        setItems(fuse.search(q));
    }

    function onKeyDown(e) {
        var key = e.which || e.key;

        if (key === keys.F2) {
            toggle();
        }

        if (isVisible && key === keys.Esc) {
            hide()
        }

        // TODO: Selecting menu item using arrow keys and enter key handler
    }

    function onClick(e) {
        var clickedOutsideQuickAccess = $(e.target).parents(quickAccess).length <= 0;
        if (isVisible && clickedOutsideQuickAccess) {
            hide();
        }
    }

    quickAccess.focusout(hide);
    quickAccessField.keyup(search);
    $(window).keydown(onKeyDown);
    $(document).click(onClick);

    init();

}();
