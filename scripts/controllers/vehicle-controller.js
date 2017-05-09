import { constants } from "../common/constants.js";
import { kinveyRequester } from "../common/kinvey-requester.js";
import { templateLoader as tl } from "../common/template-loader.js";
import * as models from "../models/models.js";
import * as imageTools from "../common/image-tools.js";

let vehicleController = (function() {

    let allVehicles = [];
    let userAds = [];

    function all(context) {
        $("#vehiclesForSale").removeClass("open");

        $("#sortOptions").show();
        let sortOrder = $("#sortOrder").val();
        let itemsPerPage = +$("#itemsPerPage").val();
        let pageNumber = $("#pageNumber").val();

        Promise.all([kinveyRequester.findAllVehicles(sortOrder, itemsPerPage, pageNumber), kinveyRequester.getNumberOfVehicles(), tl.get("vehicles")])
            .then(([data, numberOfVehicles, template]) => {
                let currentUser = sessionStorage.getItem("userID");
                for (let vehicle of data) {
                    if (currentUser === vehicle._acl.creator) {
                        userAds.push(vehicle);
                        vehicle.currentUser = currentUser;
                    }
                }

                let count = +numberOfVehicles.count;
                let i = 0;
                $("#pageNumber").html("");
                while (i * itemsPerPage < count) {
                    i += 1;
                    let nextPage = $("<option></option>");
                    nextPage.html(i);
                    nextPage.attr("value", i);
                    $("#pageNumber").append(nextPage);
                }
                i = 0;

                $("#content").html(template(data));
                allVehicles = data.slice();

                $("sortOptions").on("change", () => {
                    event.preventDefault();
                    vehicleController.all();
                });
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

                    if ($(ev.target).hasClass("wishList")) {
                        addToWishList(selectedVehicleId);
                    }

                    if ($(ev.target).hasClass("deleteLink")) {
                        document.location = "#/Delete/?id=" + selectedVehicleId;
                    }

                    if ($(ev.target).hasClass("vehicleDetails")) {
                        document.location = "#/VehicleDetails/?id=" + selectedVehicleId;
                    }
                });
            });

        let search = $("#vehicleSearch");
        search.keyup(function(ev) {
            let text = search.val().toLowerCase();
            let searchedVehicles = [];
            $("#vehiclesForSale").removeClass("open");
            tl.get("vehicles")
                .then((template) => {
                    for (let vehicle of allVehicles) {
                        let match = vehicle._make.toLowerCase().indexOf(text) >= 0 ||
                            vehicle._model.toLowerCase().indexOf(text) >= 0;
                        if (match) {
                            searchedVehicles.push(vehicle);
                        }
                    }

                    $("#content").html(template(searchedVehicles))
                });
        });
    }

    function seeYourAds(context) {
        $("#vehiclesForSale").removeClass("open");

        const userId = sessionStorage.getItem("userID");

        Promise.all([kinveyRequester.findVehiclesByOwnerId(userId), tl.get("your-ads")])
            .then(([data, template]) => {
                context.$element().html(template(data));

                $(".caption").on("click", function(ev) {
                    const selectedVehicleId = $(this).attr("id");
                    if ($(ev.target).hasClass("editLink")) {
                        document.location = "#/Edit/?id=" + selectedVehicleId;
                    }

                    if ($(ev.target).hasClass("wishList")) {
                        addToWishList(selectedVehicleId);
                    }

                    if ($(ev.target).hasClass("deleteLink")) {
                        document.location = "#/Delete/?id=" + selectedVehicleId;
                    }

                    if ($(ev.target).hasClass("vehicleDetails")) {
                        document.location = "#/VehicleDetails/?id=" + selectedVehicleId;
                    }
                });
            })
            .catch((err) => toastr.error(err.responseText));
    }

    function addToWishList(vehicleId) {
        kinveyRequester.addToWishList(vehicleId)
            .then(() => toastr.success(constants.SUCCESS_ADD_TO_WISHLIST))
            .catch((err) => toastr.error(err.responseText));
    }

    function userWishList(context) {
        $("#sortOptions").hide();

        kinveyRequester.getUserWishList()
            .then((data) => {
                Promise.all([kinveyRequester.findVehiclesById(data), tl.get("wish-list")])
                    .then(([vehicles, template]) => {
                        context.$element().html(template(vehicles));
                    })
                    .then(() => {
                        $("#btn-Back").on("click", function(ev) {
                            document.location = ("#/Shop")
                        });

                        $(".remove-wish").on("click", function(ev) {
                            const userId = sessionStorage.getItem("userID");
                            const vehicleId = $(ev.target).parents(".container").attr("id");
                            kinveyRequester.getFullUserWishList()
                                .then((wishes) => {
                                    for (let wish of wishes) {
                                        if (wish.userId === userId && wish.vehicleId === vehicleId) {
                                            kinveyRequester.deleteVehicleFromWishList(wish._id)
                                                .then(() => toastr.success(constants.SUCCESS_DELETE))
                                                .then(() => document.location = ("#/UserChoise"))
                                                .catch((err) => toastr.error(err.responseText));
                                        }
                                    };
                                })
                                .catch((err) => toastr.error(err.responseText));
                        });
                    })
                    .catch((err) => toastr.error(err.responseText));
            })
            .catch((err) => toastr.error(err.responseText));
    }

    function vehicleDetails(context) {
        document.getElementById("sortOptions").style.display = "none";

        const id = context.params["id"];

        kinveyRequester.findVehicleById(id)
            .then((vehicle) => {
                const ownerId = vehicle._acl.creator;
                Promise.all([tl.get("vehicle-details"), kinveyRequester.getUser(ownerId)])
                    .then(([template, user]) => {
                        const data = { vehicle, user };
                        context.$element().html(template(data));
                    })
                    .then(() => {
                        $("#btn-Back").on("click", function(ev) {
                            document.location = ("#/Shop")
                        });
                    })
                    .catch((err) => toastr.error(err.responseText));
            })
            .catch((err) => toastr.error(err.responseText));
    }

    function addVehicle(context) {
        $("#sortOptions").hide();

        $("#vehiclesForSale").removeClass("open");

        tl.get("add-vehicle")
            .then(template => context.$element().html(template(constants.VEHICLE_TYPES)))
            .then(() => {
                $("#new-vehicle-type").on("change", function() {
                    const selected = $(this).val();
                    const motorcycleType = $("#motorcycleType");
                    const truckAxes = $("#truckAxes");
                    const busSeats = $("#busSeats");

                    switch (selected) {
                        case "Car":
                            motorcycleType.addClass("hidden");
                            truckAxes.addClass("hidden");
                            busSeats.addClass("hidden");
                            break;
                        case "Motorcycle":
                            motorcycleType.removeClass("hidden");
                            truckAxes.addClass("hidden");
                            busSeats.addClass("hidden");
                            break;
                        case "Truck":
                            motorcycleType.addClass("hidden");
                            truckAxes.removeClass("hidden");
                            busSeats.addClass("hidden");
                            break;
                        case "Bus":
                            motorcycleType.addClass("hidden");
                            truckAxes.addClass("hidden");
                            busSeats.removeClass("hidden");
                            break;
                        default:
                            break;
                    }

                });

                $("#btnAddVehicle").on("click", () => {
                    const make = $("#new-vehicle-make").val();
                    const model = $("#new-vehicle-model").val();
                    const firstRegistration = $("#new-vehicle-year").val();
                    const fuelType = $("#new-vehicle-fuel-type").val();
                    const hp = $("#new-vehicle-hp").val();
                    const price = $("#new-vehicle-price").val();
                    const info = $("#new-vehicle-info").val();
                    const image = $("#new-vehicle-image-file")[0].files[0];

                    const vehicleType = $("#new-vehicle-type").val();

                    let newVehicle = {};

                    try {
                        switch (vehicleType) {
                            case "Car":
                                newVehicle = models.getCar(make, model, firstRegistration, fuelType, hp, price, info);
                                break;
                            case "Motorcycle":
                                const type = $("#motorcycleType").val();
                                newVehicle = models.getMotorcycle(make, model, firstRegistration, fuelType, hp, price, info, type);
                                break;
                            case "Truck":
                                const axes = $("#truckAxes").val();
                                newVehicle = models.getTruck(make, model, firstRegistration, fuelType, hp, price, info, axes);
                                break;
                            case "Bus":
                                const seats = $("#busSeats").val();
                                newVehicle = models.getBus(make, model, firstRegistration, fuelType, hp, price, info, seats);
                                break;
                            default:
                                break;
                        }
                    } catch (ex) {
                        toastr.error(ex.message);
                        return;
                    }

                    newVehicle["_vehicleType"] = vehicleType;
                    newVehicle["_imageUrl"] = "";

                    kinveyRequester.createVehicle(newVehicle)
                        .then(() => {
                            if (image) {
                                const currentUserId = sessionStorage.getItem("userID");
                                kinveyRequester.findLastVehicleIdByOwnerId(currentUserId)
                                    .then((data) => {
                                        const metadata = {
                                            vehicleId: data._id,
                                            mimeType: image.type,
                                            _public: true
                                        };

                                        imageTools.default.resize(image, {
                                            width: constants.MAX_IMAGE_WIDTH,
                                            height: constants.MAX_IMAGE_HEIGHT
                                        }, function(blob) {
                                            kinveyRequester.uploadImage(blob, metadata);
                                        });

                                    });
                            }
                        })
                        .then(() => {
                            toastr.success(constants.SUCCESS_ADD_VEHICLE);
                        })
                        .catch((err) => {
                            toastr.error(err.responseText);
                        });
                });
            });
    }

    function editVehicle(context) {
        $("#sortOptions").hide();

        const id = context.params["id"];
        let vehicle = {};
        Promise.all([kinveyRequester.findVehicleById(id), tl.get("edit-vehicle")])
            .then(([data, template]) => {
                context.$element().html(template(data));
                toastr.success(`${data._make} ${data._model} preparing for edit`);
            })
            .then(() => {
                $("#btn-Back").on("click", function(ev) {
                    document.location = ("#/Shop")
                });

                $("#btn-Edit").on("click", function(ev) {
                    const make = $("#vehicle-make").val();
                    const model = $("#vehicle-model").val();
                    const firstRegistration = $("#vehicle-year").val();
                    const hp = $("#vehicle-hp").val();
                    const price = $("#vehicle-price").val();
                    const info = $("#vehicle-info").val();
                    const fuelType = $("#vehicle-fuel-type").val();

                    const vehicleType = $("#vehicle-v-type").val();
                    const imageUrl = $("#vehicle-image-url").val();

                    let newVehicle = {};

                    try {
                        switch (vehicleType) {
                            case "Car":
                                newVehicle = models.getCar(make, model, firstRegistration, fuelType, hp, price, info);
                                break;
                            case "Motorcycle":
                                const type = $("#vehicle-type").val();
                                newVehicle = models.getMotorcycle(make, model, firstRegistration, fuelType, hp, price, info, type);
                                break;
                            case "Truck":
                                const axes = $("#vehicle-axes")[0].val();
                                newVehicle = models.getTruck(make, model, firstRegistration, fuelType, hp, price, info, axes);
                                break;
                            case "Bus":
                                const seats = $("#vehicle-seats").val();
                                newVehicle = models.getBus(make, model, firstRegistration, fuelType, hp, price, info, seats);
                                break;
                            default:
                                break;
                        }
                    } catch (ex) {
                        toastr.error(ex.message);
                        return;
                    }

                    newVehicle["_vehicleType"] = vehicleType;
                    newVehicle["_imageUrl"] = imageUrl;

                    kinveyRequester.editVehicle(id, newVehicle)
                        .then(() => {
                            toastr.success(constants.SUCCESS_EDITED)
                            document.location = ("#/Shop");
                        });
                });
            })
            .catch((err) => toastr.error(err));
    }

    function deleteVehicle(context) {
        $("#sortOptions").hide();

        const id = context.params["id"];
        Promise.all([kinveyRequester.findVehicleById(id), tl.get("delete-vehicle")])
            .then(([data, template]) => {
                context.$element().html(template(data))
                toastr.success(`${data._make} ${data._model} preparing for delete`);
            })
            .then(() => {
                $("#btn-goBack").on("click", function(ev) {
                    document.location = ("#/Shop");
                });

                $("#btn-Delete").on("click", function(ev) {
                    kinveyRequester.deleteImageByVehicleId(id);
                    kinveyRequester.deleteVehicle(id)
                        .then(() => {
                            toastr.success(constants.SUCCESS_DELETE);
                            document.location = ("#/Shop");
                        })
                        .catch(() => toastr.error(err.responseText));
                });
            });
    }

    return {
        all,
        vehicleDetails,
        addVehicle,
        editVehicle,
        deleteVehicle,
        seeYourAds,
        userWishList
    }

})();

export { vehicleController };