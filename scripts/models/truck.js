import { Vehicle } from "./vehicle.js";

export class Truck extends Vehicle {
    constructor(make, model, year, hp, price, axes) {
        super(make, model, year, hp, price);
        this.axes = axes;
    }

    get axes() {
        return this._axes;
    }

    set axes(value) {
        this._axes = value;
    }
}