let kinveyRequester = (function () {
    const appKey = "kid_r110JsORe";
    const appSecret = "4e37e5b1ca8444ca88ed6b7c24e3f173";
    const baseUrl = "https://baas.kinvey.com/";
    const kinveyAppAuthHeaders = {
        'Authorization': "Basic " + btoa(appKey + ":" + appSecret),
    };

    function loginUser(username, password) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/login",
            headers: kinveyAppAuthHeaders,
            data: {username, password}
        });
    }

    function registerUser(username, password) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/",
            headers: kinveyAppAuthHeaders,
            data: {username, password}
        });
    }

    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
        };
    }

    function logoutUser() {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/_logout",
            headers: getKinveyUserAuthHeaders(),
        });
    }

    function findAllCars() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/carApp",
            headers: getKinveyUserAuthHeaders()
        });
    }

    function findCarById(carId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/carApp/" + carId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function createCar(make, model, price, firstRegistration) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appKey + "/carApp",
            headers: getKinveyUserAuthHeaders(),
            data: {make, model, price, firstRegistration}
        });
    }

    function editCar(carId, make, model, price, firstRegistration) {
        return $.ajax({
            method: "PUT",
            url: baseUrl + "appdata/" + appKey + "/carApp/" + carId,
            headers: getKinveyUserAuthHeaders(),
            data: {make, model, price, firstRegistration}
        });
    }

    function deleteCar(carId) {
        return $.ajax({
            method: "DELETE",
            url: baseUrl + "appdata/" + appKey + "/carApp/" + carId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    return {
        loginUser, registerUser, logoutUser,
        findAllCars, createCar, findCarById, editCar, deleteCar
    }

})()

export {kinveyRequester}

