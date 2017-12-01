module.exports = function () {

    function createAnchor(i, el) {
        var anchor = $(el).attr('id');
        $(el).append('<a tabindex="-1" href="#'+ anchor +'" class="anchor">&para;</a>')
    }

    $('[id]').each(createAnchor);

}();

