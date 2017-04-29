import { Vehicle } from "./vehicle.js";

export class Truck extends Vehicle {
    constructor(make, model, firstRegistration, fuelType, hp, price, info, axes) {
        super(make, model, firstRegistration, fuelType, hp, price, info);
        this.axes = axes;
    }

    get axes() {
        return this._axes;
    }

    set axes(value) {
        this._axes = value;
    }
}