import {templateLoader} from '../template-loader.js';

let userController = (function () {

    function register() {
        return new Promise((resolve, reject) => {
            templateLoader.get('register')
                .then((template) => {
                    resolve(template());
                })
                .catch(reject);
        });
    }

    function login() {
        return new Promise((resolve, reject) => {
            templateLoader.get('login')
                .then((template) => {
                    resolve(template());
                })
                .catch(reject);
        });
    };

    function fillSessionStorage(details) {
        sessionStorage.setItem("authToken", details._kmd.authtoken);
        sessionStorage.setItem("userID", details._id);
        sessionStorage.setItem("userName", details.username);
    }
    
    function activateField() {
        $('#carsForSale').show();
        $('.userAdditional').show();
    }

    function deactivateField () {
        $('#carsForSale').hide();
        $('.userAdditional').hide();
    }


    return {
        register,
        login,
        fillSessionStorage,
        activateField,
        deactivateField
    }


})();

export {userController};