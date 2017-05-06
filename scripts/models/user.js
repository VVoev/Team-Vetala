export class User {
    constructor(user, pass) {
        this.user = user;
        this.pass = pass;
    }

    get user() {
        return this.username;
    }

    set user(value) {
        this.username = value;
    }

    get pass() {
        return this.password;
    }

    set pass(value) {
        this.password = CryptoJS.SHA1(value).toString();
    }
}