import { kinveyRequester } from "../common/kinvey-requester.js";
import { templateLoader } from "../common/template-loader.js";
import { constants } from "../constants/constants.js";
import { validator } from "./common/validator.js";

let userController = (function() {

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
                            document.location = "#/Home"
                            toastr.success(constants.SUCCESS_REGISTER);
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
                            $("#logginUser").html(`Welcome,${name}`);
                            activateField();

                        }).catch((error) => {
                            toastr.error(error.responseText);
                        })
                })
            });
    }

    function fillSessionStorage(details) {
        sessionStorage.setItem("authToken", details._kmd.authtoken);
        sessionStorage.setItem("userID", details._id);
        sessionStorage.setItem("userName", details.username);
    }

    function activateField() {
        $("#carsForSale").show();
        $(".userAdditional").show();
        $(".moreTools").hide();
    }

    function deactivateField() {
        $("#carsForSale").hide();
        $(".userAdditional").hide();
        $(".moreTools").show();
    }

    return {
        register,
        login,
        fillSessionStorage,
        activateField,
        deactivateField
    }

})();

export { userController };