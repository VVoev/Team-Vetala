import { constants } from "../constants/constants.js";
import { kinveyRequester } from "../common/kinvey-requester.js";
import { templateLoader as tl } from "../common/template-loader.js";
import * as models from "../models/models.js";

let carController = (function() {

        function all(context) {
            $("#carsForSale").removeClass("open");
            Promise.all([kinveyRequester.findAllCars(), tl.get("cars")])
                .then(([data, template]) => {
                    //dont touch the code because "maikata si ebalo"
                    let currentUser = sessionStorage.getItem("userID");
                    for (let vehicle of data) {
                        if (currentUser === vehicle._acl.creator) {
                            vehicle.currentUser = currentUser;
                        }
                    }
                    context.$element().html(template(data))
                })
                .then((options) => {
                    toastr.success(constants.CARS_LOADED);
                })
                .then(() => {
                    $(".caption").on("click", function(ev) {
                        if ($(ev.target).hasClass("editLink")) {
                            document.location = "#/Edit";
                        }

                        if ($(ev.target).hasClass("deleteLink")) {
                            document.location = "#/Delete";
                        }
                    });

                });

            $("#content").on("click", function(ev) {
                //TODO need to find a way to make width bigger cause currently it is limited to div width
                if (ev.target.nodeName === "IMG") {
                    let target = $(ev.target);
                    target.animate({ height: "300px", opacity: "0.8" }, "slow");
                    target.animate({ width: "300px", opacity: "0.8" }, "slow");
                    target.animate({ height: "100px", opacity: "0.8" }, "slow");
                    target.animate({ width: "100px", opacity: "0.8" }, "slow");
                }
                if (ev.target.nodeName === "A") {
                    let elem = $(ev.target);
                    let hiddenElem = elem.next();
                    $(elem).click(function() {
                        elem.hide();
                        $(hiddenElem).slideToggle("slow");
                    });
                }
            })


        }

        function addCar(context) {
            $("#carsForSale").removeClass("open");
            let newFileName = "";
            tl.get("add-car")
                .then(template => context.$element().html(template(constants.VEHICLE_TYPES)))
                .then(() => {
                    $("#btnAddCar").on("click", () => {
                        const make = $("#new-car-make").val();
                        const model = $("#new-car-model").val();
                        const firstRegistration = $("#new-car-year").val();
                        const fuelType = $("#new-car-fuel-type").val();
                        const hp = $("#new-car-hp").val();
                        const price = $("#new-car-price").val();
                        const info = $("#new-car-info").val();
                        const image = $("#new-car-image-file").val().split(".");
                        const imageExt = image[image.length - 1];
                        const vehicleType = $("#new-car-vehicle-type").val();

                        const newVehicle = models.getCar(vehicleType, make, model, firstRegistration, fuelType, hp, price, info);

                        kinveyRequester.createCar(vehicleType, make, model, firstRegistration, fuelType, hp, price, info)
                            .then(() => {
                                const file = $("#new-car-image-file")[0].files[0];
                                // TODO: Check if file is selected...
                                const currentUserId = sessionStorage.getItem("userID");
                                kinveyRequester.findLastCarIdByOwnerId(currentUserId)
                                    .then((data) => {
                                        const metadata = {
                                            vehicleId: data._id,
                                            mimeType: "image/" + imageExt,
                                            size: file.length,
                                            _public: true
                                        };

                                        kinveyRequester.uploadImage(file, metadata);
                                        toastr.success(constants.SUCCESS_ADD_VEHICLE);
                                    });
                            })
                            .catch((err) => {
                                toastr.error(err.responseText);
                            });
                    });
                });
        }

        function editCar(context) {
            const id = context.params["id"];
            let vehicle = {};
            Promise.all([kinveyRequester.findCarById(id), tl.get("edit-car")])
                .then(([data, template]) => {
                    context.$element().html(template(data));
                    vehicle = data;
                    toastr.success(`${data.make} ${data.model} preparing for edit`);
                })
                .then(() => {
                    $("#btn-Back").on("click", function(ev) {
                        document.location = ("#/Shop")
                    })
                    $("#btn-Edit").on("click", function(ev) {
                        vehicle.make = $("#make-input").val();
                        vehicle.model = $("#model-input").val();
                        vehicle.price = $("#price-input").val();
                        kinveyRequester.editCar(id, vehicle)
                            .then(() => {
                                toastr.success(constants.SUCCESS_EDITED)
                                document.location = ("#/Shop");
                            });
                    });
                })
                .catch((err) => toastr.error(err));
        }

        function deleteCar(context) {
            const id = context.params["id"];
            Promise.all([kinveyRequester.findCarById(id), tl.get("delete-car")])
                .then(([data, template]) => {
                    context.$element().html(template(data))
                    toastr.success(`${data.make} ${data.model} preparing for delete`);
                })
                .then(() => {
                    $("#btn-goBack").on("click", function(ev) {
                        document.location = ("#/Shop")
                    })
                    $("#btn-Delete").on("click", function(ev) {
                        kinveyRequester.deleteCar(id)
                            .then(() => {
                                toastr.success(constants.SUCCESS_DELETE)
                                document.location = ("#/Shop");
                            });
                    });
                })
                .catch((err) => toastr.error(err));
        }

        return {
            all,
            addCar,
            editCar,
            deleteCar
        }

    })
    ();

export { carController };