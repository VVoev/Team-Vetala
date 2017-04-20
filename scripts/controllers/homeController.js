var homeController = function () {

    function all() {
        $.get('views/homeView.handlebars', function (html) {
            $('#content').html(html);
        })
    }

    return {
        all: all
    };
}();
export {homeController};