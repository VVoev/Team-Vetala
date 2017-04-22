import {homeController} from "./controllers/homeController.js";
import {userController} from "./controllers/userController.js";
import {validator} from "./validator.js";
import {kinveyRequester} from './kinveyRequester.js';
import {constants} from './constants/constants.js';

// import {templateLoader} from './template-loader'; TODO kato se probvam da go izpolzvam ne mi zarejda failovete{ot Vlado}


(function () {
    let sammyApp = Sammy('#content', function () {

        // original state of this
        let carApi = this;

        //Default view
        this.get('#/', homeController.viewHome);
        this.get('#/Home', homeController.viewHome);

        this.get('#/Register', function (context) {
            userController.register()
                .then((html) => {
                    context.$element().html(html);
                    $('#btnRegister').on('click', function () {
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
                                alert(error)
                            });
                    });
                })
        });

        this.get('#/Login', function (context) {
            userController.login()
                .then((html) => {
                    context.$element().html(html);
                    $('#btnLogin').on('click', function () {
                        let loginData = {};
                        loginData['name'] = $('#signupUser').val();
                        loginData['password'] = $('#signupPassword').val();
                        kinveyRequester.loginUser(loginData["name"], loginData["password"])
                            .then(() => {
                                document.location = '#/Home';
                                toastr.success(constants.SUCCESS_LOGIN);
                            }).catch((error) => {
                            alert(error);
                        })
                    })
                })
        });


    });


    $(function () {
        sammyApp.run('#/')
    })
})();