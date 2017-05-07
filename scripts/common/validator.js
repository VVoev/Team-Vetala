import { constants } from "../common/constants.js";

let validator = (function() {

    function checkIfFieldsAreEqual(field1, field2) {
        if (field1.length !== field2.length) {
            return false;
        }
        checkIfNullOrUndefined(field1);
        checkIfNullOrUndefined(field2);
        checkSymbolBySymbol(field1, field2);

        return true;
    }

    function checkIfNullOrUndefined(field) {
        if (field.length === 0 || field === undefined) {
            return false;
        }
        return true;
    }

    function checkSymbolBySymbol(field1, field2) {
        for (let letter of field1) {
            if (field1[letter] !== field2[letter]) {
                return false;
            }
        }
        return true;
    }

    function isUserLoggedIn() {
        return sessionStorage.authToken &&
            sessionStorage.userID &&
            sessionStorage.userName;
    }

    function validateStringLength(value, minLength, maxLength) {
        if (!value || value.trim().length === 0 || value < minLength || value > maxLength) {
            throw new Error(constants.INVALID_INPUT);
        }
    }

    function validateNumberInRange(value, minValue, maxValue) {
        if (!value || Number.isNaN(value) || value < minValue || value | maxValue) {
            throw new Error(constants.INVALID_INPUT);
        }
    }

    function validateInteger(value) {
        if (!value || Number.isNaN(value) || !Number.isInteger(value)) {
            throw new Error(constants.INVALID_INPUT);
        }
    }

    function validateUserName(value) {
        const regEx = /^[a-zA-Z0-9]+$/;

        if (!value || !value.match(regEx)) {
            throw new Error(constants.INVALID_USER_OR_PASS);
        }
    }

    function validatePassword(value) {
        if (!value) {
            throw new Error(constants.INVALID_USER_OR_PASS);
        }
    }

    function validateEmail(value) {
        const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!value || !value.match(regEx)) {
            throw new Error(constants.INVALID_EMAIL);
        }
    }




    return {
        checkIfFieldsAreEqual,
        isUserLoggedIn,
        validateStringLength,
        validateNumberInRange,
        validateInteger,
        validateUserName,
        validatePassword,
        validateEmail
    }
})();

export { validator };