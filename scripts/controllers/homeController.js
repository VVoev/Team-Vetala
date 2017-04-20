let homeController = function () {

    // context => Sammy
    function all(context) {
        $.get('scripts/views/homeView.handlebars', function (html) {
            context.$element().html(html);
        })
    }

    return {
        all: all
    };
}();