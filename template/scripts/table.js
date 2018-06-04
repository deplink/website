module.exports = function () {

    function overflowX(i, el) {
        $(el).wrap('<div class="overflow -x"></div>');
    }

    $('.markdown table').each(overflowX);

}();
