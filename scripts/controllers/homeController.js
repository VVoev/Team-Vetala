let homeController = function() {

    // context => Sammy
    function viewHome(context) {
        $.get('templates/homeView.handlebars', function(html) {
            context.$element().html(html);
        })
    }

    return {
        viewHome: viewHome
    };
}();

export { homeController };