import { Vehicle } from "./vehicle.js";

export class Car extends Vehicle {
    constructor(make, model, firstRegistration, fuelType, hp, price, info) {
        super(make, model, firstRegistration, fuelType, hp, price, info);
    }

}