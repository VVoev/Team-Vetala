let homeController = function () {

    // context => Sammy
    function all(context) {
<<<<<<< HEAD
        $.get('scripts/views/homeView.handlebars', function (html) {
=======
         $.get('scripts/views/homeView.handlebars', function (html) {
             console.log(context)
>>>>>>> 8a3713a8800a27081463d49ce8ba5269322f4146
            context.$element().html(html);
        })
    }

    return {
        all: all
    };
<<<<<<< HEAD
}();
=======
}();


export  {homeController}
>>>>>>> 8a3713a8800a27081463d49ce8ba5269322f4146
