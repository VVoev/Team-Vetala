<<<<<<< HEAD
=======
import {homeController} from '/scripts/controllers/homeController.js'

>>>>>>> 8a3713a8800a27081463d49ce8ba5269322f4146
(function () {
    let sammyApp = Sammy('#content', function () {

        this.get('#/Home',homeController.all);
        this.get('/#Login',LoginController.all);


    });


    $(function () {
        sammyApp.run('#/')
    })
})();