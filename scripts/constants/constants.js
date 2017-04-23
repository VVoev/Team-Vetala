let constants = (function() {

    let messages = {
        SUCCESS_LOGIN: "You have login successful",
        SUCCESS_REGISTER: "Register successful",
        SUCCESS_LOGOUT:"Logout successful",
        CARS_LOADED:"Cars loaded",
        CONTACTS: {
            contacts: [
                { name: "Vlado Voev", github: "https://github.com/VVoev" },
                { name: "Jivko Ivanov", github: "https://github.com/jorosoft" },
                { name: "Daniel Slavov", github: "https://github.com/daniel-slavov" }
            ]
        }
    };

    return messages;

})();
export { constants };