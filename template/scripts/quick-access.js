module.exports = function () {

    var animTime = 200;
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
        f2: 113,
        esc: 27,
        enter: 13,
        arrows: {
            left: 37,
            up: 38,
            right: 39,
            down: 40
        }
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

        quickAccessField.stop(true).slideDown(animTime);
        quickAccessMenu.stop(true).delay(animTime).slideDown(animTime);
        quickAccessField.select();
    }

    /**
     * Hide Quick Access menu visibility.
     */
    function hide() {
        isVisible = false;

        quickAccessMenu.stop(true).slideUp(animTime / 2);
        quickAccessField.stop(true).delay(animTime / 2).slideUp(animTime / 2);
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

            // TODO: Bold matches

            var menuItem = $(
                '<div class="quick-access-menu-item" data-url="' + data.url + '">' +
                '   <p>'+ data.title +'</p>' +
                '   <small>'+ (data.description || '') +'</small>' +
                '   <small>'+ data.url +'</small>' +
                '</div>'
            );

            quickAccessMenu.append(menuItem);
            menuItem.click(onMenuItemClick);
        });
    }

    function showLoader() {
        quickAccessField.addClass('-loading');
    }

    function hideLoader() {
        quickAccessField.removeClass('-loading');
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
        hideLoader();
    }

    function getFocusedItem() {
        return quickAccessMenu.find('.quick-access-menu-item.-selected').first();
    }

    function getFocusedItemOrFocus(index) {
        var items = quickAccessMenu.find('.quick-access-menu-item');

        var item = items.filter('.-selected');
        if(item.length >= 1) {
            return item.first();
        }

        return items.eq(index || 0);
    }

    function setFocusedItemByUrl(url) {
        var item = quickAccessMenu.find('.quick-access-menu-item[data-url="'+ url +'"]');

        item.addClass('-selected');
        scrollToItem(item);
    }

    function scrollToItem(item) {
        var offset = 0;
        var prevItems = $(item).prevAll('.quick-access-menu-item');
        $.each(prevItems, function(i, prevItem) {
            offset += $(prevItem).outerHeight();
        });

        // Scroll down only if bottom part of the element is not visible
        var bottomSpace = quickAccessMenu.scrollTop() + quickAccessMenu.height() - offset - item.outerHeight();
        if(bottomSpace < 0) {
            var scroll = quickAccessMenu.scrollTop() - bottomSpace;
            quickAccessMenu.animate({ scrollTop: scroll + 'px' }, animTime/4);
        }

        // Scroll up only if top part of the element is not visible
        var topSpace = offset - quickAccessMenu.scrollTop();
        if(topSpace < 0) {
            var scroll = quickAccessMenu.scrollTop() + topSpace;
            quickAccessMenu.animate({ scrollTop: scroll + 'px' }, animTime/4);
        }
    }

    function focusNextItem(item) {
        var nextItem = item.next('.quick-access-menu-item');

        if(nextItem.length <= 0) {
            var items = quickAccessMenu.find('.quick-access-menu-item');
            nextItem = items.first();
        }

        item.removeClass('-selected');
        nextItem.addClass('-selected');
    }

    function focusPrevItem(item) {
        var prevItem = item.prev('.quick-access-menu-item');

        if(prevItem.length <= 0) {
            var items = quickAccessMenu.find('.quick-access-menu-item');
            prevItem = items.last();
        }

        item.removeClass('-selected');
        prevItem.addClass('-selected');
    }

    function onFieldKeyDown(e) {
        var key = e.which || e.key;

        if(key === keys.arrows.down) {
            var item = getFocusedItemOrFocus(-1);
            focusNextItem(item);
        }

        if(key === keys.arrows.up) {
            e.preventDefault();
            var item = getFocusedItemOrFocus(0);
            focusPrevItem(item);
        }

        if(key === keys.enter) {
            var item = getFocusedItemOrFocus(0);
            item.click();
        }
    }

    function onFieldKeyUp(e) {
        var key = e.which || e.key;
        var focused = getFocusedItem();

        search();
        setFocusedItemByUrl(focused.data('url'));
    }

    function onKeyDown(e) {
        var key = e.which || e.key;

        if (key === keys.f2) {
            toggle();
        }

        if (isVisible && key === keys.esc) {
            hide()
        }
    }

    function onClick(e) {
        var clickedOutsideQuickAccess = $(e.target).parents(quickAccess).length <= 0;
        if (isVisible && clickedOutsideQuickAccess) {
            hide();
        }
    }

    function onMenuItemClick(e) {
        window.location.href = $(this).data('url');
    }

    quickAccessField.keydown(onFieldKeyDown);
    quickAccessField.keyup(onFieldKeyUp);
    $(window).keydown(onKeyDown);
    $(document).click(onClick);

    init();

}();
