import { User } from "./user.js";
import { validator } from "../common/validator.js";

export class NewUser extends User {
    constructor(user, pass, mail) {
        super(user, pass);
        this.mail = mail;
    }

    get mail() {
        return this.email;
    }

    set mail(value) {
        validator.validateEmail(value);

        this.email = value.trim();
    }
}