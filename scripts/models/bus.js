import { Vehicle } from "./vehicle.js";

export class Bus extends Vehicle {
    constructor(make, model, year, hp, price, seats) {
        super(make, model, year, hp, price);
        this.seats = seats;
    }

    get seats() {
        return this._seats;
    }

    set seats(value) {
        this._seats = value;
    }
}