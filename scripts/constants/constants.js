let constants = (function() {

    let messages = {
        SUCCESS_LOGIN: "You have login successful",
        SUCCESS_REGISTER: "Register successful",
        SUCCESS_LOGOUT: "Logout successful",
        SUCCESS_EDITED:"Car sucessful edited",
        CARS_LOADED: "Cars loaded",
        SUCCESS_ADD_VEHICLE: "Vehicle addeed successful",
        ERROR_ALREADY_LOGGED: "You already logged in",
        ERROR_HAVE_ACCOUNT: "You already have account",
        ERROR_UNAUTORIZE_ADD_VEHICLE: "You must log in to add vehicle",
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