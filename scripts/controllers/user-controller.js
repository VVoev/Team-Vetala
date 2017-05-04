import { kinveyRequester } from "../common/kinvey-requester.js";
import { templateLoader } from "../common/template-loader.js";
import { constants } from "../common/constants.js";
import { validator } from "../common/validator.js";

let userController = (function() {

    function init() {
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
        templateLoader.get("register")
            .then((html) => {
                context.$element().html(html);
                $("#btnRegister").on("click", function() {
                    let registerData = {};
                    registerData["name"] = $("#signupName").val();
                    registerData["email"] = $("#signupEmail").val();
                    registerData["password"] = $("#signupPassword").val();

                    let name = registerData.name;
                    let password = registerData.password;

                    let isEmailValid = validator.checkIfFieldsAreEqual(registerData["email"], $("#signupEmailagain").val());
                    let isPasswordValid = validator.checkIfFieldsAreEqual(registerData["password"], $("#signupPasswordagain").val());

                    kinveyRequester.registerUser(name, password)
                        .then(() => {
                            document.location = "#/Login"
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
        templateLoader.get("login")
            .then((html) => {
                context.$element().html(html);
                $("#btnLogin").on("click", function() {
                    let loginData = {};
                    loginData["name"] = $("#signupUser").val();
                    loginData["password"] = $("#signupPassword").val();
                    kinveyRequester.loginUser(loginData["name"], loginData["password"])
                        .then((details) => {
                            fillSessionStorage(details);
                            document.location = "#/Home";
                            toastr.success(constants.SUCCESS_LOGIN);
                            let name = sessionStorage.getItem("userName");
                            init();

                        }).catch((error) => {
                            toastr.error(error.responseText);
                        })
                })
            });
    }

    function logout() {
        let user = sessionStorage.getItem("userName");
        sessionStorage.clear();
        init();
        toastr.warning(constants.SUCCESS_LOGOUT + " " + user);
        document.location = "#/Home";
    }

    function fillSessionStorage(details) {
        sessionStorage.setItem("authToken", details._kmd.authtoken);
        sessionStorage.setItem("userID", details._id);
        sessionStorage.setItem("userName", details.username);
    }

    return {
        init,
        register,
        login,
        logout,
        fillSessionStorage
    }

})();

export { userController };