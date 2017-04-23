import {templateLoader} from '../template-loader.js';

let carController = (function () {

    function all(context) {
        return new Promise((resolve, reject) => {
            templateLoader.get('cars')
                .then((template) => {
                    resolve(template());
                })
                .catch(reject);
        });
    }

    function listAllCars(context) {
        console.log(context)
    }

    return {
        all,
    }

})();

export {carController};
