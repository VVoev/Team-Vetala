import {templateLoader} from '../template-loader.js';

let userController = (function () {

    function register() {
        return new Promise((resolve, reject) => {
            templateLoader.get('registerView')
                .then((template) => {
                    resolve(template());
                })
                .catch(reject);
        });
    }

    function login() {
        return new Promise((resolve, reject) => {
            templateLoader.get('loginView')
                .then((template) => {
                    resolve(template());
                })
                .catch(reject);
        });
    };

    return {
        register,
        login
    }


})();

export {userController};
