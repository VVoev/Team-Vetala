import { homeController } from "./controllers/home-controller.js";
import { userController } from "./controllers/user-controller.js";
import { validator } from "./validator.js";
import { kinveyRequester } from './kinvey-requester.js';
import { constants } from './constants/constants.js';
import { carController } from "./controllers/car-controller.js";
import { toastrSettings } from './toastrSettings.js';

(function() {
    let sammyApp = Sammy('#content', function() {

        //configuring toaster to work as you want to work
        toastr.options = toastrSettings;

        // original state of this
        let carApi = this;

        //Default view
        this.get('#/', homeController.viewHome);
        this.get('#/Home', homeController.viewHome);

        //All other views
        this.get('#/Contact', homeController.viewContacts);

        this.get('#/Register', function(context) {
            userController.register()
                .then((html) => {
                    context.$element().html(html);
                    $('#btnRegister').on('click', function() {
                        let registerData = {};
                        registerData['name'] = $('#signupName').val();
                        registerData['email'] = $('#signupEmail').val();
                        registerData['password'] = $('#signupPassword').val();

                        let name = registerData.name;
                        let password = registerData.password;

                        let isEmailValid = validator.checkIfFieldsAreEqual(registerData["email"], $('#signupEmailagain').val());
                        let isPasswordValid = validator.checkIfFieldsAreEqual(registerData["password"], $('#signupPasswordagain').val());

                        kinveyRequester.registerUser(name, password)
                            .then(() => {
                                document.location = '#/Home'
                                toastr.success(constants.SUCCESS_REGISTER);
                            })
                            .catch((error) => {
                                toastr.error(error.responseText);
                            });
                    });
                })
        });

        this.get('#/Login', function(context) {
            userController.login()
                .then((html) => {
                    context.$element().html(html);
                    $('#btnLogin').on('click', function() {
                        let loginData = {};
                        loginData['name'] = $('#signupUser').val();
                        loginData['password'] = $('#signupPassword').val();
                        kinveyRequester.loginUser(loginData["name"], loginData["password"])
                            .then((details) => {
                                userController.fillSessionStorage(details);
                                document.location = '#/Home';
                                toastr.success(constants.SUCCESS_LOGIN);
                                let name = sessionStorage.getItem("userName");
                                $('#logginUser').html(`Welcome,${name}`);
                                userController.activateField();

                            }).catch((error) => {
                                toastr.error(error.responseText);
                            })
                    })
                })
        });

        this.get('#/Shop', carController.all);

        this.get('#/Logout', function(context) {
            sessionStorage.clear();
            userController.deactivateField();
            $('#logginUser').html('');
            toastr.warning(constants.SUCCESS_LOGOUT);
        });

    });

    $(function() {
        sammyApp.run('#/')
    })

})();