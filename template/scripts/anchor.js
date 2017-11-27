module.exports = function () {

    function createAnchor(i, el) {
        var anchor = $(el).attr('id');
        $(el).append('<a href="#'+ anchor +'" class="anchor">&para;</a>')
    }

    $('[id]').each(createAnchor);

}();

