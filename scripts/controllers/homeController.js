// import { templateLoader as tl } from '../template-loader.js'

let homeController = function() {

    // context => Sammy
    function all(context) {
        $.get('templates/homeView.handlebars', function(html) {
            context.$element().html(html);
        })
    }

    return {
        all: all
    };
}();

export { homeController };