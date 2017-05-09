import { kinveyRequester } from "../common/kinvey-requester.js";
import { templateLoader } from "../common/template-loader.js";
import { constants } from "../common/constants.js";
import { validator } from "../common/validator.js";
import * as models from "../models/models.js";

let userController = (function() {

    function init() {
        $("#sortOptions").hide();

        if (validator.isUserLoggedIn()) {
            $("#functions-panel").show();
            $("#user-info").html(sessionStorage.userName);
            $("#login-link").hide();
            $("#logout-link").show();
            $("#register-link").hide();

        } else {
            $("#functions-panel").hide();
            $("#user-info").html("");
            $("#login-link").show();
            $("#logout-link").hide();
            $("#register-link").show();
        }
    }

    function register(context) {
        $("#sortOptions").hide();

        templateLoader.get("register")
            .then((html) => {
                context.$element().html(html);
                $("#btnRegister").on("click", function() {
                    let registerData = {};
                    let user = {};
                    registerData["name"] = $("#signupName").val();
                    registerData["email"] = $("#signupEmail").val();
                    registerData["password"] = $("#signupPassword").val();

                    try {
                        user = models.getNewUser(registerData.name, registerData.password, registerData.email);
                    } catch (ex) {
                        toastr.error(ex.message);
                        return;
                    }

                    let isEmailValid = validator.checkIfFieldsAreEqual(registerData["email"], $("#signupEmailagain").val());
                    let isPasswordValid = validator.checkIfFieldsAreEqual(registerData["password"], $("#signupPasswordagain").val());

                    kinveyRequester.registerUser(user)
                        .then(() => {
                            document.location = "#/Login";
                            $("#signupPassword").val("");
                            toastr.success(constants.SUCCESS_REGISTER);
                            init();
                        })
                        .catch((error) => {
                            toastr.error(error.responseText);
                        });
                });
            });
    }

    function login(context) {
        $("#sortOptions").hide();

        templateLoader.get("login")
            .then((html) => {
                context.$element().html(html);
                $("#btnLogin").on("click", function() {
                    let loginData = {};
                    let user = {};
                    loginData["name"] = $("#signupUser").val();
                    loginData["password"] = $("#signupPassword").val();

                    try {
                        user = models.getUser(loginData.name, loginData.password);
                    } catch (ex) {
                        toastr.error(ex.message);
                        return;
                    }

                    kinveyRequester.loginUser(user)
                        .then((details) => {
                            fillSessionStorage(details);
                            document.location = "#/Home";
                            $("#signupPassword").val("");
                            init();
                        })
                        .then(() => {
                            Kinvey.User.login(user)
                                .then(() => toastr.success(constants.SUCCESS_LOGIN))
                                .catch((err) => toastr.error(err.responseText));
                        })
                        .catch((error) => {
                            toastr.error(constants.INVALID_USER_OR_PASS);
                        });
                });
            });
    }

    function logout() {
        $("#sortOptions").hide();

        let user = sessionStorage.getItem("userName");
        sessionStorage.clear();
        init();
        Kinvey.User.logout()
            .then(() => {
                toastr.warning(constants.SUCCESS_LOGOUT + " " + user);
                document.location = "#/Home";
            })
            .catch((err) => toastr.error(err.responseText));

    }

    function fillSessionStorage(details) {
        $("#sortOptions").hide();

        sessionStorage.setItem("authToken", details._kmd.authtoken);
        sessionStorage.setItem("userID", details._id);
        sessionStorage.setItem("userName", details.username);
    }

    return {
        init,
        register,
        login,
        logout
    }

})();

let login = userController.login,
    register = userController.register,
    init = userController.init,
    logout = userController.logout;

export {
    login,
    register,
    init,
    logout
}


export { userController };