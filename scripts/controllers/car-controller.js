import { constants } from '../constants/constants.js';
import { kinveyRequester } from '../kinvey-requester.js';
import { templateLoader as tl } from '../template-loader.js';

let carController = (function() {

    function all(context) {
        let cars;
        Promise.all([kinveyRequester.findAllCars(), tl.get("cars")])
            .then(([data, template]) => context.$element().html(template(data)))
            .then((options) => {
                toastr.success(constants.CARS_LOADED);
            });
    }

    function listAllCars(context) {
        console.log(context)
    }

    return {
        all,
    }

})();

export { carController };