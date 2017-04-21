let loginController = function() {

    // context => Sammy
    function viewLogin(context) {
        $.get('templates/loginView.handlebars', function(html) {
            context.$element().html(html);
        })
    }

    return {
        viewLogin: viewLogin
    };
}();

export { loginController };