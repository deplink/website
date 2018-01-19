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
        minMatchCharLength: 3,
        keys: [{
            name: 'shortcut',
            weight: 0.55
        }, {
            name: 'title',
            weight: 0.30
        }, {
            name: 'description',
            weight: 0.05
        }, {
            name: 'url',
            weight: 0.10
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
    var userSelection = false;
    var quickAccess = $('.quick-access');
    var quickAccessField = quickAccess.find('.quick-access-field');
    var quickAccessMenu = quickAccess.find('.quick-access-menu');

    function init() {
        $.getJSON('/compiled/indexes.json', function (json) {
            var indexes = [];
            for (key in json) {
                indexes.push(json[key]);
            }

            for (key in window.app.indexes) {
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

        $.each(items, function (i, item) {
            var matches = item['matches'] || [];
            var data = item['item'] || item;

            var html = {
                title: data.title || '',
                description: data.description || '',
                url: data.url || '',
                external: data.external || false
            };

            $.each(matches, function (i, match) {
                if (html[match.key] !== undefined) {
                    html[match.key] = boldMatches(html[match.key], match.indices);
                }
            });

            var externalIcon = '';
            if ([true, 'true', '1'].indexOf(html.external) >= 0) {
                externalIcon = ' <span class="font-tiny icon-external-link"></span>';
            }

            var menuItem = $(
                '<div class="quick-access-menu-item" data-url="' + data.url + '">' +
                '   <p>' + html.title + externalIcon + '</p>' +
                '   <small class="mtx">' + html.description + '</small>' +
                '   <small class="mtx">' + html.url + '</small>' +
                '</div>'
            );

            quickAccessMenu.append(menuItem);
            menuItem.click(onMenuItemClick);
        });
    }

    function insertStrToStrAt(str, text, index) {
        text = text.split('');
        text.splice(index, 0, str);
        return text.join('');
    }

    function boldMatches(str, indices) {
        indices = indices.reverse();

        $.each(indices, function (i, index) {
            str = insertStrToStrAt('</b>', str, index[1] + 1);
            str = insertStrToStrAt('<b>', str, index[0]);
        });

        return str;
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
        if (q.length <= 0) {
            setItems([]);
            userSelection = false;
            return hideLoader();
        }

        showLoader();
        if (fuse === null) {
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
        if (item.length >= 1) {
            return item.first();
        }

        return items.eq(index || 0);
    }

    function setFocusedItemByUrl(url) {
        var items = quickAccessMenu.find('.quick-access-menu-item');
        var item = items.filter('[data-url="' + url + '"]');

        items.removeClass('-selected');
        item.addClass('-selected');
        scrollToItem(item);
    }

    function scrollToItem(item) {
        var offset = 0;
        var prevItems = $(item).prevAll('.quick-access-menu-item');
        $.each(prevItems, function (i, prevItem) {
            offset += $(prevItem).outerHeight();
        });

        // Scroll down only if bottom part of the element is not visible
        var bottomSpace = quickAccessMenu.scrollTop() + quickAccessMenu.height() - offset - item.outerHeight();
        if (bottomSpace < 0) {
            var scroll = quickAccessMenu.scrollTop() - bottomSpace;
            quickAccessMenu.animate({ scrollTop: scroll + 'px' }, animTime / 4);
        }

        // Scroll up only if top part of the element is not visible
        var topSpace = offset - quickAccessMenu.scrollTop();
        if (topSpace < 0) {
            var scroll = quickAccessMenu.scrollTop() + topSpace;
            quickAccessMenu.animate({ scrollTop: scroll + 'px' }, animTime / 4);
        }
    }

    function focusNextItem(item) {
        var nextItem = item.next('.quick-access-menu-item');

        if (nextItem.length <= 0) {
            var items = quickAccessMenu.find('.quick-access-menu-item');
            nextItem = items.first();
        }

        item.removeClass('-selected');
        nextItem.addClass('-selected');
    }

    function focusPrevItem(item) {
        var prevItem = item.prev('.quick-access-menu-item');

        if (prevItem.length <= 0) {
            var items = quickAccessMenu.find('.quick-access-menu-item');
            prevItem = items.last();
        }

        item.removeClass('-selected');
        prevItem.addClass('-selected');
    }

    function onFieldKeyDown(e) {
        var key = e.which || e.key;

        if (key === keys.arrows.down) {
            userSelection = true;
            var item = getFocusedItemOrFocus(-1);
            focusNextItem(item);
        }

        if (key === keys.arrows.up) {
            e.preventDefault();
            userSelection = true;
            var item = getFocusedItemOrFocus(0);
            focusPrevItem(item);
        }

        if (key === keys.enter) {
            var item = getFocusedItemOrFocus(0);
            item.click();
        }
    }

    function onFieldKeyUp(e) {
        var key = e.which || e.key;
        var focused = getFocusedItem();

        search();

        if (!userSelection) {
            focused = quickAccessMenu.find('.quick-access-menu-item').first();
        }

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
        var clickedToggleButton = $(e.target).closest('.navbar-quick-access').length > 0;
        if (clickedToggleButton) {
            toggle();
            return false;
        }

        var clickedOutsideQuickAccess = $(e.target).closest('.quick-access').length <= 0;
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
