import { Vehicle } from "./vehicle.js";

export class Motorcycle extends Vehicle {
    constructor(make, model, firstRegistration, fuelType, hp, price, info, type) {
        super(make, model, firstRegistration, fuelType, hp, price, info);
        this.type = type;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }
}