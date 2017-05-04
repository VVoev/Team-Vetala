let constants = (function() {

    let messages = {
        SUCCESS_DELETE: "Vehicle succesfully deleted",
        SUCCESS_LOGIN: "You have login successful",
        SUCCESS_REGISTER: "Register successful",
        SUCCESS_LOGOUT: "Logout successful",
        SUCCESS_EDITED: "Vehicle sucessful edited",
        VEHICLES_LOADED: "Vehicles loaded",
        SUCCESS_ADD_VEHICLE: "Vehicle addeed successful",
        ERROR_ALREADY_LOGGED: "You already logged in",
        ERROR_HAVE_ACCOUNT: "You already have account",
        ERROR_UNAUTORIZED: "You must log in to do this",
        MAX_IMAGE_WIDTH: 640,
        MAX_IMAGE_HEIGHT: 360,
        CONTACTS: {
            contacts: [
                { name: "Vlado Voev", github: "https://github.com/VVoev" },
                { name: "Jivko Ivanov", github: "https://github.com/jorosoft" },
                { name: "Daniel Slavov", github: "https://github.com/daniel-slavov" }
            ]
        },
        VEHICLE_TYPES: {
            types: [
                { type: "Car" },
                { type: "Motorcycle" },
                { type: "Truck" },
                { type: "Bus" }
            ],
            fuelTypes: [
                { fuelType: "petrol" },
                { fuelType: "diesel" },
                { fuelType: "LPG" },
                { fuelType: "other" }
            ]
        }
    };

    return messages;

})();
export { constants };