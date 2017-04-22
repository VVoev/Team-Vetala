import {homeController} from "./controllers/homeController.js";
import {userController} from "./controllers/userController.js";


(function () {
    let sammyApp = Sammy('#content', function () {

        //Default view
        this.get('#/', homeController.viewHome);
        this.get('#/Home', homeController.viewHome);

        this.get('#/Register', function (context) {
            userController.register()
                .then((html) => {
                    context.$element().html(html);
                })
            $('#btnRegister').on('click', function () {
                let registerData = {};
                registerData[name] = $('#signupName').val();
                registerData[email] = $('#signupEmail').val();
                registerData[password] = $('#signupPassword').val();

            });

        });

        this.get('#/Login', function (context) {
            userController.login()
                .then((html) => {
                    context.$element().html(html);
                })

        });


    });


    $(function () {
        sammyApp.run('#/')
    })
})();