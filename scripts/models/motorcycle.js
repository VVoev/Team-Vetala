import { Vehicle } from "./vehicle.js";
import { validator } from "../common/validator.js";

export class Motorcycle extends Vehicle {
    constructor(make, model, firstRegistration, fuelType, hp, price, info, type) {
        super(make, model, firstRegistration, fuelType, hp, price, info);
        this.type = type;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        validator.validateStringLength(value, 2, 10);

        this._type = value.trim();
    }
}