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

    }


})();

export {userController};
