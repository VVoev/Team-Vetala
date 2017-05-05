import { vehicleController } from "../controllers/vehicle-controller.js";

let kinveyRequester = (function() {
    const appKey = "kid_r110JsORe";
    const appSecret = "4e37e5b1ca8444ca88ed6b7c24e3f173";
    const baseUrl = "https://baas.kinvey.com/";
    const kinveyAppAuthHeaders = {
        "Authorization": "Basic " + btoa(appKey + ":" + appSecret),
    };

    function loginUser(username, password) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/login",
            headers: kinveyAppAuthHeaders,
            data: { username, password }
        });
    }

    function registerUser(username, password) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/",
            headers: kinveyAppAuthHeaders,
            data: { username, password }
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
            headers: getKinveyUserAuthHeaders(),
        });
    }

    function getNumberOfVehicles() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/Cars/_count"
        });
    }

    function findAllVehicles(sortOrder, itemsPerPage, pageNumber) {
        toastr.info("Loading")
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/Cars?sort=" + sortOrder + "&limit=" + itemsPerPage + "&skip=" + ((pageNumber - 1)*itemsPerPage),
            headers: getKinveyUserAuthHeaders(),
            error: handleAjaxError
        });
    }

    function findVehicleById(vehicleId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/Cars/" + vehicleId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function findLastVehicleIdByOwnerId(id) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/Cars",
            headers: getKinveyUserAuthHeaders(),
            error: handleAjaxError,
            dataFilter: function(data) {
                data = JSON.parse(data);
                data = Array.from(data).filter(x => x._acl.creator === id);

                return JSON.stringify(data[data.length - 1]);
            }
        });
    }

    function uploadImage(file, metadata, vehicleId) {
        const kinveyInit = Kinvey.init({
            appKey: appKey,
            appSecret: appSecret
        });

        kinveyInit
            .then(() => {
                Kinvey.File.upload(file, metadata)
                    .then(() => {
                        updateImageUrl(metadata.vehicleId);
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
            });
    }

    function updateImageUrl(vehicleId) {
        const kinveyInit = Kinvey.init({
            appKey: appKey,
            appSecret: appSecret
        });

        const query = new Kinvey.Query();
        query.equalTo('vehicleId', vehicleId);

        kinveyInit
            .then(() => {
                Kinvey.File.find(query)
                    .then((vehicleImage) => {
                        findVehicleById(vehicleId)
                            .then((vehicle) => {
                                vehicle.imageUrl = vehicleImage[0]._downloadURL;
                                $.ajax({
                                        method: "PUT",
                                        url: baseUrl + "appdata/" + appKey + "/Cars/" + vehicleId,
                                        headers: getKinveyUserAuthHeaders(),
                                        data: vehicle
                                    })
                                    .then(() => {
                                        document.location = "#/Shop";
                                    });
                            });
                    });
            });
    }

    function createVehicle(vehicleType, make, model, firstRegistration, fuelType, hp, price, info) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appKey + "/Cars",
            headers: getKinveyUserAuthHeaders(),
            data: { vehicleType, make, model, firstRegistration, fuelType, hp, price, info }
        });
    }

    function editVehicle(vehicleId, vehicle) {
        return $.ajax({
            method: "PUT",
            url: baseUrl + "appdata/" + appKey + "/Cars/" + vehicleId,
            headers: getKinveyUserAuthHeaders(),
            data: vehicle
        });
    }

    function deleteVehicle(vehicleId) {
        return $.ajax({
            method: "DELETE",
            url: baseUrl + "appdata/" + appKey + "/Cars/" + vehicleId,
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

    return {
        loginUser,
        registerUser,
        logoutUser,
        getNumberOfVehicles,
        findAllVehicles,
        uploadImage,
        createVehicle,
        findVehicleById,
        findLastVehicleIdByOwnerId,
        editVehicle,
        deleteVehicle
    }

})()

export { kinveyRequester }