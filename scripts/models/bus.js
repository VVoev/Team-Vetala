import { Vehicle } from "./vehicle.js";

export class Bus extends Vehicle {
    constructor(make, model, firstRegistration, fuelType, hp, price, info, seats) {
        super(make, model, firstRegistration, fuelType, hp, price, info);
        this.seats = seats;
    }

    get seats() {
        return this._seats;
    }

    set seats(value) {
        this._seats = value;
    }
}