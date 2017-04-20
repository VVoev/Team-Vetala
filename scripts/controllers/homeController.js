var homeController = function () {

    // context => Sammy
    function all(context) {
         $.get('scripts/views/homeView.handlebars', function (html) {
             console.log(context)
            context.$element().html(html);
        })
    }

    return {
        all: all
    };
}();


export  {homeController}