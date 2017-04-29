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
        this._make = value;
    }

    get model() {
        return this._model;
    }

    set model(value) {
        this._model = value;
    }

    get firstRegistration() {
        return this._firstRegistration;
    }

    set firstRegistration(value) {
        this._firstRegistration = value;
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
        this._hp = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get info() {
        return this._info;
    }

    set info(value) {
        this._info = value;
    }
}