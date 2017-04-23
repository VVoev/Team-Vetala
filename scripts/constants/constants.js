let constants = (function() {

    let messages = {
        SUCCESS_LOGIN: "You have login successful",
        SUCCESS_REGISTER: "Register successful",
        SUCCESS_LOGOUT: "Logout successful",
        CARS_LOADED: "Cars loaded",
        SUCCESS_ADD_VEHICLE: "Vehicle addeed successful",
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
            ]
        }
    };

    return messages;

})();
export { constants };