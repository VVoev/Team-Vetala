(function () {
    let sammyApp = Sammy('#content', function () {

        this.get('#/Home',homeController.all);
        this.get('/#Login',LoginController.all);


    });


    $(function () {
        sammyApp.run('#/')
    })
})();