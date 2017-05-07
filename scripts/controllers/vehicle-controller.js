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

        document.getElementById('sortOptions').style.display = 'block';
        let sortOrder = document.getElementById('sortOrder').value;
        // console.log(sortOrder);
        let itemsPerPage = document.getElementById('itemsPerPage').value;
        // console.log(itemsPerPage);
        let pageNumber = 1; // to be fixed with pagination

        Promise.all([kinveyRequester.findAllVehicles(sortOrder, itemsPerPage, pageNumber), tl.get("vehicles")])
            .then(([data, template]) => {
                //dont touch the code because "maikata si ebalo"
                let currentUser = sessionStorage.getItem("userID");
                for (let vehicle of data) {
                    if (currentUser === vehicle._acl.creator) {
                        userAds.push(vehicle);
                        vehicle.currentUser = currentUser;
                    }
                }

                $("#content").html(template(data));
                // context.$element().html(template(data));
                allVehicles = data.slice();
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

        let search = $('#vehicleSearch');
        search.keyup(function(ev) {
            let text = search.val();
            let searchedVehicles = [];
            $("#vehiclesForSale").removeClass("open");
            tl.get("vehicles")
                .then((template) => {
                    for (let vehicle of allVehicles) {
                        let match = vehicle.make.indexOf(text) >= 0 || vehicle.model.indexOf(text) >= 0;
                        if (match) {
                            searchedVehicles.push(vehicle);
                        }
                    }

                    $("#content").html(template(searchedVehicles))
                });
        });
    }

    function seeYourAds(context) {
        tl.get("your-ads")
            .then((template) => {
                console.log(userAds)
                context.$element().html(template(userAds))
            })
            .then(() => {
                //after displayed it again go to clear stage otherwise lead to bugs...
                userAds = [];
            })
    }

    function addToWishList(vehicleId) {
        kinveyRequester.addToWishList(vehicleId)
            .then(() => toastr.success(constants.SUCCESS_ADD_TO_WISHLIST))
            .catch((err) => toastr.error(err.responseText));
    }

    function userWishList(context) {
        $('#sortOptions').hide();

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
                    })
                    .catch((err) => toastr.error(err.responseText));
            })
            .catch((err) => toastr.error(err.responseText));
    }

    function vehicleDetails(context) {
        document.getElementById('sortOptions').style.display = 'none';

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
        document.getElementById('sortOptions').style.display = 'none';

        $("#vehiclesForSale").removeClass("open");

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
                    const image = $("#new-vehicle-image-file")[0].files[0];
                    const vehicleType = $("#new-vehicle-type").val();
                    let newVehicle = {};

                    try {
                        newVehicle = models.getCar(make, model, firstRegistration, fuelType, hp, price, info);
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
                            document.location = "#/Shop";
                        })
                        .catch((err) => {
                            toastr.error(err.responseText);
                        });
                });
            });
    }

    function editVehicle(context) {
        document.getElementById('sortOptions').style.display = 'none';

        const id = context.params["id"];
        let vehicle = {};
        Promise.all([kinveyRequester.findVehicleById(id), tl.get("edit-vehicle")])
            .then(([data, template]) => {
                context.$element().html(template(data));
                vehicle = data;
                toastr.success(`${data._make} ${data._model} preparing for edit`);
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
        document.getElementById('sortOptions').style.display = 'none';

        const id = context.params["id"];
        Promise.all([kinveyRequester.findVehicleById(id), tl.get("delete-vehicle")])
            .then(([data, template]) => {
                context.$element().html(template(data))
                toastr.success(`${data._make} ${data._model} preparing for delete`);
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
        deleteVehicle,
        seeYourAds,
        userWishList
    }

})();

export { vehicleController };