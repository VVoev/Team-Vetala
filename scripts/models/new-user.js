import { User } from "./user.js";

export class NewUser extends User {
    constructor(user, pass, mail) {
        super(user, pass);
        this.mail = mail;
    }

    get mail() {
        return this.email;
    }

    set mail(value) {
        this.email = value;
    }
}