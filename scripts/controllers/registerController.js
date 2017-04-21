let registerController = function() {

    // context => Sammy
    function viewRegister(context) {
        $.get('templates/registerView.handlebars', function(html) {
            context.$element().html(html);
        })
    }

    return {
        viewRegister: viewRegister
    };
}();

export { registerController };
