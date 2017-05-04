import { constants } from "../common/constants.js";
import { kinveyRequester } from "../common/kinvey-requester.js";
import { templateLoader as tl } from "../common/template-loader.js";
import * as models from "../models/models.js";

let vehicleController = (function() {

        function all(context) {
            $("#vehiclesForSale").removeClass("open");
            Promise.all([kinveyRequester.findAllVehicles(), tl.get("vehicles")])
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
                    toastr.success(constants.VEHICLES_LOADED);
                })
                .then(() => {
                    $(".caption").on("click", function(ev) {
                        const selectedVehicleId = $(this).attr("id");
                        if ($(ev.target).hasClass("editLink")) {
                            document.location = "#/Edit/?id=" + selectedVehicleId;
                        }

                        if ($(ev.target).hasClass("deleteLink")) {
                            document.location = "#/Delete/?id=" + selectedVehicleId;
                        }

                        if ($(ev.target).hasClass("vehicleDetails")) {
                            document.location = "#/VehicleDetails/?id=" + selectedVehicleId;
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
            });
        }

        function vehicleDetails(context) {
            const id = context.params["id"];
            Promise.all([tl.get("vehicle-details"), kinveyRequester.findVehicleById(id)])
                .then(([template, data]) => {
                    context.$element().html(template(data));

                })
                .then(() => {
                    $("#btn-Back").on("click", function(ev) {
                        document.location = ("#/Shop")
                    });
                })
                .catch((err) => toastr.error(err.responseText));
        }

        function resizeImage(image) {
            let fr = new FileReader;
            let img = new Image;
            let canvas = document.createElement("canvas");

            fr.readAsDataURL(image);
            fr.onload = function() {
                img.onload = function() {
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > constants.MAX_IMAGE_WIDTH) {
                            height *= constants.MAX_IMAGE_WIDTH / width;
                            width = constants.MAX_IMAGE_WIDTH;
                        }
                    } else {
                        if (height > constants.MAX_IMAGE_HEIGHT) {
                            width *= constants.MAX_IMAGE_HEIGHT / height;
                            height = constants.MAX_IMAGE_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    let ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);
                };

                img.src = fr.result;
            };

            return canvas;
        }

        function addVehicle(context) {
            $("#vehiclesForSale").removeClass("open");
            let newFileName = "";
            tl.get("add-vehicle")
                .then(template => context.$element().html(template(constants.VEHICLE_TYPES)))
                .then(() => {
                    $("#btnAddVehicle").on("click", () => {
                        const make = $("#new-vehicle-make").val();
                        const model = $("#new-vehicle-model").val();
                        const firstRegistration = $("#new-vehicle-year").val();
                        const fuelType = $("#new-vehicle-fuel-type").val();
                        const hp = $("#new-vehicle-hp").val();
                        const price = $("#new-vehicle-price").val();
                        const info = $("#new-vehicle-info").val();
                        const image = $("#new-vehicle-image-file").val().split(".");

                        const vehicleType = $("#new-vehicle-type").val();

                        const newVehicle = models.getCar(vehicleType, make, model, firstRegistration, fuelType, hp, price, info);

                        const file = $("#new-vehicle-image-file")[0].files[0];

                        kinveyRequester.createVehicle(vehicleType, make, model, firstRegistration, fuelType, hp, price, info)
                            .then(() => {
                                if (image) {
                                    const file = $("#new-vehicle-image-file")[0].files[0];
                                    const currentUserId = sessionStorage.getItem("userID");
                                    kinveyRequester.findLastVehicleIdByOwnerId(currentUserId)
                                        .then((data) => {
                                            const metadata = {
                                                vehicleId: data._id,
                                                mimeType: file.type,
                                                size: file.length,
                                                _public: true
                                            };

                                            // const resizedImage = resizeImage(file);
                                            kinveyRequester.uploadImage(file, metadata);
                                        });
                                }
                            })
                            .then(() => {
                                toastr.success(constants.SUCCESS_ADD_VEHICLE);
                                document.location = "#/Shop";
                            })
                            .catch((err) => {
                                toastr.error(err.responseText);
                            });
                    });
                });
        }

        function editVehicle(context) {
            const id = context.params["id"];
            let vehicle = {};
            Promise.all([kinveyRequester.findVehicleById(id), tl.get("edit-vehicle")])
                .then(([data, template]) => {
                    context.$element().html(template(data));
                    vehicle = data;
                    toastr.success(`${data.make} ${data.model} preparing for edit`);
                })
                .then(() => {
                    $("#btn-Back").on("click", function(ev) {
                        document.location = ("#/Shop")
                    });

                    $("#btn-Edit").on("click", function(ev) {
                        vehicle.make = $("#make-input").val();
                        vehicle.model = $("#model-input").val();
                        vehicle.price = $("#price-input").val();
                        kinveyRequester.editVehicle(id, vehicle)
                            .then(() => {
                                toastr.success(constants.SUCCESS_EDITED)
                                document.location = ("#/Shop");
                            });
                    });
                })
                .catch((err) => toastr.error(err));
        }

        function deleteVehicle(context) {
            const id = context.params["id"];
            Promise.all([kinveyRequester.findVehicleById(id), tl.get("delete-vehicle")])
                .then(([data, template]) => {
                    context.$element().html(template(data))
                    toastr.success(`${data.make} ${data.model} preparing for delete`);
                })
                .then(() => {
                    $("#btn-goBack").on("click", function(ev) {
                        document.location = ("#/Shop")
                    });

                    $("#btn-Delete").on("click", function(ev) {
                        kinveyRequester.deleteVehicle(id)
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
            vehicleDetails,
            addVehicle,
            editVehicle,
            deleteVehicle
        }

    })
    ();

export { vehicleController };