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
        // TODO: Find better way to check
        if (sessionStorage.authToken) {
            return true;
        }

        return false;
    }

    return {
        checkIfFieldsAreEqual,
        isUserLoggedIn
    }
})();

export { validator };