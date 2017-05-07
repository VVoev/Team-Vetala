import { validator } from "../common/validator.js";

export class Vehicle {
    constructor(make, model, firstRegistration, fuelType, hp, price, info) {
        this.make = make;
        this.model = model;
        this.firstRegistration = firstRegistration;
        this.fuelType = fuelType;
        this.hp = hp;
        this.price = price;
        this.info = info;
    }

    get make() {
        return this._make;
    }

    set make(value) {
        validator.validateStringLength(value, 2, 12);

        this._make = value.trim();
    }

    get model() {
        return this._model;
    }

    set model(value) {
        validator.validateStringLength(value, 2, 12);

        this._model = value.trim();
    }

    get firstRegistration() {
        return this._firstRegistration;
    }

    set firstRegistration(value) {
        const now = new Date().getFullYear();
        validator.validateInteger(+value);
        validator.validateNumberInRange(+value, 1900, +now);

        this._firstRegistration = +value;
    }

    get fuelType() {
        return this._fuelType;
    }

    set fuelType(value) {
        this._fuelType = value;
    }

    get hp() {
        return this._hp;
    }

    set hp(value) {
        validator.validateInteger(+value);
        validator.validateNumberInRange(+value, 0, 1000);

        this._hp = +value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        validator.validateNumberInRange(+value, 0, Number.MAX_VALUE);

        this._price = +value;
    }

    get info() {
        return this._info;
    }

    set info(value) {
        this._info = value.trim();
    }
}