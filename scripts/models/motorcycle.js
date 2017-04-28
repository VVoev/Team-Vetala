import { Vehicle } from "./vehicle.js";

export class Motorcycle extends Vehicle {
    constructor(make, model, year, hp, price, type) {
        super(make, model, year, hp, price);
        this.type = type;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }
}