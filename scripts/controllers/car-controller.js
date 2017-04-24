import { constants } from '../constants/constants.js';
import { kinveyRequester } from '../kinvey-requester.js';
import { templateLoader as tl } from '../template-loader.js';

let carController = (function() {

    function all(context) {
        $("#carsForSale").removeClass("open");
        Promise.all([kinveyRequester.findAllCars(), tl.get("cars")])
            .then(([data, template]) => context.$element().html(template(data)))
            .then((options) => {
                toastr.success(constants.CARS_LOADED);
            });
    }

    function addCar(context) {
        $("#carsForSale").removeClass("open");
        tl.get("add-car")
            .then(template => context.$element().html(template(constants.VEHICLE_TYPES)))
            .then(() => {
                $("#btnAddCar").on("click", () => {
                    const make = $("#new-car-make").val();
                    const model = $("#new-car-model").val();
                    const price = $("#new-car-price").val();
                    const year = $("#new-car-year").val();
                    const info = $("new-car-info").val();
                    kinveyRequester.createCar(make, model, price, year, info)
                        .then(() => {
                            document.location = '#/Home';
                            toastr.success(constants.SUCCESS_ADD_VEHICLE);
                        })
                        .catch((err) => {
                            toastr.error(err.responseText);
                        });
                });
            });
    }

    return {
        all,
        addCar
    }

})();

export { carController };