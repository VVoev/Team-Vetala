import { validator } from "../common/validator.js";

export class User {
    constructor(user, pass) {
        this.user = user;
        this.pass = pass;
    }

    get user() {
        return this.username;
    }

    set user(value) {
        validator.validateUserName(value);

        this.username = value.trim();
    }

    get pass() {
        return this.password;
    }

    set pass(value) {
        validator.validatePassword(value);

        this.password = CryptoJS.SHA1(value.trim()).toString();
    }
}