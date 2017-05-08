import { vehicleController } from "../controllers/vehicle-controller.js";

let kinveyRequester = (function() {
    const appKey = "kid_r110JsORe";
    const appSecret = "4e37e5b1ca8444ca88ed6b7c24e3f173";
    const baseUrl = "https://baas.kinvey.com/";
    const kinveyAppAuthHeaders = {
        "Authorization": "Basic " + btoa(appKey + ":" + appSecret),
    };
    const kinveyInit = Kinvey.init({
        appKey: appKey,
        appSecret: appSecret
    });

    function loginUser(user) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/login",
            headers: kinveyAppAuthHeaders,
            data: user
        });
    }

    function registerUser(user) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/",
            headers: kinveyAppAuthHeaders,
            data: user
        });
    }

    function getKinveyUserAuthHeaders() {
        return {
            "Authorization": "Kinvey " + sessionStorage.getItem("authToken"),
        };
    }

    function logoutUser() {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/_logout",
            headers: getKinveyUserAuthHeaders()
        });
    }

    function getUser(userId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "user/" + appKey + "/" + userId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function getNumberOfVehicles() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/Vehicles/_count",
            headers: getKinveyUserAuthHeaders()
        });
    }

    function findAllVehicles(sortOrder, itemsPerPage, pageNumber) {
        toastr.info("Loading")
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/Vehicles?sort=" + sortOrder + "&limit=" + itemsPerPage + "&skip=" + ((pageNumber - 1) * itemsPerPage),
            headers: getKinveyUserAuthHeaders(),
            error: handleAjaxError
        });
    }

    function findVehicleById(vehicleId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/Vehicles/" + vehicleId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function findVehiclesById(vehiclesIdArray) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/Vehicles/",
            headers: getKinveyUserAuthHeaders(),
            dataFilter: function(data) {
                data = JSON.parse(data);
                data = Array.from(data).filter(x => vehiclesIdArray.indexOf(x._id) !== -1);

                return JSON.stringify(data);
            }
        });
    }

    function findLastVehicleIdByOwnerId(ownerId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/Vehicles",
            headers: getKinveyUserAuthHeaders(),
            error: handleAjaxError,
            dataFilter: function(data) {
                data = JSON.parse(data);
                data = Array.from(data).filter(x => x._acl.creator === ownerId);

                return JSON.stringify(data[data.length - 1]);
            }
        });
    }

    function findVehiclesByOwnerId(ownerId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/Vehicles",
            headers: getKinveyUserAuthHeaders(),
            error: handleAjaxError,
            dataFilter: function(data) {
                data = JSON.parse(data);
                data = Array.from(data).filter(x => x._acl.creator === ownerId);

                return JSON.stringify(data);
            }
        });
    }

    function uploadImage(file, metadata) {
        kinveyInit
            .then(() => {
                Kinvey.File.upload(file, metadata)
                    .then(() => {
                        updateImageUrl(metadata.vehicleId);
                    })
                    .then(() => document.location = "#/Shop")
                    .catch(function(error) {
                        console.log(error);
                    })
            });
    }

    function updateImageUrl(vehicleId) {
        const query = new Kinvey.Query();
        query.equalTo('vehicleId', vehicleId);

        kinveyInit
            .then(() => {
                Kinvey.File.find(query)
                    .then((vehicleImage) => {
                        findVehicleById(vehicleId)
                            .then((vehicle) => {
                                vehicle._imageUrl = vehicleImage[0]._downloadURL;
                                $.ajax({
                                    method: "PUT",
                                    url: baseUrl + "appdata/" + appKey + "/Vehicles/" + vehicleId,
                                    headers: getKinveyUserAuthHeaders(),
                                    data: vehicle
                                });
                            });
                    });
            });
    }

    function createVehicle(vehicle) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appKey + "/Vehicles",
            headers: getKinveyUserAuthHeaders(),
            data: vehicle
        });
    }

    function editVehicle(vehicleId, vehicle) {
        return $.ajax({
            method: "PUT",
            url: baseUrl + "appdata/" + appKey + "/Vehicles/" + vehicleId,
            headers: getKinveyUserAuthHeaders(),
            data: vehicle
        });
    }

    function deleteVehicle(vehicleId) {
        return $.ajax({
            method: "DELETE",
            url: baseUrl + "appdata/" + appKey + "/Vehicles/" + vehicleId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    //function only to handle Error for AJAX
    function handleAjaxError(response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON &&
            response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        toastr.error(errorMsg);
    }

    function addToWishList(vehicleId) {
        const userId = sessionStorage.getItem("userID");

        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appKey + "/WishList",
            headers: getKinveyUserAuthHeaders(),
            data: { userId, vehicleId }
        });
    }

    function getUserWishList() {
        const userId = sessionStorage.getItem("userID");

        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/WishList",
            headers: getKinveyUserAuthHeaders(),
            dataFilter: function(data) {
                data = JSON.parse(data);
                data = Array.from(data).filter(x => x.userId === userId).map(x => x.vehicleId);

                return JSON.stringify(data);
            }
        });
    }

    function getFullUserWishList() {
        const userId = sessionStorage.getItem("userID");

        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/WishList",
            headers: getKinveyUserAuthHeaders(),
            dataFilter: function(data) {
                data = JSON.parse(data);
                data = Array.from(data).filter(x => x.userId === userId);

                return JSON.stringify(data);
            }
        });
    }

    function deleteVehicleFromWishList(wishListId) {
        return $.ajax({
            method: "DELETE",
            url: baseUrl + "appdata/" + appKey + "/WishList/" + wishListId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function deleteImageByVehicleId(vehicleId) {
        const query = new Kinvey.Query();
        query.equalTo('vehicleId', vehicleId);

        kinveyInit
            .then(() => {
                Kinvey.File.find(query)
                    .then((vehicleImage) => {
                        Kinvey.File.destroy(vehicleImage[0]._id);
                    });
            });
    }

    return {
        loginUser,
        registerUser,
        logoutUser,
        getUser,
        getNumberOfVehicles,
        findAllVehicles,
        uploadImage,
        createVehicle,
        findVehicleById,
        findVehiclesById,
        findLastVehicleIdByOwnerId,
        findVehiclesByOwnerId,
        editVehicle,
        deleteVehicle,
        addToWishList,
        getUserWishList,
        getFullUserWishList,
        deleteVehicleFromWishList,
        deleteImageByVehicleId
    }

})()

export { kinveyRequester }