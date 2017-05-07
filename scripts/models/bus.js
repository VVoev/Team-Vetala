import { Vehicle } from "./vehicle.js";
import { validator } from "../common/validator.js";

export class Bus extends Vehicle {
    constructor(make, model, firstRegistration, fuelType, hp, price, info, seats) {
        super(make, model, firstRegistration, fuelType, hp, price, info);
        this.seats = seats;
    }

    get seats() {
        return this._seats;
    }

    set seats(value) {
        validator.validateInteger(value);
        validator.validateNumberInRange(value, 1, 100);

        this._seats = +value;
    }
}